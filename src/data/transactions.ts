import type { Transaction } from '../types'

export const transactions: Transaction[] = [
  { id: 1, name: 'Deposit from my Card', date: '28 January 2021', amount: -850, type: 'Shopping', card: '1234 ****', status: 'Pending' },
  { id: 2, name: 'Deposit Paypal', date: '25 January 2021', amount: 2500, type: 'Service', card: '1234 ****', status: 'Completed' },
  { id: 3, name: 'Jemi Wilson', date: '21 January 2021', amount: 5400, type: 'Transfer', card: '1234 ****', status: 'Completed' },
  { id: 4, name: 'Spotify Subscription', date: '19 January 2021', amount: -150, type: 'Service', card: '8890 ****', status: 'Completed' },
  { id: 5, name: 'Grocery Store', date: '16 January 2021', amount: -320, type: 'Shopping', card: '1234 ****', status: 'Completed' },
  { id: 6, name: 'Freelance Payment', date: '12 January 2021', amount: 1800, type: 'Transfer', card: '8890 ****', status: 'Pending' },
]
