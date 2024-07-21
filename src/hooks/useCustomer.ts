'use client'
import {
  fetchCustomerReasons,
  fetchCustomerResponses,
} from '@/app/_actions/customer'
import { columnWithPositionType } from '@/types'
import { useState, useEffect } from 'react'

export function useCustomerData() {
  const [columnWithPosition, setColumnWithPosition] = useState<
    columnWithPositionType[]
  >([])

  useEffect(() => {
    ;(async () => {
      try {
        const [tCustomerResponses, tCustomerReasons] = await Promise.all([
          fetchCustomerResponses(),
          fetchCustomerReasons(),
        ])
        setColumnWithPosition([
          {
            column: 'statusId',
            data: tCustomerResponses,
          },
          {
            column: 'statusId',
            data: tCustomerReasons,
          },
        ])
      } catch (error) {
        console.error('Error fetching position data:', error)
      }
    })()
  }, [])
  return columnWithPosition
}
