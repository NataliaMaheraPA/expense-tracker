import "server-only"

import { Expense } from "@prisma/client"
import prisma from "@/lib/prisma"

export async function getExpenses(): Promise<Expense[]> {
  const expenses = await prisma.expense.findMany()
  return expenses
}

export async function createExpense(data: { title: string, amount: number }): Promise<Expense> {
  const newExpense = await prisma.expense.create({
    data
  })
  return newExpense
}