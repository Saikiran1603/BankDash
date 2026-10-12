import { createContext, useContext, useState, type ReactNode } from 'react'
import { cards as initialCards, transactions as initialTransactions } from '../data'
import type { BankCard, Transaction } from '../types'

interface BankContextValue {
  cards: BankCard[]
  transactions: Transaction[]
  addCard: (card: BankCard) => void
  sendTransfer: (name: string, amount: number) => void
}

const BankContext = createContext<BankContextValue | null>(null)

export function BankProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState(initialCards)
  const [transactions, setTransactions] = useState(initialTransactions)

  function addCard(card: BankCard) {
    setCards((current) => [...current, card])
  }

  function sendTransfer(name: string, amount: number) {
    const date = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date())

    setTransactions((current) => [
      {
        id: Math.max(0, ...current.map((transaction) => transaction.id)) + 1,
        name,
        date,
        amount: -amount,
        type: 'Transfer',
        card: `${cards[0]?.number.slice(-4) ?? '0000'} ****`,
        status: 'Completed',
      },
      ...current,
    ])
  }

  return (
    <BankContext.Provider value={{ cards, transactions, addCard, sendTransfer }}>
      {children}
    </BankContext.Provider>
  )
}

export function useBank() {
  const context = useContext(BankContext)
  if (!context) throw new Error('useBank must be used within a BankProvider')
  return context
}
