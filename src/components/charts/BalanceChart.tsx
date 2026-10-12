import { Card } from '../ui'
import { balanceHistory } from '../../data'

export default function BalanceChart() {
  const w = 400, h = 160, max = 800
  const line = balanceHistory
    .map((v, i) => `${(i / (balanceHistory.length - 1)) * w},${h - (v / max) * h}`)
    .join(' ')
  return (
    <Card>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-44 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="balanceFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#2D60FF" stopOpacity=".25" />
            <stop offset="1" stopColor="#2D60FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,${h} ${line} ${w},${h}`} fill="url(#balanceFill)" />
        <polyline points={line} fill="none" stroke="#1814F3" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
    </Card>
  )
}
