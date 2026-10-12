import { Card } from '../components/ui'
import { services } from '../data'

export default function Services() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {services.map((s) => (
        <Card key={s.name} className="flex items-center gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 font-semibold text-primary">{s.name[0]}</div>
          <div><p className="font-semibold">{s.name}</p><p className="text-sm text-muted">{s.text}</p></div>
        </Card>
      ))}
    </div>
  )
}
