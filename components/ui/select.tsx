import * as React from 'react'
export type SelectOption = { label: string; value: string }
interface Props { value: string; onChange: (v: string) => void; options: SelectOption[]; placeholder?: string }
export function Select({ value, onChange, options, placeholder }: Props) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className='w-full rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-sky-300/40'>
      {placeholder && <option value='' disabled>{placeholder}</option>}
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}
