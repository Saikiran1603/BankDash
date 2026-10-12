import {
  Home, ArrowLeftRight, User, TrendingUp, CreditCard as CardIcon, Landmark, Wrench, ShieldCheck, Settings,
} from 'lucide-react'
import type { NavItem } from '../types'

export const nav: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: Home, end: true },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/accounts', label: 'Accounts', icon: User },
  { to: '/investments', label: 'Investments', icon: TrendingUp },
  { to: '/credit-cards', label: 'Credit Cards', icon: CardIcon },
  { to: '/loans', label: 'Loans', icon: Landmark },
  { to: '/services', label: 'Services', icon: Wrench },
  { to: '/privileges', label: 'My Privileges', icon: ShieldCheck },
  { to: '/settings', label: 'Setting', icon: Settings },
]
