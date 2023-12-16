import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { type Position, users, type User, position } from "@/db/schema"
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

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Products",
  description: "Manage your products",
}

interface ProductsPageProps {
  params: {
    storeId: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ListUserPage({
  params,
  searchParams,
}: ProductsPageProps) {
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
        keyof User | undefined,
        "asc" | "desc" | undefined
      ])
      : []
  // Date range for created date
  const [start_date, end_date] =
    typeof date_range === "string"
      ? date_range.split("to").map((date) => dayjs(date).toDate())
      : []

  // Transaction is used to ensure both queries are executed in a single transaction
  const { userPositionWithSuperior, totalUsers } = await db.transaction(async (tx) => {
    const tp = alias(position, 'tp')
    const tp2 = alias(position, 'tp2')
    const tu2 = alias(users, 'tu2')

    const userPositionWithSuperior = await tx
      .select({
        userId: users.userId,
        parentId: users.parentId,
        userName: users.name,
        userTitleCode: tp.titleCode,
        userTitleDesc: tp.titleDesc,
        userDeptCode: tp.departementCode,
        userDeptDesc: tp.departementDesc,
        userPhoto: users.photo,
        userEmail: users.email,
        userPhone: users.phoneNumber,
        userHireDate: users.hireDate,
        userStatusActive: users.statusActive,
        superiorTitleCode: tp2.titleCode,
        superiorTitleDesc: tp2.titleDesc,
        superiorDeptCode: tp.departementCode,
        superiorDeptDesc: tp.departementDesc,
        superiorName: tu2.name,
      })
      .from(users)
      .limit(limit)
      .offset(offset)
      .leftJoin(tp, eq(users.positionId, tp.positionId))
      .leftJoin(tu2, eq(users.parentId, tu2.userId))
      .leftJoin(tp2, eq(tp2.positionId, tu2.positionId))
      .where(
        and(
          // Filter by name
          typeof name === "string"
            ? like(users.name, `%${name}%`)
            : undefined,
          // Filter by created date
          start_date && end_date
            ? and(
              gte(users.createdAt, start_date),
              lte(users.createdAt, end_date)
            )
            : undefined
        )
      )
      .orderBy(
        column && column in users
          ? order === "asc"
            ? asc(users[column])
            : desc(users[column])
          : desc(users.createdAt)
      )

    const totalUsers = await tx
      .select({
        count: sql<number>`count(${users.userId})`,
      })
      .from(users)
      .leftJoin(tp, eq(users.positionId, tp.positionId))
      .leftJoin(tu2, eq(users.parentId, tu2.userId))
      .leftJoin(tp2, eq(tp2.positionId, tu2.positionId))
      .where(
        and(
          // Filter by name
          typeof name === "string"
            ? like(users.name, `%${name}%`)
            : undefined,
          // Filter by created date
          start_date && end_date
            ? and(
              gte(users.createdAt, start_date),
              lte(users.createdAt, end_date)
            )
            : undefined
        )
      )

    return {
      userPositionWithSuperior,
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
        <UsersTableShell
          data={userPositionWithSuperior}
          pageCount={pageCount}
        />
      </CardContent>
    </Card>
  )
}
