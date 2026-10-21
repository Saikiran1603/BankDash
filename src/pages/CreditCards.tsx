import { useState, type FormEvent } from 'react'
import { Apple, CreditCard as CreditCardIcon, KeyRound, LockKeyhole, Smartphone, WalletCards } from 'lucide-react'
import { Section, Card, CreditCard } from '../components/ui'
import { useBank } from '../state/BankContext'

const cardExpenses = [
  { label: 'DBL Bank', value: 35, color: '#4169f5' },
  { label: 'BRC Bank', value: 20, color: '#fa5b87' },
  { label: 'ABM Bank', value: 25, color: '#10c9b6' },
  { label: 'MCP Bank', value: 20, color: '#ffb547' },
]

const banks = ['DBL Bank', 'BRC Bank', 'ABM Bank', 'MCP Bank']

const settings = [
  { title: 'Block Card', description: 'Instantly block your card', icon: LockKeyhole, color: 'bg-amber-100 text-amber-500' },
  { title: 'Change Pin Code', description: 'Choose another pin code', icon: KeyRound, color: 'bg-indigo-100 text-indigo-500' },
  { title: 'Add to Google Pay', description: 'Withdraw without any card', icon: Smartphone, color: 'bg-pink-100 text-pink-500' },
  { title: 'Add to Apple Pay', description: 'Withdraw without any card', icon: Apple, color: 'bg-teal-100 text-teal-500' },
  { title: 'Add to Apple Store', description: 'Withdraw without any card', icon: WalletCards, color: 'bg-teal-100 text-teal-500' },
]

