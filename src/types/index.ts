import type { LucideIcon } from 'lucide-react'

export interface NavItem { to: string; label: string; icon: LucideIcon; end?: boolean }
export interface BankCard { id: number; balance: string; holder: string; number: string; valid: string; variant: 'blue' | 'light' }
export interface Transaction { id: number; name: string; date: string; amount: number; type: string; card: string; status: 'Pending' | 'Completed' }
export interface WeeklyPoint { d: string; dep: number; wd: number }
export interface ExpenseSlice { label: string; value: number; color: string }
export interface Contact { name: string; role: string }
export interface Loan { id: string; money: number; left: number; duration: string; rate: string; installment: number }
export interface Investment { name: string; category: string; value: number; return: string }
export interface Service { name: string; text: string }
export interface Privilege { name: string; desc: string; status: 'Active' | 'Inactive' }
