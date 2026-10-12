import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { nav } from '../../data'

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const current = nav.find((n) => (n.end ? pathname === n.to : pathname.startsWith(n.to)))

  useEffect(() => setOpen(false), [pathname])

  return (
    <div className="min-h-screen xl:flex">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="min-w-0 flex-1">
        <Header title={current?.label ?? 'Page'} onMenu={() => setOpen(true)} />
        <main className="p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
