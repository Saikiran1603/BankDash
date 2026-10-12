import type { ReactNode } from 'react'
import Card from './Card'

export default function TableWrap({ children }: { children: ReactNode }) {
  return (
    <Card className="overflow-x-auto !p-0">
      <table className="w-full min-w-[640px] text-left text-sm">{children}</table>
    </Card>
  )
}
