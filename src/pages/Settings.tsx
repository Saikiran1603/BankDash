import { useState, type FormEvent } from 'react'
import { Card } from '../components/ui'

const fields = ['Your Name', 'User Name', 'Email', 'Password', 'Date of Birth', 'Present Address', 'Permanent Address', 'City', 'Postal Code', 'Country']
const initialProfile: Record<string, string> = Object.fromEntries(fields.map((field) => [field, '']))

export default function Settings() {
  const [tab, setTab] = useState('Edit Profile')
  const [profile, setProfile] = useState(initialProfile)
  const [preferences, setPreferences] = useState({ currency: 'USD', timeZone: 'America/New_York', notifications: true, transactionAlerts: true })
  const [feedback, setFeedback] = useState('')

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedback('Profile changes saved.')
  }

  function savePreferences(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedback('Preferences saved.')
  }

  function saveSecurity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedback('Security settings saved.')
  }

  return (
    <Card>
      <div className="mb-6 flex gap-6 overflow-x-auto border-b border-line text-sm">
        {['Edit Profile', 'Preferences', 'Security'].map((t) => (
          <button key={t} onClick={() => { setTab(t); setFeedback('') }} aria-pressed={tab === t} className={`shrink-0 pb-3 font-medium ${tab === t ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}>{t}</button>
        ))}
      </div>
      {tab === 'Edit Profile' ? (
        <form className="grid gap-4 md:grid-cols-2" onSubmit={saveProfile}>
          {fields.map((f) => (
            <label key={f} className="text-sm">{f}
              <input type={f === 'Email' ? 'email' : f === 'Password' ? 'password' : f === 'Date of Birth' ? 'date' : 'text'} value={profile[f]} onChange={(event) => setProfile((current) => ({ ...current, [f]: event.target.value }))} autoComplete={f === 'Email' ? 'email' : f === 'Your Name' ? 'name' : f === 'Password' ? 'new-password' : 'off'} className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-primary" placeholder={f} />
            </label>
          ))}
          {feedback && <p role="status" className="text-sm text-green-600 md:col-span-2">{feedback}</p>}
          <button type="submit" className="rounded-xl bg-primary px-10 py-3 font-medium text-white md:col-span-2 md:w-fit">Save</button>
        </form>
      ) : tab === 'Preferences' ? (
        <form className="max-w-xl space-y-5" onSubmit={savePreferences}>
          <label className="block text-sm">Currency
            <select value={preferences.currency} onChange={(event) => setPreferences((current) => ({ ...current, currency: event.target.value }))} className="mt-2 w-full rounded-xl border border-line bg-panel px-4 py-3 text-ink outline-none focus:border-primary">
              <option value="USD">US Dollar (USD)</option><option value="EUR">Euro (EUR)</option><option value="GBP">British Pound (GBP)</option>
            </select>
          </label>
          <label className="block text-sm">Time Zone
            <select value={preferences.timeZone} onChange={(event) => setPreferences((current) => ({ ...current, timeZone: event.target.value }))} className="mt-2 w-full rounded-xl border border-line bg-panel px-4 py-3 text-ink outline-none focus:border-primary">
              <option value="America/New_York">Eastern Time</option><option value="America/Chicago">Central Time</option><option value="America/Los_Angeles">Pacific Time</option><option value="Europe/London">London</option>
            </select>
          </label>
          <label className="flex items-center justify-between gap-4 rounded-xl border border-line p-4 text-sm">
            <span><span className="block font-medium">Notifications</span><span className="text-muted">Receive account notifications</span></span>
            <input type="checkbox" checked={preferences.notifications} onChange={(event) => setPreferences((current) => ({ ...current, notifications: event.target.checked }))} className="h-4 w-4 accent-primary" />
          </label>
          <label className="flex items-center justify-between gap-4 rounded-xl border border-line p-4 text-sm">
            <span><span className="block font-medium">Transaction alerts</span><span className="text-muted">Get notified about account activity</span></span>
            <input type="checkbox" checked={preferences.transactionAlerts} onChange={(event) => setPreferences((current) => ({ ...current, transactionAlerts: event.target.checked }))} className="h-4 w-4 accent-primary" />
          </label>
          {feedback && <p role="status" className="text-sm text-green-600">{feedback}</p>}
          <button type="submit" className="rounded-xl bg-primary px-10 py-3 font-medium text-white">Save</button>
        </form>
      ) : (
        <form className="grid max-w-xl gap-4" onSubmit={saveSecurity}>
          <label className="text-sm">Current Password
            <input required minLength={8} type="password" autoComplete="current-password" className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-primary" />
          </label>
          <label className="text-sm">New Password
            <input required minLength={8} type="password" autoComplete="new-password" className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-primary" />
          </label>
          {feedback && <p role="status" className="text-sm text-green-600">{feedback}</p>}
          <button type="submit" className="rounded-xl bg-primary px-10 py-3 font-medium text-white sm:w-fit">Update Password</button>
        </form>
      )}
    </Card>
  )
}
