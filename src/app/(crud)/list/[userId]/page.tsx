import { db } from "@/db"
import { users } from "@/db/schema"
import { env } from "@/env.mjs"
import { and, eq } from "drizzle-orm"
import { type Metadata } from "next"
import { notFound } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AddNEditUserForm from "@/components/forms/add-update-user-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Manage Product",
  description: "Manage your product",
}

interface UpdateProductPageProps {
  params: {
    userId: number
  }
}

export default async function UpdateProductPage({
  params,
}: UpdateProductPageProps) {
  const userId = Number(params.userId)
  const user = await db.query.users.findFirst({
    where: and(eq(users.userId, userId)),
  })
  if (!user) {
    notFound()
  }
  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between space-x-2">
          <CardTitle className="text-2xl">Update User</CardTitle>
        </div>
        <CardDescription>
          Update your User information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AddNEditUserForm user={user} />
      </CardContent>
    </Card>
  )
}
