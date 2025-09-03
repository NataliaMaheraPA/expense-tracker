import { z } from 'zod'

// Single schema: accepts number (client) or string (FormData), outputs number
export const expenseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  amount: z.preprocess(
    (value) => {
      if (typeof value === 'number') return String(value)
      if (typeof value === 'string') return value.trim()
      return value
    },
    z
      .string()
      .min(1, 'Amount is required')
      .transform(v => Number(v))
      .pipe(z.number().positive('Amount must be > 0').int('Amount must be an integer'))
  )
})

export type ExpenseInput = z.output<typeof expenseSchema>
export type ExpenseFormValues = z.input<typeof expenseSchema>

