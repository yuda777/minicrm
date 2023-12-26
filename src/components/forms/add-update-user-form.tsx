'use client'
import React, { FC, useCallback } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { catchError, cn, colorScheme, formatBytes, truncate } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Icons } from "@/components/icons"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { users, type User, Position } from "@/db/schema"
import * as z from "zod"
import type { FileWithPreview, UserWithPosition, userPositionWithSuperior } from "@/types"
import Image from 'next/image'
import { format } from 'date-fns'
import { userSchema } from '@/lib/validations/user'
import { addNUpdateUserAction, getHeadUser, getPosUser } from '@/app/_actions/user'
import { useRouter } from 'next/navigation'
import {
  useDropzone,
  type FileWithPath,
} from "react-dropzone"
import { Badge } from '../ui/badge2';
type Inputs = z.infer<typeof userSchema>

interface FrmInputProps {
  user?: User
}

interface headNPosProps {
  userPosition: Position[],
  headUser: UserWithPosition[]
}

function useDataUser() {
  const [headNPos, setHeadNPos] = React.useState<headNPosProps>({
    userPosition: [],
    headUser: [],
  });

  const getHeadNPosUser = async () => {
    try {
      const userPosition = await getPosUser()
      const headUser: UserWithPosition[] = await getHeadUser();
      setHeadNPos({ userPosition, headUser });
    } catch (error) {
      console.error("There was an error with the fetch operation:", error);
    }
  }
  React.useEffect(() => {
    getHeadNPosUser();
  }, []);
  return {
    headNPos
  }
}

