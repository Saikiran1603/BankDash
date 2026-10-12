import { useState, type FormEvent } from 'react'
import { Card } from '../ui'
import { contacts } from '../../data'
import { useBank } from '../../state/BankContext'

export default function QuickTransfer() {
  const { sendTransfer } = useBank()
  const [selected, setSelected] = useState(contacts[0]?.name ?? '')
  const [amount, setAmount] = useState('525.50')
  const [feedback, setFeedback] = useState('')
  const [isError, setIsError] = useState(false)

  function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = Number(amount)
    if (!selected || !Number.isFinite(value) || value <= 0) {
      setFeedback('Choose a recipient and enter an amount greater than zero.')
      setIsError(true)
      return
    }

    sendTransfer(selected, value)
    setFeedback(`Transfer of $${value.toFixed(2)} sent to ${selected}.`)
    setIsError(false)
  }

  return (
    <Card>
      <div className="mb-4 flex gap-4 overflow-x-auto pb-1">
        {contacts.map((c) => (
          <button key={c.name} type="button" onClick={() => { setSelected(c.name); setFeedback('') }} aria-pressed={selected === c.name} className="shrink-0 text-center text-xs">
            <div className={`mx-auto mb-1 grid h-14 w-14 place-items-center rounded-full font-semibold ${selected === c.name ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>{c.name[0]}</div>
            <p className="font-medium">{c.name}</p><p className="text-muted">{c.role}</p>
          </button>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <label className="flex items-center gap-2 rounded-full bg-surface p-1 pl-4 text-sm">
          <span className="shrink-0 text-muted">Write Amount</span>
          <input aria-label="Transfer amount" type="number" min="0.01" step="0.01" required value={amount} onChange={(event) => setAmount(event.target.value)} className="min-w-0 flex-1 bg-transparent text-right outline-none" />
          <button type="submit" className="rounded-full bg-primary px-5 py-2 text-white transition hover:bg-blue-700">Send</button>
        </label>
        {feedback && <p role="status" className={`mt-3 text-xs ${isError ? 'text-red-500' : 'text-green-600'}`}>{feedback}</p>}
      </form>
    </Card>
  )
}
