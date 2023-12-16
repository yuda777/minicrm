import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { customer, customerStatus, type Customer } from "@/db/schema"
import { env } from "@/env.mjs"
import dayjs from "dayjs"
import { and, asc, desc, eq, gte, like, lte, sql } from "drizzle-orm"

import { UsersTableShell } from "@/components/shells/users-table-shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { alias } from "drizzle-orm/pg-core"
import { CustomersTableShell } from "@/components/shells/customer-table-shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Customer",
  description: "List customer",
}

interface CustomerPageProps {
  params: {
    storeId: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ListCustomerPage({
  params,
  searchParams,
}: CustomerPageProps) {
  const { page, per_page, sort, name, date_range } = searchParams

  // Number of items per page
  const limit = typeof per_page === "string" ? parseInt(per_page) : 10
  // Number of items to skip
  const offset =
    typeof page === "string"
      ? parseInt(page) > 0
        ? (parseInt(page) - 1) * limit
        : 0
      : 0
  // Column and order to sort by
  const [column, order] =
    typeof sort === "string"
      ? (sort.split(".") as [
        keyof Customer | undefined,
        "asc" | "desc" | undefined
      ])
      : []
  // Date range for created date
  const [start_date, end_date] =
    typeof date_range === "string"
      ? date_range.split("to").map((date) => dayjs(date).toDate())
      : []

  // Transaction is used to ensure both queries are executed in a single transaction
  const { customerData, totalUsers } = await db.transaction(async (tx) => {
    const ts = alias(customerStatus, 'ts')
    const customerData = await tx
      .select({
        customerName: customer.customerName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        birthDate: customer.birthDate,
        createdAt: customer.createdAt,
        status: ts.statusName,
        subStatus: ts.subStatus
      })
      .from(customer)
      .limit(limit)
      .offset(offset)
      .leftJoin(ts, eq(customer.statusId, ts.statusId))
      .where(
        and(
          // Filter by name
          typeof name === "string"
            ? like(customer.customerName, `%${name}%`)
            : undefined,
          // Filter by created date
          start_date && end_date
            ? and(
              gte(customer.createdAt, start_date),
              lte(customer.createdAt, end_date)
            )
            : undefined
        )
      )
      .orderBy(
        column && column in customer
          ? order === "asc"
            ? asc(customer[column])
            : desc(customer[column])
          : desc(customer.createdAt)
      )

    const totalUsers = await tx
      .select({
        count: sql<number>`count(${customer.customerId})`,
      })
      .from(customer)
      .leftJoin(ts, eq(customer.statusId, ts.statusId))
      .where(
        and(
          // Filter by name
          typeof name === "string"
            ? like(customer.customerName, `%${name}%`)
            : undefined,
          // Filter by created date
          start_date && end_date
            ? and(
              gte(customer.createdAt, start_date),
              lte(customer.createdAt, end_date)
            )
            : undefined
        )
      )

    return {
      customerData,
      totalUsers: Number(totalUsers[0]?.count) ?? 0,
    }
  })

  const pageCount = Math.ceil(totalUsers / limit)

  return (
    <Card>
      <CardHeader className="s  pace-y-1">
        <CardTitle className="text-2xl">User List</CardTitle>
        <CardDescription>
          Choose user name to edit
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <CustomersTableShell
          data={customerData}
          pageCount={pageCount}
        />
      </CardContent>
    </Card>
  )
}

// customerName: string | null;
//     email: string | null;
//     phone: string | null;
//     address: string | null;
//     birthDate: string | null;
//     createdAt: Date | null;