import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as API from '../api/auth'
import { useState } from 'react'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
type Form = z.infer<typeof schema>

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Form>({ resolver: zodResolver(schema) as any })
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const onSubmit = async (data: Form) => {
    setMsg(null); setErr(null)
    try {
      await API.register(data.email, data.password)
      setMsg("Registered! You can log in now.")
      reset()
    } catch (e:any) { setErr(e.message) }
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input {...register('email')} placeholder="you@example.com" />
        {errors.email && <small className="error">{errors.email.message}</small>}

        <label>Password</label>
        <input type="password" {...register('password')} placeholder="Min 8 chars" />
        {errors.password && <small className="error">{errors.password.message}</small>}

        {msg && <small>{msg}</small>}
        {err && <small className="error">{err}</small>}

        <button disabled={isSubmitting}>{isSubmitting ? 'Creating…' : 'Create account'}</button>
      </form>
    </div>
  )
}
