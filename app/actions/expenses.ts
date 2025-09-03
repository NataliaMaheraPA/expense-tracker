'use server'

import { revalidatePath } from "next/cache"
import { createExpense } from "@/server/expenses"
import { expenseSchema } from "@/types/schema"

type ActionState = { errors?: Record<string, string[]>; success?: boolean; submittedAt?: number }

export async function createExpenseAction(_: ActionState | null, formData: FormData): Promise<ActionState> {
  const data = Object.fromEntries(formData.entries())
  const parsed = expenseSchema.safeParse(data)

  if (!parsed.success) {
    const flattened = parsed.error.flatten(issue => issue.message)
    return { errors: flattened.fieldErrors }
  }

  await createExpense(parsed.data)
  revalidatePath('/')
  return { success: true, submittedAt: Date.now() }
}

// Direct values-based action for client-controlled submit
export async function submitExpense(values: unknown): Promise<{ success?: boolean; errors?: Record<string, string[]> }> {
  const parsed = expenseSchema.safeParse(values)
  if (!parsed.success) {
    const flattened = parsed.error.flatten(issue => issue.message)
    return { errors: flattened.fieldErrors }
  }
  await createExpense(parsed.data)
  revalidatePath('/')
  return { success: true }
}