import { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading, setRedirect  } = use(AuthContext);
      const [showSpinner, setShowSpinner] = useState(true);
          const location = useLocation(); 


     useEffect(() => {

        if (!loading) {
            setShowSpinner(false);
            return;
        }
   
        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [loading]);


    useEffect(() => {
        if (!loading && !user) {
            // console.log('PrivateRoute: Setting redirect to:', location.pathname);
            setRedirect(location.pathname); // Save where user wanted to go
        }
    }, [loading, user, location.pathname, setRedirect]);

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