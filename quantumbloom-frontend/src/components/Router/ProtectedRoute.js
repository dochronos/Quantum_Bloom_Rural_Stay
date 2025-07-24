import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, requiredRole, children }) => {
  // Si el usuario está en proceso de carga
  if (user === undefined) {
    return <div>Cargando...</div>; // Muestra un loading en lugar de redirigir
  }

  // Si no hay usuario, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Verificar si se requiere un rol específico
  if (requiredRole) {
    // Verificar si user.roles existe
    if (!user.roles) {
      return <Navigate to="/" replace />;
    }
    
    // Verificar el formato de roles y si incluye el rol requerido
    const hasRequiredRole = Array.isArray(user.roles) 
      ? user.roles.includes(requiredRole)
      : user.roles === requiredRole;
    
    if (!hasRequiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;