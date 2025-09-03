'use client'

import { useOptimistic, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
import { removeExpense } from '@/app/actions/expenses'
import { formatCurrency } from '@/lib/utils'
import type { Expense } from '@prisma/client'
import { Button } from '@/components/ui/button'

type Props = { items: Expense[] }

export default function ExpenseList({ items }: Props) {
  const [optimistic, setOptimistic] = useOptimistic(items, (state, id: string) => state.filter(i => i.id !== id))
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const total = optimistic.reduce((sum, e) => sum + e.amount, 0)

  function onDelete(id: string, title: string) {
    const confirmed = window.confirm(`Delete "${title}"?`)
    if (!confirmed) return

    startTransition(() => {
      setOptimistic(id)
    })

    removeExpense(id).then(res => {
      if (res?.success) {
        toast.success(`${title} deleted`)
      } else {
        toast.error(res?.error ?? 'Delete failed')
        router.refresh()
      }
    })
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-between text-sm text-zinc-600'>
        <span>Count: {optimistic.length}</span>
        <span>Total: {formatCurrency(total)}</span>
      </div>
      <ul className='divide-y rounded-md border'>
        {optimistic.map(item => (
          <li key={item.id} className='flex items-center justify-between gap-3 p-3'>
            <div className='flex flex-col'>
              <span className='font-medium'>{item.title}</span>
            </div>
            <div className='flex items-center gap-3'>
              <span className='tabular-nums'>{formatCurrency(item.amount)}</span>
              <Button size='sm' variant='ghost' aria-label={`Delete ${item.title}`} onClick={() => onDelete(item.id, item.title)} disabled={isPending}>
                <Trash2 className='h-4 w-4 text-red-600' />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}


