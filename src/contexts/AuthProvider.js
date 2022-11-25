import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    // theme 
    const [dark, setDark] = useState(false);
    const handleDark = () => {
        setDark(!dark);
        localStorage.setItem("dark-mode", !dark);
    };
    
    useEffect(() => {
        const localStoredDark = JSON.parse(localStorage.getItem("dark-mode"));
        console.log(localStoredDark);
        setDark(localStoredDark);
    }, []);

    useEffect(() => {
        if (!dark) {
            document.querySelector("body").setAttribute("data-theme", "mobileResaleTheme");
        } else {
            document.querySelector("body").setAttribute("data-theme", "dark");
        }
    }, [dark]);

    // login 
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInWithPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const LogOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log('Obserbing');
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])

    const authInfo = {
        user,
        loading,
        handleDark,
        dark,
        setLoading,
        createUser,
        signInWithPassword,
        LogOut,
        updateUser,
        googleSignIn,
        resetPassword,
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;