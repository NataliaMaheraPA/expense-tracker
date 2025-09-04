import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export function formatCurrencyWith(amount: number, currency: 'USD' | 'EUR' | 'PLN' | 'UAH') {
  const locale = currency === 'PLN' ? 'pl-PL' : currency === 'UAH' ? 'uk-UA' : currency === 'EUR' ? 'de-DE' : 'en-US'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount)
}
