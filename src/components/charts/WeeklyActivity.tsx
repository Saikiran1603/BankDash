import { Card } from '../ui'
import { weekly } from '../../data'

export default function WeeklyActivity() {
  const max = 500
  return (
    <Card>
      <div className="flex h-56 items-end justify-between gap-2 sm:gap-4">
        {weekly.map((w) => (
          <div key={w.d} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-44 w-full items-end justify-center gap-1">
              <div className="w-2 rounded-full bg-ink sm:w-3" style={{ height: `${(w.dep / max) * 100}%` }} />
              <div className="w-2 rounded-full bg-primary sm:w-3" style={{ height: `${(w.wd / max) * 100}%` }} />
            </div>
            <span className="text-xs text-muted">{w.d}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-4 text-xs text-muted">
        <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-ink" />Deposit</span>
        <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-primary" />Withdraw</span>
      </div>
    </Card>
  )
}
