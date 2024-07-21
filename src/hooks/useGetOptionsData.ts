'use client'

import { fetchDataForOptionMultiSelect } from '@/db/query'
import { columnWithPositionType, getOptionsDataType } from '@/types'
import { useState, useEffect } from 'react'

type optionType = {
  label: string
  value: string
  styleId?: string
}

export function useGetOptionsData({
  table,
  fieldForValue,
  fieldForLabel,
  fieldAvatar,
  styleId,
}: getOptionsDataType) {
  const [options, setOptions] = useState<optionType[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetchDataForOptionMultiSelect({
          table,
          fieldForLabel,
          fieldForValue,
          fieldAvatar,
          styleId,
        })
        setOptions(res)
      } catch (error) {
        console.error('Error fetching position data:', error)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return options
}
