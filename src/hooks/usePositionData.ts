'use client'
import { fetchDept, fetchPosition } from '@/app/_actions/position'
import { columnWithPositionType } from '@/types'
import { useState, useEffect } from 'react'

export function usePositionData() {
  const [columnWithPosition, setColumnWithPosition] = useState<
    columnWithPositionType[]
  >([])

  useEffect(() => {
    ;(async () => {
      try {
        const [tPositionTitle, tPositionDept] = await Promise.all([
          fetchPosition(),
          fetchDept(),
        ])
        setColumnWithPosition([
          { column: 'departementCode', data: tPositionDept },
          { column: 'titleCode', data: tPositionTitle },
        ])
      } catch (error) {
        console.error('Error fetching position data:', error)
      }
    })()
  }, [])
  return columnWithPosition
}
