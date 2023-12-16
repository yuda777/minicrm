import { writeFile } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const timestamp = new Date().getTime() // Get a unique timestamp
  const randomString = Math.random().toString(36).substring(2, 8) // Generate a random string
  console.log(data)

  const file: File | null = data.get('file') as unknown as File
  const imageFileName = file.name
  // const fileExtension = imageFileName.split('.').pop();
  // const baseFilename = imageFileName.replace(`.${fileExtension}`, '');

  const lastDotIndex = imageFileName.lastIndexOf('.')
  const fileExtension =
    lastDotIndex >= 0 ? imageFileName.slice(lastDotIndex) : ''

  // Remove the file extension from the original filename
  const baseFilename =
    lastDotIndex >= 0 ? imageFileName.slice(0, lastDotIndex) : imageFileName

  const uniqueFilename = `${baseFilename}-${timestamp}-${randomString}${fileExtension}`

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  // const fileName = file.name

  const filePath = path.join(process.cwd(), 'public', 'face', uniqueFilename)
  // const path = `public/face/${file.name}`
  await writeFile(filePath, buffer)

  return NextResponse.json({ success: true, filename: uniqueFilename })
}
