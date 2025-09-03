import { getExpenses, getMonthlyTotals } from "@/server/expenses"
import ExpenseForm from "@/components/expense-form"
import ExpenseList from "@/components/expense-list"
import MonthlyLineChart from "@/components/monthly-line-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default async function Home() {
  const [expenses, monthly] = await Promise.all([getExpenses(), getMonthlyTotals()])

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>Expense Tracker</h1>
        <h2 className='text-zinc-500'>Using Neon: Serverless Postgres</h2>

        <div className='mt-8 flex items-center justify-between gap-10'>
          <div className='grow'>
            <h3 className='text-xl font-bold'>Items</h3>
            <div className='mt-4'>
              <ExpenseList items={expenses} />
            </div>
          </div>

          <ExpenseForm />
        </div>

        <div className='mt-12'>
          <Card>
            <CardHeader>
              <CardTitle>Monthly totals</CardTitle>
              <CardDescription>Aggregated sum of expenses per month</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className='pt-6'>
              <MonthlyLineChart data={monthly} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
