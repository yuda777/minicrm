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
import Image from "next/image"

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
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
  setValue: UseFormSetValue<TFieldValues>
  files: FileWithPreview[] | null
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
  maxFiles?: number
};

export default function DropzoneImage<TFieldValues extends FieldValues>({
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

    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    )

  }, [setState]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: false,
    multiple: maxFiles > 1,
    accept: {
      '.jpg': ['image/jpeg'],
      '.jpeg': ['image/jpeg'],
      '.jfif': ['image/jpeg'],
      '.png': ['image/png'],
      '.webp': ['image/webp'],
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
          "group relative mt-8 grid h-max w-full cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isDragActive && "border-muted-foreground/50 pointer-events-none opacity-60",
        )}
      >
        <input {...getInputProps()} />
        <div className="grid place-items-center gap-1 sm:px-5 mb-5">
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
        </div>
        {(files) ? files.map(file => (
          <div key={file.path} className="flex gap-2 justify-start ">
            <div className="ring ring-blue-500">
              <Image
                width={150}
                height={150}
                // src={selectedImage}
                src={file.preview}
                alt="photo"
              />
            </div>
          </div>
        )) : ''}
      </div>
    </>
  );
};
// if (files) {
//   const file = target.files[0];
//   setSelectedImage(URL.createObjectURL(file));
//   field.onChange(target.files[0])
// }
// export default DropzoneXlsx;