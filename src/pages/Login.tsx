import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '../store/authStore'
import { useState } from 'react'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
type Form = z.infer<typeof schema>

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) as any })
  const login = useAuthStore(s => s.login)
  const [err, setErr] = useState<string | null>(null)

  const onSubmit = async (data: Form) => {
    setErr(null)
    try { await login(data.email, data.password) } catch (e:any) { setErr(e.message) }
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input {...register('email')} placeholder="you@example.com" />
        {errors.email && <small className="error">{errors.email.message}</small>}

        <label>Password</label>
        <input type="password" {...register('password')} placeholder="••••••••" />
        {errors.password && <small className="error">{errors.password.message}</small>}

        {err && <small className="error">{err}</small>}

        <button disabled={isSubmitting}>{isSubmitting ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  )
}
