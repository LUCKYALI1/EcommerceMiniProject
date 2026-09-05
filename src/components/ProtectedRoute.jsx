import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Agar user logged in nahi hai, toh login page par bhej do
    return <Navigate to="/login" replace />;
  }

  return children;
}