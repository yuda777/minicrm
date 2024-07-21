import { type Metadata } from "next"
import React from 'react'
import { env } from "@/env.mjs"
import UserList from "@/components/data-table/UserList"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Users",
  description: "Manage your Users",
}
async function ListUserPage() {
  return <UserList />
}
export default ListUserPage