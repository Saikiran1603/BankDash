import type { ReactNode } from 'react'

interface Props { children: ReactNode; className?: string }

export default function Card({ children, className = '' }: Props) {
  return <div className={`rounded-3xl bg-panel p-5 sm:p-6 ${className}`}>{children}</div>
}
