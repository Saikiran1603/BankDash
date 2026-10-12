import type { Privilege } from '../types'

export const privileges: Privilege[] = [
  { name: 'Overseas ATM withdrawals', desc: 'No-fee withdrawals abroad', status: 'Active' },
  { name: 'Airport lounge access', desc: '4 visits per year', status: 'Active' },
  { name: 'Cashback on shopping', desc: '2% on eligible purchases', status: 'Inactive' },
  { name: 'Priority support', desc: '24/7 dedicated line', status: 'Active' },
]
