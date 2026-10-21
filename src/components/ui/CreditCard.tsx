import type { BankCard } from '../../types'

export default function CreditCard({ card, compact = false }: { card: BankCard; compact?: boolean }) {
  const blue = card.variant === 'blue'
  const sub = blue ? 'text-white/70' : 'text-muted'
  return (
    <div
      className={`flex w-full flex-col justify-between ${
        compact ? 'min-h-[150px] rounded-2xl p-4' : 'min-h-[200px] rounded-3xl p-5'
      } ${
        blue ? 'bg-gradient-to-br from-[#4C49ED] to-[#0A06F4] text-white' : 'border border-line bg-panel text-ink'
      }`}
    >
      <div className="flex justify-between">
        <div>
          <p className={`${compact ? 'text-[10px]' : 'text-xs'} ${sub}`}>Balance</p>
          <p className={`${compact ? 'text-sm' : 'text-xl'} font-semibold`}>{card.balance}</p>
        </div>
        <div className={`${compact ? 'h-6 w-8' : 'h-8 w-10'} rounded-md bg-white/30`} />
      </div>
      <div className={`flex gap-5 ${compact ? 'text-[10px]' : 'text-sm'}`}>
        <div><p className={`${compact ? 'text-[8px]' : 'text-xs'} ${sub}`}>CARD HOLDER</p><p className="font-medium">{card.holder}</p></div>
        <div><p className={`${compact ? 'text-[8px]' : 'text-xs'} ${sub}`}>VALID THRU</p><p className="font-medium">{card.valid}</p></div>
      </div>
      <p className={`${compact ? 'text-[11px]' : 'text-lg'} tracking-widest`}>{card.number}</p>
    </div>
  )
}
