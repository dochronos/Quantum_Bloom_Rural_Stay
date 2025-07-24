import React, { useEffect, useState } from 'react';
import './ManageUsers.css';
import { Navigate } from 'react-router-dom';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setRedirectToLogin(true);
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('No autorizado o error al cargar los usuarios');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message || 'Error al cargar los usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const makeAdmin = async (userId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:8080/api/admin/users/${userId}/make-admin`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('No se pudo otorgar permisos de administrador');
      }

      const updatedUser = await response.json();
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    } catch (err) {
      setError(err.message || 'Error al actualizar el rol del usuario');
    }
  };

  if (redirectToLogin) return <Navigate to="/" replace />;
  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="manage-users">
      <h2>Gestión de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
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
  );
};

export default ManageUsers;
