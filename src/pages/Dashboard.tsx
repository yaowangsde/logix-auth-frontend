import { useAuthStore } from '../store/authStore'

export default function Dashboard() {
  const token = useAuthStore(s => s.accessToken)
  const refresh = useAuthStore(s => s.refresh)
  const logout = useAuthStore(s => s.logout)

  return (
    <div className="container">
      <header className="app">
        <h1>Dashboard</h1>
        <div className="row">
          <button onClick={refresh}>Refresh Access Token</button>
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <div className="card">
        <h3>Access Token</h3>
        <pre>{token}</pre>
      </div>
    </div>
  )
}
