import { useState, type FormEvent } from 'react'
import { Section, Card, CreditCard } from '../components/ui'
import { useBank } from '../state/BankContext'

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
    <div className="space-y-6">
      <Section title="My Cards">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map((c) => <CreditCard key={c.id} card={c} />)}</div>
      </Section>
      <Section title="Add New Card">
        <Card>
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleAddCard}>
            <label className="text-sm text-ink">Card Type
              <select value={cardType} onChange={(event) => setCardType(event.target.value)} className="mt-2 w-full rounded-xl border border-line bg-panel px-4 py-3 text-ink outline-none focus:border-primary">
                <option>Visa</option><option>Mastercard</option>
              </select>
            </label>
            <label className="text-sm text-ink">Name On Card
              <input required value={holder} onChange={(event) => setHolder(event.target.value)} autoComplete="cc-name" className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-primary" placeholder="Name On Card" />
            </label>
            <label className="text-sm text-ink">Card Number
              <input required inputMode="numeric" autoComplete="cc-number" value={cardNumber} onChange={(event) => setCardNumber(event.target.value.replace(/[^\d ]/g, '').slice(0, 23))} className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-primary" placeholder="Card Number" />
            </label>
            <label className="text-sm text-ink">Expiration Date
              <input required autoComplete="cc-exp" value={expiration} onChange={(event) => setExpiration(event.target.value.slice(0, 5))} pattern="(0[1-9]|1[0-2])\/[0-9]{2}" className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-primary" placeholder="MM/YY" />
            </label>
            {feedback && <p role="status" className={`text-sm sm:col-span-2 ${isError ? 'text-red-500' : 'text-green-600'}`}>{feedback}</p>}
            <button type="submit" className="rounded-xl bg-primary px-6 py-3 font-medium text-white sm:col-span-2 sm:w-fit">Add Card</button>
          </form>
        </Card>
      </Section>
    </div>
  )
}
