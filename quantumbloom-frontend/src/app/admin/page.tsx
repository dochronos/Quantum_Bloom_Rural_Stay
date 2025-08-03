'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './adminPanel.module.css'

const AdminPanel = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return (
      <div className={styles.mobileMessage}>
        <h2>Acceso no disponible</h2>
        <p>El panel de administración no está disponible en dispositivos móviles.</p>
      </div>
    )
  }

  return (
    <div className={styles.adminPanel}>
      <h1>Panel de Gestión - Quantum Bloom</h1>
      <nav className={styles.adminMenu}>
        <ul>
          <li>
            <Link href="/admin/add-product">Registrar Alojamiento</Link>
          </li>
          <li>
            <Link href="/admin/product-list">Listado de Alojamientos</Link>
          </li>
          <li>
            <Link href="/admin/manage-users">Gestión de Usuarios</Link>
          </li>
          <li>
            <Link href="/admin/manage-features">Características Disponibles</Link>
          </li>
          <li>
            <Link href="/admin/manage-categories">Categorías de Alojamiento</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AdminPanel
