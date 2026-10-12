import type { ReactNode } from 'react'

interface Props { title: string; action?: ReactNode; children: ReactNode; className?: string }

export default function Section({ title, action, children, className = '' }: Props) {
  return (
    <section className={`min-w-0 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink sm:text-xl">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}
