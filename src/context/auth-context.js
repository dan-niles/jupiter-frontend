import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from '../http-common';
import { ApiLogin } from '../services/authService';

const loading = (
    <div className="pt-3 text-center min-vh-100">
        <div className="sk-spinner sk-spinner-pulse">
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    </div>
)

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
    const [loginStatus, setLoginStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        console.log("Hi")
        localStorage.setItem('token', token || '');
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`
        if (token) {
            setIsLoading(true);
            setLoginStatus(true)
            setIsLoading(false);
        } else {
            setIsLoading(true);
            setLoginStatus(false)
            setIsLoading(false);
        }
    }, [token]);

    function login(username, password) {
        return ApiLogin({ username, password })
            .then(({ data }) => {
                // if (data.status) {
                setIsLoading(true)
                console.log(data)
                setUser(data)
                setToken(data.token)
                console.log('Token set')
                // }
                return data;
            });
    }

    function logout() {
        setIsLoading(true)
        setUser(null);
        setToken(null)
        setLoginStatus(false)
        setIsLoading(false)
        return true;
    }

    const value = useMemo(() => ({
        token,
        user,
        login,
        logout,
        loginStatus,
    }), [user, token])

    return (
        <AuthContext.Provider value={value} >
            {isLoading ? loading : children}
        </AuthContext.Provider>
    )
}