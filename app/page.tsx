import { getExpenses } from "@/server/expenses"
import { formatCurrency } from "@/lib/utils"
import ExpenseForm from "@/components/expense-form"

export default async function Home() {
  const expenses = await getExpenses()

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>Expense Tracker</h1>
        <h2 className='text-zinc-500'>Using Neon: Serverless Postgres</h2>

        <div className='mt-8 flex items-center justify-between gap-10'>
          <div className='grow'>
            <h3 className='text-xl font-bold'>Items</h3>
            <ul className='mt-4 flex flex-col gap-1'>
              {expenses.map(expense => (
                <li key={expense.id} className='flex justify-between'>
                  <span>{expense.title}</span>
                  <span>{formatCurrency(expense.amount)}</span>
                </li>
              ))}
            </ul>
          </div>

          <ExpenseForm />
        </div>
      </div>
    </section>
  )
}
