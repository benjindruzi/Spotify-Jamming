import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../helpers';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const navigate = useNavigate();

    const checkTokenExpiration = useCallback(async () => {
        const tokenExpiration = localStorage.getItem('token_expiration');
        if (!token || !tokenExpiration || new Date().getTime() > Number(tokenExpiration)) {
            clearToken();
            if (window.location.pathname !== '/') navigate('/');
        } else {
            setIsAuthenticated(true);
            if (!user) {
                try {
                    const profile = await fetchProfile(token);
                    setUser(profile);
                    if (window.location.pathname === '/') {
                        navigate('/home');
                    }
                } catch (error) {
                    console.error('Failed to fetch profile:', error);
                    clearToken();
                    navigate('/');
                }
            }
        }
    }, [token, user, navigate]);

    const storeToken = (newToken, expiresIn) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('token_expiration', new Date().getTime() + expiresIn * 1000);
        setToken(newToken);
        setIsAuthenticated(true);
    };

    const clearToken = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token_expiration');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }

    useEffect(() => {
        checkTokenExpiration();
    }, [checkTokenExpiration]);

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, setUser, setIsAuthenticated, checkTokenExpiration, storeToken, clearToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);