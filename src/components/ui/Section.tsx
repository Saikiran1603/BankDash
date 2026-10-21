import type { ReactNode } from 'react'

interface Props { title: string; action?: ReactNode; children: ReactNode; className?: string }

export default function Section({ title, action, children, className = '' }: Props) {
  return (
    <section className={`min-w-0 ${className}`}>
      <div className="mb-8 flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <h2 className="min-w-0 break-words text-lg font-semibold leading-7 text-ink sm:text-xl">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}
