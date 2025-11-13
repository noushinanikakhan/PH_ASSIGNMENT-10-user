import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile 
} from "firebase/auth";
import { auth } from "../firebase.config";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [redirectPath, setRedirectPath] = useState('/'); 

    const setRedirect = (path) => {
        setRedirectPath(path);
    };

    const clearRedirect = () => {
        console.log('🔗 Clearing redirect path');
        setRedirectPath('/');
    };


      // Google Provider
    const googleProvider = new GoogleAuthProvider();

    // Create User with Email & Password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Sign In User
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

       // Google Sign In
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        });
    }

    // Logout User
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
            setLoading(true);
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unSubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        redirectPath, 
        setRedirect,
        clearRedirect,  
        createUser,
        signInUser,
        signInWithGoogle, 
        updateUserProfile,
        logout
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;