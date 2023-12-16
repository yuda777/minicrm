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
type Props = {}
export default function ChartPage({ }: Props) {


  return (
    <Card>
      <CardHeader className="s  pace-y-1">
        <CardTitle className="text-2xl">Chart Real-Time Performance Employee</CardTitle>
        <CardDescription>
          Using Recharts, Socket-IO
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