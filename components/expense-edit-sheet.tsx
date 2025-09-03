'use client'

import { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import type { Expense } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { expenseSchema, type ExpenseFormValues } from '@/types/schema'
import { FormInput } from '@/components/form-input'
import { Button } from '@/components/ui/button'
import { submitExpenseUpdate } from '@/app/actions/expenses'
import { toast } from 'sonner'

export default function ExpenseEditSheet() {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Expense | null>(null)

  const { control, handleSubmit, reset, setError, formState: { isSubmitting } } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: { title: '', amount: '' }
  })

  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent<Expense>).detail
      setEditing(detail)
      reset({ title: detail.title, amount: detail.amount as unknown as string })
      setOpen(true)
    }
    window.addEventListener('open-expense-edit', onOpen as EventListener)
    return () => window.removeEventListener('open-expense-edit', onOpen as EventListener)
  }, [reset])

  async function onSubmit(values: ExpenseFormValues) {
    if (!editing) return
    const res = await submitExpenseUpdate(editing.id, values)
    if (res.errors) {
      Object.entries(res.errors).forEach(([field, messages]) => {
        const first = messages?.[0]
        if (first) setError(field as keyof ExpenseFormValues, { type: 'server', message: first })
      })
      return
    }
    setOpen(false)
    toast.success('Expense updated')
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side='right' className='sm:max-w-sm'>
        <SheetHeader>
          <SheetTitle>Edit expense</SheetTitle>
        </SheetHeader>
        <form className='mt-4 flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <FormInput<ExpenseFormValues>
            name='title'
            control={control}
            type='text'
            label='Title'
            placeholder='Title'
            className='flex flex-col'
            inputClassName='border border-zinc-300 p-2'
          />
          <FormInput<ExpenseFormValues>
            name='amount'
            control={control}
            type='number'
            label='Amount'
            placeholder='Amount'
            className='flex flex-col'
            inputClassName='border border-zinc-300 p-2'
          />
          <div className='mt-2 flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={() => setOpen(false)}>Cancel</Button>
            <Button type='submit' disabled={isSubmitting}>Save</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}


