import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="text-6xl font-semibold text-primary">404</p>
      <p className="mt-2 text-muted">This page doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block rounded-full bg-primary px-6 py-2 text-white">Back to Dashboard</Link>
    </div>
  )
}
