import type { ExpenseSlice, WeeklyPoint } from '../types'

export const weekly: WeeklyPoint[] = [
  { d: 'Sat', dep: 230, wd: 450 }, { d: 'Sun', dep: 120, wd: 330 }, { d: 'Mon', dep: 260, wd: 320 },
  { d: 'Tue', dep: 380, wd: 150 }, { d: 'Wed', dep: 220, wd: 380 }, { d: 'Thu', dep: 330, wd: 250 }, { d: 'Fri', dep: 300, wd: 360 },
]

export const expenses: ExpenseSlice[] = [
  { label: 'Entertainment', value: 30, color: '#343C6A' },
  { label: 'Bill Expense', value: 15, color: '#FC7900' },
  { label: 'Investment', value: 20, color: '#1814F3' },
  { label: 'Others', value: 35, color: '#FA00FF' },
]

export const balanceHistory = [120, 210, 150, 480, 320, 600, 540, 700]
