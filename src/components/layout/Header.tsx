import { useState, type FormEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Bell, Menu, Moon, Search, Settings, Sun } from 'lucide-react'
import { useBank } from '../../state/BankContext'
import { useTheme } from '../../state/ThemeContext'

interface Props { title: string; onMenu: () => void }

export default function Header({ title, onMenu }: Props) {
  const [query, setQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const { transactions } = useBank()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const pendingTransactions = transactions.filter((transaction) => transaction.status === 'Pending')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const search = query.trim()
    if (search) navigate(`/transactions?search=${encodeURIComponent(search)}`)
  }

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center gap-3 border-b border-line bg-panel px-4 py-4 sm:px-8 lg:h-20 lg:flex-nowrap lg:py-0">
      <button className="rounded-lg p-2 text-ink xl:hidden" onClick={onMenu} aria-label="Open menu">
        <Menu />
      </button>
      <h1 className="flex-1 text-xl font-semibold sm:text-3xl">{title}</h1>
      <form onSubmit={handleSearch} className="order-last flex w-full items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-muted sm:order-none sm:w-64">
        <Search size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-sm outline-none placeholder:text-muted" placeholder="Search for something" aria-label="Search all transactions" />
      </form>
      <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} className="rounded-full bg-surface p-3 text-muted transition-colors hover:text-primary">
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>
      <NavLink to="/settings" aria-label="Settings" className="hidden rounded-full bg-surface p-3 text-muted sm:block"><Settings size={18} /></NavLink>
      <div className="relative">
        <button type="button" aria-label="Notifications" aria-expanded={showNotifications} onClick={() => setShowNotifications((visible) => !visible)} className="relative rounded-full bg-surface p-3 text-red-500">
          <Bell size={18} />
          {pendingTransactions.length > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />}
        </button>
        {showNotifications && (
          <div className="absolute right-0 top-14 z-30 w-72 rounded-2xl border border-line bg-panel p-4 shadow-lg">
            <p className="font-semibold text-ink">Notifications</p>
            {pendingTransactions.length ? (
              <ul className="mt-3 space-y-3">
                {pendingTransactions.slice(0, 3).map((transaction) => (
                  <li key={transaction.id} className="text-sm">
                    <p className="font-medium">{transaction.name}</p>
                    <p className="text-xs text-muted">Awaiting completion · {transaction.date}</p>
                  </li>
                ))}
              </ul>
            ) : <p className="mt-3 text-sm text-muted">You're all caught up.</p>}
            <NavLink onClick={() => setShowNotifications(false)} to="/transactions" className="mt-4 inline-block text-sm font-medium text-primary">View transactions</NavLink>
          </div>
        )}
      </div>
      <NavLink to="/settings" aria-label="Open profile settings" className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-semibold text-white">EC</NavLink>
    </header>
  )
}
