import Card from './Card'

interface Props { label: string; value: string; tone?: string }

export default function StatCard({ label, value, tone = 'bg-primary/10 text-primary' }: Props) {
  return (
    <Card className="flex items-center gap-4">
      <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-xl font-semibold ${tone}`}>$</div>
      <div className="min-w-0">
        <p className="truncate text-sm text-muted">{label}</p>
        <p className="truncate text-xl font-semibold">{value}</p>
      </div>
    </Card>
  )
}
