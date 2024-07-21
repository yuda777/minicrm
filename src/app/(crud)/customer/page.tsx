import { type Metadata } from "next"
import React from 'react'
import { env } from "@/env.mjs"
import CustomerList from "@/components/data-table/customerList"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Customer",
  description: "List customer",
}
async function ListCustomerPage() {
  return <CustomerList />
}
export default ListCustomerPage