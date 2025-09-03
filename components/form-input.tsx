'use client'

import { useId } from 'react'
import { Controller, type Control, type FieldPath } from 'react-hook-form'

type FormInputProps<TFieldValues extends Record<string, any>> = {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
  type: string
  placeholder?: string
  label?: string
  id?: string
  className?: string 
  inputClassName?: string
  externalError?: string | undefined
}

export function FormInput<TFieldValues extends Record<string, any>>({
  name,
  control,
  type,
  placeholder,
  label,
  id,
  className,
  inputClassName,
  externalError
}: FormInputProps<TFieldValues>) {
  const reactId = useId()
  const inputId = id ?? `${name}-${reactId}`
  const errorId = `${inputId}-error`

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className='text-sm font-medium'>
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState}) => {
          const message = externalError ?? fieldState.error?.message
          const isInvalid = Boolean(message)
          return (
            <>
              <input
                {...field}
                id={inputId}
                type={type}
                placeholder={placeholder}
                className={inputClassName + ' rounded-md'}
                aria-invalid={isInvalid}
                aria-describedby={isInvalid ? errorId : undefined}
                onChange={(e) => {
                  if (type === 'number') {
                    const value = (e.target as HTMLInputElement).value
                    const next = value === '' ? '' : Number(value)
                    field.onChange(next)
                  } else {
                    field.onChange(e)
                  }
                }}
                value={field.value ?? ''}
              />
              {message && (
                <p id={errorId} className='mt-1 text-xs text-red-600'>
                  {message}
                </p>
              )}
            </>
          )
        }}
      />
    </div>
  )
}


