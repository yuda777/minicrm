import { env } from "@/env.mjs"
import type { Metadata } from "next"

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
  title: "New User",
  description: "Add a new user",
}

interface NewUserPageProps {
  params: {
    storeId: string
  }
}

export default async function NewUserPage({ params }: NewUserPageProps) {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Add User</CardTitle>
        <CardDescription>Add a new user </CardDescription>
      </CardHeader>
      <CardContent>
        <AddNEditUserForm />
      </CardContent>
    </Card>
  )
}