function CardExpenseStats() {
  let offset = 0
  const stops = cardExpenses.map(({ color, value }) => {
    const stop = `${color} ${offset}% ${offset + value}%`
    offset += value
    return stop
  }).join(', ')

  return (
    <Card className="flex h-full flex-col items-center justify-center gap-4 !p-4">
      <div className="relative h-32 w-32 shrink-0 rounded-full" style={{ background: `conic-gradient(${stops})` }}>
        <div className="absolute inset-8 rounded-full bg-panel" />
      </div>
      <ul className="grid w-full grid-cols-2 gap-x-3 gap-y-2 text-[11px] text-muted">
        {cardExpenses.map((expense) => (
          <li key={expense.label} className="flex min-w-0 items-center gap-1.5">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: expense.color }} />
            <span className="truncate">{expense.label}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default function CreditCards() {
  const { cards, addCard } = useBank()
  const [cardType, setCardType] = useState('Visa')
  const [holder, setHolder] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiration, setExpiration] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isError, setIsError] = useState(false)

  function handleAddCard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const digits = cardNumber.replace(/\D/g, '')
    const expiry = /^(\d{2})\/(\d{2})$/.exec(expiration)
    if (holder.trim().length < 2 || digits.length < 12 || digits.length > 19 || !expiry) {
      setFeedback('Enter a cardholder name, a valid card number, and an expiration date in MM/YY format.')
      setIsError(true)
      return
    }

    const month = Number(expiry[1])
    const year = 2000 + Number(expiry[2])
    const now = new Date()
    if (month < 1 || month > 12 || year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
      setFeedback('Enter a valid, unexpired expiration date.')
      setIsError(true)
      return
    }

    addCard({
      id: Math.max(0, ...cards.map((card) => card.id)) + 1,
      balance: '$0',
      holder: holder.trim(),
      number: `${digits.slice(0, 4)} **** **** ${digits.slice(-4)}`,
      valid: expiration,
      variant: cardType === 'Visa' ? 'blue' : 'light',
    })
    setCardType('Visa')
    setHolder('')
    setCardNumber('')
    setExpiration('')
    setFeedback('Your card was added.')
    setIsError(false)
  }

  return (
    <div className="grid gap-x-6 gap-y-12 xl:grid-cols-3">
      <Section title="My Cards" className="xl:col-span-3">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => <CreditCard key={card.id} card={card} compact />)}
        </div>
      </Section>

      <Section title="Card Expense Statistics">
        <CardExpenseStats />
      </Section>

      <Section title="Card List" className="pt-4 xl:col-span-2 xl:pt-0">
        <Card className="space-y-2 !p-3">
          {cards.map((card, index) => (
            <div key={card.id} className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,.8fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-2 rounded-xl border border-line px-3 py-2 text-[10px]">
              <div className="flex min-w-0 items-center gap-2">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${index % 2 === 0 ? 'bg-blue-100 text-primary' : 'bg-pink-100 text-pink-500'}`}>
                  <CreditCardIcon size={16} />
                </span>
                <span className="min-w-0"><span className="block font-medium text-ink">Card Type</span><span className="text-muted">Secondary</span></span>
              </div>
              <div className="min-w-0"><span className="block font-medium text-ink">Bank</span><span className="truncate text-muted">{banks[index % banks.length]}</span></div>
              <div className="min-w-0"><span className="block font-medium text-ink">Card Number</span><span className="truncate text-muted">{card.number.replace(/^\d{4}/, '****')}</span></div>
              <div className="min-w-0"><span className="block font-medium text-ink">Name On Card</span><span className="truncate text-muted">{card.holder.split(' ')[0]}</span></div>
              <span className="whitespace-nowrap font-medium text-primary">View Details</span>
            </div>
          ))}
        </Card>
      </Section>

      <Section title="Add New Card" className="xl:col-span-2 xl:pt-6">
        <Card className="!p-4">
          <p className="mb-4 text-xs leading-5 text-muted">
            Credit Card generally means a plastic card issued by Scheduled Commercial Banks assigned to a Cardholder, with a credit limit, that can be used to purchase goods and services on credit or obtain cash advances.
          </p>
          <form className="grid gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={handleAddCard}>
            <label className="text-xs font-medium text-ink">Card Type
              <select value={cardType} onChange={(event) => setCardType(event.target.value)} className="mt-1.5 w-full rounded-lg border border-line bg-panel px-3 py-2 text-xs text-muted outline-none focus:border-primary">
                <option>Visa</option><option>Mastercard</option>
              </select>
            </label>
            <label className="text-xs font-medium text-ink">Name On Card
              <input required value={holder} onChange={(event) => setHolder(event.target.value)} autoComplete="cc-name" className="mt-1.5 w-full rounded-lg border border-line bg-panel px-3 py-2 text-xs text-ink outline-none focus:border-primary" placeholder="My Cards" />
            </label>
            <label className="text-xs font-medium text-ink">Card Number
              <input required inputMode="numeric" autoComplete="cc-number" value={cardNumber} onChange={(event) => setCardNumber(event.target.value.replace(/[^\d ]/g, '').slice(0, 23))} className="mt-1.5 w-full rounded-lg border border-line bg-panel px-3 py-2 text-xs text-ink outline-none focus:border-primary" placeholder="**** **** **** ****" />
            </label>
            <label className="text-xs font-medium text-ink">Expiration Date
              <input required autoComplete="cc-exp" value={expiration} onChange={(event) => setExpiration(event.target.value.slice(0, 5))} pattern="(0[1-9]|1[0-2])\/[0-9]{2}" className="mt-1.5 w-full rounded-lg border border-line bg-panel px-3 py-2 text-xs text-ink outline-none focus:border-primary" placeholder="25 January 2025" />
            </label>
            {feedback && <p role="status" className={`text-xs sm:col-span-2 ${isError ? 'text-red-500' : 'text-green-600'}`}>{feedback}</p>}
            <button type="submit" className="rounded-lg bg-primary px-5 py-2 text-xs font-medium text-white sm:col-span-2 sm:w-fit">Add Card</button>
          </form>
        </Card>
      </Section>

      <Section title="Card Setting">
        <Card className="space-y-1 !p-3">
          {settings.map(({ title, description, icon: Icon, color }) => (
            <div key={title} className="flex items-center gap-3 rounded-xl px-2 py-2">
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${color}`}><Icon size={17} /></span>
              <span className="min-w-0"><span className="block text-xs font-medium text-ink">{title}</span><span className="block truncate text-[10px] text-muted">{description}</span></span>
            </div>
          ))}
        </Card>
      </Section>
    </div>
  )
}
