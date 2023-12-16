import React, { startTransition, useState, useCallback, useEffect } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function UploadPage({ }) {

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Index</CardTitle>
        <CardDescription>

        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        index
      </CardContent>
    </Card>)
}