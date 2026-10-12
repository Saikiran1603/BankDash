import { Badge, TableWrap } from '../components/ui'
import { privileges } from '../data'

export default function Privileges() {
  return (
    <TableWrap>
      <thead className="text-muted"><tr>{['Privilege', 'Details', 'Status'].map((h) => <th key={h} className="px-6 py-4 font-medium">{h}</th>)}</tr></thead>
      <tbody>
        {privileges.map((p) => (
          <tr key={p.name} className="border-t border-line">
            <td className="px-6 py-4 font-medium">{p.name}</td><td className="px-6 py-4 text-muted">{p.desc}</td>
            <td className="px-6 py-4"><Badge ok={p.status === 'Active'}>{p.status}</Badge></td>
          </tr>
        ))}
      </tbody>
    </TableWrap>
  )
}
