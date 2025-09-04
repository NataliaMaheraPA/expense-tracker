'use client'

import { useMemo, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'
import { Button } from '@/components/ui/button'
import { formatCurrencyWith } from '@/lib/utils'
import { useCurrency } from '@/components/currency-provider'

type Props = {
  data: Array<{ month: string; total: number }>
}

function formatMonthLabel(yyyyDashMm: string) {
  // yyyyDashMm: 'YYYY-MM'
  const [y, m] = yyyyDashMm.split('-').map(Number)
  const d = new Date(y, (m ?? 1) - 1, 1)
  return d.toLocaleString(undefined, { month: 'short', year: '2-digit' })
}

export default function MonthlyLineChart({ data }: Props) {
  const [months, setMonths] = useState<3 | 6 | 12>(12)
  const { currency } = useCurrency()

  const sliced = useMemo(() => {
    if (!data?.length) return [] as Props['data']
    const end = data.length
    const start = Math.max(0, end - months)
    return data.slice(start, end)
  }, [data, months])

  return (
    <div className='w-full'>
      <div className='mb-3 flex items-center gap-2'>
        <Button size='sm' variant={months === 3 ? 'default' : 'outline'} onClick={() => setMonths(3)}>
          3m
        </Button>
        <Button size='sm' variant={months === 6 ? 'default' : 'outline'} onClick={() => setMonths(6)}>
          6m
        </Button>
        <Button size='sm' variant={months === 12 ? 'default' : 'outline'} onClick={() => setMonths(12)}>
          12m
        </Button>
      </div>

      <div className='h-64 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={sliced} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray='3 3' className='stroke-zinc-200 dark:stroke-zinc-800' />
            <XAxis dataKey='month' tickLine={false} axisLine={false} tickFormatter={formatMonthLabel} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => formatCurrencyWith(Number(v), currency)} />
            <Tooltip
              formatter={(value) => formatCurrencyWith(Number(value), currency)}
              labelFormatter={(label) => formatMonthLabel(String(label))}
            />
            <Line type='monotone' dataKey='total' stroke='#22c55e' strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}


