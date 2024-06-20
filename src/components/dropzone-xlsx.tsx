import React, { useCallback } from "react"
import {
  useDropzone,
  type Accept,
  type FileRejection,
  type FileWithPath,
} from "react-dropzone"
import { cn, formatBytes } from "@/lib/utils"
import { Icons } from "@/components/icons"
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form"
import { FileWithPreview } from "@/types"

export type State = {
  columns?: Array<{}>
  pivotTableState?: {}
  tableState?: {}
  data?: Array<{}>
};

type DataType = {
  data: {
    [key: string]: any
  }[]
};

interface StateContextType<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  state: State
  setState: React.Dispatch<React.SetStateAction<DataType>>
  setValue: UseFormSetValue<TFieldValues>
  files: FileWithPreview[] | null
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
  maxFiles?: number
};

export default function DropzoneXlsx<TFieldValues extends FieldValues>({
  name,
  state,
  setState,
  setValue,
  files,
  setFiles,
  maxFiles = 1,
  ...props
}: StateContextType<TFieldValues>) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
    const XLSXPromise = import("xlsx");

    const reader = new FileReader();
    reader.onload = async function (e) {
      const data = new Uint8Array((e.target?.result as ArrayBufferLike) || []);
      const XLSX = await XLSXPromise;
      const workbook = XLSX.read(data, { type: "array" });
      setState((previousState) => ({
        ...previousState, name,
        data: XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]],
          { blankrows: false, raw: false }
        ),
      }))
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    };
    reader.readAsArrayBuffer(acceptedFiles[0]);
  }, [setState]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: false,
    multiple: maxFiles > 1,
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"]
    },
  })
  React.useEffect(() => {
    return () => {
      if (!files) return
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    }    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div
        {...getRootProps()}
        className={cn(
          "group relative mt-8 grid h-48 w-full cursor-pointer place-items-center  border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isDragActive && "border-muted-foreground/50 pointer-events-none opacity-60",
        )}
        {...props}
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
          {(files) ? files.map(file => (
            <div key={file.path} className="flex gap-2">
              <Icons.excel className="h-8 w-8 text-muted-foreground" />
              {file.path} - {formatBytes(file.size)}
            </div>
          )) : ''}
        </div>
      </div>
    </>
  );
};

// export default DropzoneXlsx;