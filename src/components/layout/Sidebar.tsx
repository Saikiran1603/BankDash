import { NavLink } from 'react-router-dom'
import { Landmark } from 'lucide-react'
import { nav } from '../../data'

interface Props { open: boolean; onClose: () => void }

export default function Sidebar({ open, onClose }: Props) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/40 xl:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto overscroll-contain border-r border-line bg-panel transition-transform xl:static xl:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center gap-3 px-8 text-2xl font-semibold text-ink">
          <Landmark className="text-primary" /> BankDash.
        </div>
        <nav className="space-y-1 py-2">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative flex items-center gap-5 px-8 py-3 text-[15px] font-medium transition-colors ${
                  isActive ? 'text-primary before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-r before:bg-primary' : 'text-muted hover:text-ink'
                }`
              }
            >
              <Icon size={22} /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
