'use client'

import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { submitExpense } from '@/app/actions/expenses'
import { expenseSchema, type ExpenseFormValues } from '@/types/schema'
import { FormInput } from '@/components/form-input'

export default function NewExpenseForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    mode: 'onChange',
    defaultValues: { title: '', amount: '' }
  })

  async function onSubmit(values: ExpenseFormValues) {
    const res = await submitExpense(values)

    if (res.errors) {
      toast.error('Please check the form and try again')
    }
 
    reset()  
    toast.success(`${values.title} added to the list`)
  }

  return (
    <div className='w-full sm:w-1/3'>
      <h3 className='text-xl font-bold'>Add new</h3>
      <form className='mt-3 flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
        <FormInput<ExpenseFormValues>
          name='title'
          control={control}
          type='text'
          label='Title'
          placeholder='Title'
          className='flex flex-col rounded-md'
          inputClassName='border border-zinc-300 p-2'
        />

        <FormInput<ExpenseFormValues>
          name='amount'
          control={control}
          type='number'
          label='Amount'
          placeholder='Amount'
          className='flex flex-col rounded-md'
          inputClassName='border border-zinc-300 p-2'
        />

        <button
          type='submit'
          disabled={isSubmitting}
          className='bg-purple-600 p-2 text-white rounded-md'
        >
          {isSubmitting ? 'Saving...' : 'Add'}
        </button>
      </form>
    </div>
  )
}