'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Chart from '@/components/chart'
import Link from 'next/link'
import { Icons } from '@/components/icons'
type Props = {}
export default function ChartPage({ }: Props) {


  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Live Performance Dashboard</CardTitle>
        <CardDescription>
          <div className='flex space-x-2'>
            <div>Using Recharts and</div>
            <Link
              href={"https://github.com/yuda777/socket-io-postgres.git"}
              target='_blank'
              className='flex underline hover:text-blue-600 animate-in'>
              Socket-IO
              <Icons.externalLink
                className="h-4 w-4 text-muted-foreground ml-2"
                aria-hidden="true" />
            </Link>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className='h-auto'>
          {/* <Example /> */}
          <Chart />
        </div>
      </CardContent>
    </Card>
  )
}