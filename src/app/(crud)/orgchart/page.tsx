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
        <CardTitle className="text-2xl">Organizational Structure</CardTitle>
        <CardDescription>
          Use the chart below to navigate through the various levels of our organization
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <OrganizationalChart />
      </CardContent>
    </Card>

  )
}