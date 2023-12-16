import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import OrganizationalChart from '@/components/OrgChart';

type Props = {}

export default function OrgChart
  ({ }: Props) {
  return (
    <Card>
      <CardHeader className="s  pace-y-1">
        <CardTitle className="text-2xl">User List</CardTitle>
        <CardDescription>
          Choose user name to edit
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <OrganizationalChart />
      </CardContent>
    </Card>

  )
}