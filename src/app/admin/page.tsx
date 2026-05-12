import { SectionCards } from '@/features/statistics/_components/section-cards'
import { StatisticsSkeleton } from '@/features/statistics/_components/statistics-skeleton'
import React, { Suspense } from 'react'

const page = () => {
  return (
        <Suspense fallback={<StatisticsSkeleton />}>
            <SectionCards />
        </Suspense>
  )
}

export default page