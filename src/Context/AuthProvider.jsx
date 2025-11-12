
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";


const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
           setUser(currentUser) 
        })
        return ()=> {
            unSubscribe()
        }
    },
     [])

    const authInfo = {
          createUser,
          signInUser,
          user,
          loading

    }
    return ( 
     <AuthContext value={authInfo}>
          {children}
     </AuthContext>
    )
}

export default AuthProvider;