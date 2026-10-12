import { Card } from '../ui'
import { expenses } from '../../data'

export default function ExpenseStats() {
  let acc = 0
  const stops = expenses
    .map((e) => {
      const s = `${e.color} ${acc}% ${acc + e.value}%`
      acc += e.value
      return s
    })
    .join(', ')
  return (
    <Card className="flex flex-col items-center gap-5 sm:flex-row lg:flex-col 2xl:flex-row">
      <div className="h-44 w-44 shrink-0 rounded-full" style={{ background: `conic-gradient(${stops})` }} />
      <ul className="w-full space-y-2 text-sm sm:w-auto lg:w-full 2xl:w-auto">
        {expenses.map((e) => (
          <li key={e.label} className="flex items-center gap-2 text-muted">
            <i className="h-3 w-3 rounded-full" style={{ background: e.color }} />{e.label} <b className="text-ink">{e.value}%</b>
          </li>
        ))}
      </ul>
    </Card>
  )
}
