import { Card } from '../ui'
import { useBank } from '../../state/BankContext'
import { money } from '../../utils/format'

export default function RecentTransactions({ limit = 3 }: { limit?: number }) {
  const { transactions } = useBank()

  return (
    <Card className="space-y-4">
      {transactions.slice(0, limit).map((t) => (
        <div key={t.id} className="flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface text-muted">{t.name[0]}</div>
          <div className="min-w-0 flex-1"><p className="truncate font-medium">{t.name}</p><p className="text-xs text-muted">{t.date}</p></div>
          <b className={t.amount < 0 ? 'text-red-500' : 'text-green-600'}>{money(t.amount)}</b>
        </div>
      ))}
    </Card>
  )
}
