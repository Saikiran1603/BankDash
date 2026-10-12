import type { ReactNode } from 'react'

export default function Badge({ children, ok }: { children: ReactNode; ok?: boolean }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${ok ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
      {children}
    </span>
  )
}
