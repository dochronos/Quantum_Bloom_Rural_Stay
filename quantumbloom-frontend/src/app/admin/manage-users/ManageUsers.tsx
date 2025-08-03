'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './manageUsers.module.css'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users')
        setUsers(response.data)
      } catch (err) {
        setError('Error al obtener los usuarios.')
      }
    }

    fetchUsers()
  }, [])

  const makeAdmin = async (userId: number) => {
    try {
      await axios.patch(`/api/users/${userId}`, { role: 'ADMIN' })
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: 'ADMIN' } : user
        )
      )
    } catch (err) {
      setError('Error al actualizar el rol del usuario.')
    }
  }

  return (
    <div className={styles.manageUsers}>
      <h2>Gestión de Usuarios</h2>
      {error && <p className={styles.error}>{error}</p>}
      <table className={styles.usersTable}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td data-label="Nombre">{user.name}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Rol">{user.role}</td>
              <td data-label="Acciones">
                {user.role !== 'ADMIN' && (
                  <button onClick={() => makeAdmin(user.id)}>
                    Hacer Administrador
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageUsers
