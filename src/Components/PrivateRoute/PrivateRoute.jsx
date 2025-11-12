import { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
      const [showSpinner, setShowSpinner] = useState(true);

     useEffect(() => {
        // If not loading, hide spinner immediately
        if (!loading) {
            setShowSpinner(false);
            return;
        }

        // If loading, show spinner for at least 1 second for better UX
        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [loading]);

        console.log('PrivateRoute - loading:', loading, 'user:', user); // Add this for debugging


    if (loading || showSpinner) {
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