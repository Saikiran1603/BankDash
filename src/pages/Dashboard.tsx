import { Link } from 'react-router-dom'
import { CreditCard, Section } from '../components/ui'
import { BalanceChart, ExpenseStats, WeeklyActivity } from '../components/charts'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import QuickTransfer from '../components/dashboard/QuickTransfer'
import { useBank } from '../state/BankContext'

export default function Dashboard() {
  const { cards } = useBank()

  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      <Section title="My Cards" className="lg:col-span-2" action={<Link to="/credit-cards" className="text-sm font-medium">See All</Link>}>
        <div className="grid gap-4 sm:grid-cols-2">{cards.map((c) => <CreditCard key={c.id} card={c} />)}</div>
      </Section>
      <Section title="Recent Transaction"><RecentTransactions /></Section>
      <Section title="Weekly Activity" className="lg:col-span-2"><WeeklyActivity /></Section>
      <Section title="Expense Statistics"><ExpenseStats /></Section>
      <Section title="Quick Transfer"><QuickTransfer /></Section>
      <Section title="Balance History" className="lg:col-span-2"><BalanceChart /></Section>
    </div>
  )
}
