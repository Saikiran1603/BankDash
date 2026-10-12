import { Section, Card, StatCard } from '../components/ui'
import { useBank } from '../state/BankContext'
import { money } from '../utils/format'

export default function Accounts() {
  const { transactions } = useBank()

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="My Balance" value="$12,750" />
        <StatCard label="Income" value="$5,600" tone="bg-green-100 text-green-600" />
        <StatCard label="Expense" value="$3,460" tone="bg-red-100 text-red-500" />
        <StatCard label="Total Saving" value="$7,920" tone="bg-purple-100 text-purple-600" />
      </div>
      <Section title="Last Transactions">
        <Card className="space-y-4">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between gap-3">
              <div className="min-w-0"><p className="truncate font-medium">{t.name}</p><p className="text-xs text-muted">{t.date}</p></div>
              <b className={t.amount < 0 ? 'text-red-500' : 'text-green-600'}>{money(t.amount)}</b>
            </div>
          ))}
        </Card>
      </Section>
    </div>
  )
}
