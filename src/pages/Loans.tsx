import { Section, StatCard, TableWrap } from '../components/ui'
import { loans } from '../data'
import { usd } from '../utils/format'

export default function Loans() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Personal Loans" value="$50,000" />
        <StatCard label="Corporate Loans" value="$100,000" tone="bg-orange-100 text-orange-500" />
        <StatCard label="Business Loans" value="$500,000" tone="bg-red-100 text-red-500" />
        <StatCard label="Custom Loans" value="Choose Money" tone="bg-green-100 text-green-600" />
      </div>
      <Section title="Active Loans Overview">
        <TableWrap>
          <thead className="text-muted"><tr>{['SL No', 'Loan Money', 'Left to repay', 'Duration', 'Interest rate', 'Installment'].map((h) => <th key={h} className="px-6 py-4 font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {loans.map((l) => (
              <tr key={l.id} className="border-t border-line">
                <td className="px-6 py-4">{l.id}</td><td className="px-6 py-4">{usd(l.money)}</td><td className="px-6 py-4">{usd(l.left)}</td>
                <td className="px-6 py-4">{l.duration}</td><td className="px-6 py-4">{l.rate}</td><td className="px-6 py-4">{usd(l.installment)}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>
    </div>
  )
}
