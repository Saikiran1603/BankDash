import { Section, Card, StatCard } from '../components/ui'
import { investments } from '../data'
import { usd } from '../utils/format'

export default function Investments() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Invested Amount" value="$150,000" />
        <StatCard label="Number of Investments" value="1,250" tone="bg-orange-100 text-orange-500" />
        <StatCard label="Rate of Return" value="+5.80%" tone="bg-green-100 text-green-600" />
      </div>
      <Section title="My Investment">
        <div className="space-y-4">
          {investments.map((i) => (
            <Card key={i.name} className="grid grid-cols-2 items-center gap-3 sm:grid-cols-4">
              <div className="col-span-2"><p className="font-semibold">{i.name}</p><p className="text-sm text-muted">{i.category}</p></div>
              <div><p className="text-xs text-muted">Investment Value</p><b>{usd(i.value)}</b></div>
              <div><p className="text-xs text-muted">Return Value</p><b className={i.return.startsWith('+') ? 'text-green-600' : 'text-red-500'}>{i.return}</b></div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
