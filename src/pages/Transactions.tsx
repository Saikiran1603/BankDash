import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Section, CreditCard, Badge, TableWrap } from '../components/ui'
import { useBank } from '../state/BankContext'
import { money } from '../utils/format'

export default function Transactions() {
  const [tab, setTab] = useState('All')
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('search') ?? '')
  const { cards, transactions } = useBank()
  const tabs = ['All', 'Income', 'Expense']
  useEffect(() => {
    setQuery(searchParams.get('search') ?? '')
  }, [searchParams])

  const normalizedQuery = query.trim().toLowerCase()
  const rows = transactions.filter((t) => {
    const matchesTab = tab === 'All' || (tab === 'Income' ? t.amount > 0 : t.amount < 0)
    const matchesSearch = !normalizedQuery || [t.name, t.type, t.card, t.date, t.status]
      .some((value) => value.toLowerCase().includes(normalizedQuery))
    return matchesTab && matchesSearch
  })
  return (
    <div className="space-y-6">
      <Section title="My Cards">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map((c) => <CreditCard key={c.id} card={c} />)}</div>
      </Section>
      <Section title="Recent Transactions">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line text-sm">
          <div className="flex gap-6">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`pb-2 font-medium ${tab === t ? 'border-b-2 border-primary text-primary' : 'text-muted'}`} aria-pressed={tab === t}>{t}</button>
            ))}
          </div>
          <label className="mb-2 flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-muted">
            <span className="sr-only">Search transactions</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search transactions" className="w-40 bg-transparent text-ink outline-none placeholder:text-muted" />
          </label>
        </div>
        <TableWrap>
          <thead className="text-muted"><tr>{['Description', 'Type', 'Card', 'Date', 'Status', 'Amount'].map((h) => <th key={h} className="px-6 py-4 font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id} className="border-t border-line">
                <td className="px-6 py-4 font-medium">{t.name}</td>
                <td className="px-6 py-4 text-muted">{t.type}</td>
                <td className="px-6 py-4 text-muted">{t.card}</td>
                <td className="px-6 py-4 text-muted">{t.date}</td>
                <td className="px-6 py-4"><Badge ok={t.status === 'Completed'}>{t.status}</Badge></td>
                <td className={`px-6 py-4 font-semibold ${t.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>{money(t.amount)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr className="border-t border-line">
                <td className="px-6 py-10 text-center text-muted" colSpan={6}>No transactions match your filters.</td>
              </tr>
            )}
          </tbody>
        </TableWrap>
      </Section>
    </div>
  )
}
