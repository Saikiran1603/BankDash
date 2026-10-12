import type { BankCard } from '../../types'

export default function CreditCard({ card }: { card: BankCard }) {
  const blue = card.variant === 'blue'
  const sub = blue ? 'text-white/70' : 'text-muted'
  return (
    <div
      className={`flex min-h-[200px] w-full flex-col justify-between rounded-3xl p-5 ${
        blue ? 'bg-gradient-to-br from-[#4C49ED] to-[#0A06F4] text-white' : 'border border-line bg-panel text-ink'
      }`}
    >
      <div className="flex justify-between">
        <div>
          <p className={`text-xs ${sub}`}>Balance</p>
          <p className="text-xl font-semibold">{card.balance}</p>
        </div>
        <div className="h-8 w-10 rounded-md bg-white/30" />
      </div>
      <div className="flex gap-8 text-sm">
        <div><p className={`text-xs ${sub}`}>CARD HOLDER</p><p className="font-medium">{card.holder}</p></div>
        <div><p className={`text-xs ${sub}`}>VALID THRU</p><p className="font-medium">{card.valid}</p></div>
      </div>
      <p className="text-lg tracking-widest">{card.number}</p>
    </div>
  )
}
