'use client'

import { useCurrency, type Currency } from '@/components/currency-provider'

const options: { code: Currency; label: string; symbol: string }[] = [
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'EUR', label: 'Euro', symbol: '€' },
  { code: 'PLN', label: 'Polish Złoty', symbol: 'zł' },
  { code: 'UAH', label: 'Ukrainian Hryvnia', symbol: '₴' }
]

export default function CurrencySelect() {
  const { currency, setCurrency } = useCurrency()

  return (
    <select
      aria-label='Currency'
      className='rounded-md border px-2 py-1 text-sm'
      value={currency}
      onChange={(e) => setCurrency(e.target.value as Currency)}
    >
      {options.map(o => (
        <option key={o.code} value={o.code}>
          {o.symbol} {o.code}
        </option>
      ))}
    </select>
  )
}


