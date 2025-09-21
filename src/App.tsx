import { useAuthStore } from './store/authStore'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { useState } from 'react'

export default function App() {
  const token = useAuthStore(s => s.accessToken)
  const [tab, setTab] = useState<'login'|'register'>('login')

  if (!token) {
    return (
      <div className="container">
        <h1>logix-auth</h1>
        <div className="tabs">
          <button className={tab==='login'?'active':''} onClick={()=>setTab('login')}>Login</button>
          <button className={tab==='register'?'active':''} onClick={()=>setTab('register')}>Register</button>
        </div>
        {tab==='login' ? <Login/> : <Register/>}
      </div>
    )
  }
  return <Dashboard/>
}
