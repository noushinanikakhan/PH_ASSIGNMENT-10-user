import { use, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);

       useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 1000); // Show spinner for at least 1 second
        return () => clearTimeout(timer);
    }, []);


        console.log('PrivateRoute - loading:', loading, 'user:', user); // Add this for debugging


    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" replace />;
};

export default PrivateRoute;