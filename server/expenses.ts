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

export async function deleteExpense(id: string): Promise<void> {
  await prisma.expense.delete({ where: { id } })
}

export async function getMonthlyTotals(): Promise<Array<{ month: string; total: number }>> {
  // Aggregate by month (YYYY-MM) on the DB side for performance
  const rows = await prisma.$queryRaw<Array<{ month: string; total: number }>>`
    SELECT to_char(date_trunc('month', "createdAt"), 'YYYY-MM') AS month,
           SUM("amount")::int AS total
    FROM "Expense"
    GROUP BY 1
    ORDER BY 1
  `
  return rows
}