const AddNEditUserForm: FC<FrmInputProps> = ({ user }) => {
  const { toast } = useToast()
  const { headNPos } = useDataUser();
  const router = useRouter()
  const [updateImage, setUpdateImage] = React.useState<boolean>(false)
  const [files, setFiles] = React.useState<FileWithPreview | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const [open, setOpen] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)
  console.log(headNPos);


  // const [selectedImage, setSelectedImage] = useState("");
  const form = useForm<Inputs>({
    resolver: zodResolver(userSchema),
    mode: "onSubmit",
    defaultValues: {
      name: user?.name || "",
      parentId: String(user?.parentId) || "",
      positionId: String(user?.positionId) || "",
      photo: user?.photo || null,
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      hireDate: user?.hireDate ? new Date(user?.hireDate) : new Date(),
      statusActive: user?.statusActive || true
    }
  })
  React.useEffect(() => {
    if (user?.photo) {
      const file = new File([], user?.photo, {
        type: "image",
      })
      const fileWithPreview = Object.assign(file, {
        preview: `/face/${user?.photo}`,
      })
      setFiles(fileWithPreview)
      form.setValue('photo', user?.photo);
    }
  }, [form, user])
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    )
    setUpdateImage(true)
    form.setValue('photo', acceptedFiles[0]);
  }, [form]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFocused,
    acceptedFiles
  } = useDropzone({
    onDrop,
    noClick: false,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg', '.jfif'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
  })
  const thumbs = files && (
    <div
      className={cn('flex-col')}
    >
      <div className='w-40 h-40 p-1 box-border rounded-md border border-solid border-gray-300'>
        <Image
          width={150}
          height={150}
          src={files.preview}
          onLoad={() => { URL.revokeObjectURL(files.preview) }}
          alt="photo"
        />
      </div>
      {
        files?.path ?
          <div className='text-sm text-muted-foreground mt-1'>
            {truncate(files?.path, 10)} - {formatBytes(files?.size)}
          </div>
          : null
      }
    </div>
  )


  function onSubmit(data: Inputs) {
    const file: File | null = data.photo as unknown as File
    let fileImgName: string
    startTransition(async () => {
      try {
        if (updateImage) {
          const dataImage = new Blob([file], { type: 'image/jpeg' });
          const formData = new FormData();
          formData.append('file', dataImage, file.name);
          const dataRes = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Request failed');
              }
            })
            .then((dataUp) => {
              if (dataUp.success) {
                fileImgName = dataUp.filename;
                console.log('File uploaded successfully. Filename:', fileImgName);
              } else {
                console.error('Upload failed.');
              }
            })
            .catch((error) => {
              catchError(error)
            });
        }
        await addNUpdateUserAction({
          ...data,
          photo: (updateImage) ? fileImgName : user?.photo
        }, user?.userId)
        toast({
          description: !user?.userId ? "User Added successfully." : "User Updated successfully.",
        })
        form.reset()
        setFiles(null)
        router.push('/list', { scroll: false })
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <div className='grid gap-6'>
            <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="positionId"
                render={({ field }) => {
                  const selectedPosition = headNPos.userPosition.find(val => String(val.positionId) === form.getValues("positionId"))
                  return (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className={cn(
                                  "w-full justify-between bg-background",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {selectedPosition?.titleDesc ?
                                  <Badge
                                    variant={selectedPosition?.departementCode ?
                                      colorScheme(selectedPosition.departementCode)
                                      : 'gray'}
                                    className="capitalize whitespace-nowrap ml-2" >
                                    {selectedPosition?.titleDesc}
                                  </Badge> :
                                  "Select Position"
                                }
                                <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search Position..." />
                              <CommandEmpty>No Position found.</CommandEmpty>
                              <CommandGroup>
                                {headNPos.userPosition.map((val) => (
                                  <CommandItem
                                    value={val.titleDesc}
                                    key={val.positionId}
                                    onSelect={() => {
                                      form.setValue("positionId", String(val.positionId))
                                      setOpen(false)
                                    }}
                                  >
                                    <Icons.check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        String(val.positionId) === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    <Badge
                                      variant={val.titleDesc ? val.departementCode ? colorScheme(val.departementCode) : 'gray' : "gray"}
                                      className="capitalize whitespace-nowrap ml-2" >
                                      {val.titleDesc}
                                    </Badge>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => {
                  const selectedSuperior = headNPos.headUser.find(val => String(val.id) === form.getValues("parentId"))
                  return (
                    <FormItem>
                      <FormLabel>Superior</FormLabel>
                      <FormControl>
                        <Popover open={open2} onOpenChange={setOpen2}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open2}
                                className={cn(
                                  "w-full justify-between bg-background",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {selectedSuperior?.titleDesc ?
                                  <>
                                    {selectedSuperior.name}
                                    <Badge
                                      variant={selectedSuperior?.departementCode ?
                                        colorScheme(selectedSuperior.departementCode)
                                        : 'gray'}
                                      className="capitalize whitespace-nowrap ml-2" >
                                      {selectedSuperior?.titleDesc}
                                    </Badge>
                                  </>
                                  :
                                  "Select Superior"
                                }

                                {/* {field.value
                                ? headNPos.headUser.find(
                                  (val) => String(val.id) === field.value
                                )?.name
                                : "Select Superior"} */}
                                <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search Superior Name..." />
                              <CommandEmpty>No Superior found.</CommandEmpty>
                              <CommandGroup>
                                {headNPos.headUser.map((val) => (
                                  <CommandItem
                                    value={val.name}
                                    key={val.id}
                                    onSelect={() => {
                                      form.setValue("parentId", String(val.id))
                                      setOpen2(false)
                                    }}
                                  >
                                    <Icons.check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        String(val.id) === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {val.name}
                                    <Badge
                                      variant={val.titleDesc ? val.departementCode ? colorScheme(val.departementCode) : 'gray' : "gray"}
                                      className="capitalize whitespace-nowrap ml-2" >
                                      {val.titleDesc}
                                    </Badge>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        {/* <Select
                        value={String(field.value)}
                        onValueChange={value => field.onChange(value)}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {headNPos.headUser?.map((val) => (
                              <SelectItem key={val.id} value={String(val.parentId)}>{val.name} ({val.titleDesc})</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select> */}
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hireDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hire Date</FormLabel>
                    <FormControl>
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal bg-background",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(e) => {
                                if (e) {
                                  field.onChange(e)
                                }
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="statusActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Active</FormLabel>
                    <FormControl>
                      <div>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo</FormLabel>
                    <FormControl className=''>
                      <div
                        {...getRootProps()}
                        className={cn(
                          "group relative mt-8 grid h-max w-full cursor-pointer rounded-lg border-2 border-dashed",
                          "border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          "focus-visible:ring-offset-2",
                          // "flex-1 flex flex-col items-center p-[20px] border-2 border-dashed border-gray-300 rounded-md",
                          // "bg-gray-100 text-gray-400 outline-none transition duration-300 ease-in-out",
                          // isDragActive && "border-muted-foreground/50 pointer-events-none opacity-60",
                          isDragAccept && "border-primary transition duration-150 ease-in-out"
                        )}
                      >
                        <input {...getInputProps()} />
                        <div className="grid place-items-center gap-1 sm:px-5 mb-5">
                          <Icons.upload
                            className="h-8 w-8 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <p className="mt-2 text-base font-medium text-muted-foreground">
                            Drag {`'n'`} drop Image here, or click to select file
                          </p>
                          <p className="text-sm text-slate-500">
                            Please upload Image with size less than 5 Mb
                          </p>
                        </div>
                        <div className="flex justify-start">
                          {thumbs}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button
                type="submit"
                className="my-4 px-12 py-4 "
                // variant={"secondary"}
                disabled={isPending}
              >
                {(!user?.userId) ? "Add" : "Update"} User
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div>
      </div>
    </>
  )
}
export default AddNEditUserForm