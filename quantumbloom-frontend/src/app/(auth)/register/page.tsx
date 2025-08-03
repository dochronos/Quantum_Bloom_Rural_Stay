'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Register.module.css'

interface FormData {
  name: string
  email: string
  password: string
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, password } = formData

    if (!name || !email || !password) {
      setError('Todos los campos son obligatorios.')
      return
    }

    // Simula el registro exitoso
    setSuccess(true)
    setError(null)

    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.title}>Crear Cuenta</h2>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>¡Registro exitoso! Redirigiendo...</p>}
        <button type="submit" className={styles.submitButton}>
          Registrarse
        </button>
      </form>
    </div>
  )
}

export default Register
