import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Children } from 'react';


export default function ProtectedRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children;
}