'use client'

import React, { startTransition, useState, useCallback, useEffect } from 'react'
import DropzoneXlsx from '@/components/dropzone-xlsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { uploadSchema } from '@/lib/validations/upload'
import { FileWithPreview } from '@/types'
import { ComboboxDemo } from '@/components/ui/combobox'
import { insertBatch, insertTables } from '@/app/_actions/customer'
import { customer, columns } from '@/db/schema'
import { nonFieldMapping } from "@/config/customer"
import { Button } from '@/components/ui/button'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { cn, formatBytes } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

type DataType = {
  data: {
    [key: string]: any
  }[],
}
interface fieldMappingProps {
  table: string;
  excel: string;
}
type Inputs = z.infer<typeof uploadSchema>
export default function UploadPage({ }) {
  const [excelData, setExcelData] = useState<DataType>({ data: [] })
  const [fieldCustomer, setfieldCustomer] = useState<any[]>([])
  const [fieldMapping, setFieldMapping] = useState<fieldMappingProps[]>([])
  const [files, setFiles] = React.useState<FileWithPreview | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const { toast } = useToast()
  const router = useRouter()
  const headerKeys = (excelData.data.length ?? 0) > 0 ? Object.keys(excelData.data[0]) : []
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    const XLSXPromise = import("xlsx");

    const reader = new FileReader();
    reader.onload = async function (e) {
      const data = new Uint8Array((e.target?.result as ArrayBufferLike) || []);
      const XLSX = await XLSXPromise;
      const workbook = XLSX.read(data, { type: "array" });
      setExcelData((previousState) => ({
        ...previousState, name,
        data: XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]],
          { blankrows: false, raw: false }
        ),
      }))
      setFiles(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      )
    };
    reader.readAsArrayBuffer(acceptedFiles[0]);
  }, [setExcelData]);
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
  } = useDropzone({
    onDrop,
    noClick: false,
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"]
    },
  })

  useEffect(() => {
    const getFieldCustomer = async () => {
      try {
        const fieldNames = Object.keys(customer)
        const newfieldNames = fieldNames.filter(item => !nonFieldMapping.includes(item));
        setfieldCustomer(newfieldNames || [])
      } catch (error) {
        console.error('Error fetching tables:', error)
      }
    }
    getFieldCustomer()
  }, [])
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    startTransition(async () => {
      if (files) {
        const [{ batchUploadId }] = await insertBatch(files?.name)
        await insertTables({ excelData, fieldMapping, batchUploadId })
        form.reset()
        setFiles(null)
        toast({
          description: "Upload Data Success",
        })
        router.push('/customer', { scroll: false })
      } else {
        toast({
          description: "Please Select Excel Data First",
        })
      }
    })
  };
  const form = useForm<Inputs>({
    resolver: zodResolver(uploadSchema),
    mode: 'onChange',
  })
  return (
    <div className=''>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Upload</CardTitle>
              <CardDescription>
                Upload Excel
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className=''>
                      <div
                        {...getRootProps()}
                        className={cn(
                          "group relative mt-8 grid h-max w-full cursor-pointer rounded-lg border-2 border-dashed",
                          "border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          "focus-visible:ring-offset-2",
                          isDragAccept && "border-primary transition duration-150 ease-in-out"
                        )}
                      >
                        <input {...getInputProps()} />
                        <div className="grid place-items-center gap-1 sm:px-5">
                          <Icons.upload
                            className="h-8 w-8 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <p className="mt-2 text-base font-medium text-muted-foreground">
                            Drag {`'n'`} drop file here, or click to select file
                          </p>
                          <p className="text-sm text-slate-500">
                            Please upload file with size less than 2 Mb
                          </p>
                          {(files) ? (
                            <div key={files.path} className="flex gap-2">
                              <Icons.excel className="h-8 w-8 text-muted-foreground" />
                              {files.path} - {formatBytes(files.size)}
                            </div>
                          ) : ''}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Mapping</CardTitle>
              <CardDescription>
                Mapping Field from Excel to Table
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className='flex'>
                <table className='h-max flex-none w-1/3'>
                  <thead>
                    <tr>
                      <th>
                        Table Field
                      </th>
                      <th>
                        Excel Field
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fieldCustomer.map((field) => (
                      <tr key={field}>
                        <td>{field}</td>
                        <td>
                          <div className='flex items-center justify-center'>
                            <ComboboxDemo
                              fieldTable={field}
                              fieldExcel={headerKeys}
                              collectedData={fieldMapping}
                              setCollectedData={setFieldMapping}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button
                type="submit"
                className="my-4 px-12 py-4 "
                disabled={isPending}
              >
                Upload Data
              </Button>

            </CardContent>
          </Card >
        </form>
      </Form>
    </div>
  )
}