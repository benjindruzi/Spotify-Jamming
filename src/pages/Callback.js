import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, fetchProfile } from '../helpers';
import { useAuth } from '../contexts/AuthContext';

function Callback() {
    const navigate = useNavigate();
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const { setUser, setIsAuthenticated, storeToken, clearToken } = useAuth();
    
    useEffect(() => {
        async function handleAuth() {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');

            if (!code) {
                navigate('/');
                return;
            }

            try {
                const [token, expiresIn] = await getAccessToken(clientId, code);
                const profile = await fetchProfile(token);
                setUser(profile);
                storeToken(token, expiresIn);
                console.log('Authentication successful');
                navigate('/home');
            } catch (error) {
                console.error('Authentication failed: ', error);
                clearToken();
                navigate('/');
            }
        }

        handleAuth();
    }, [clientId, setUser, setIsAuthenticated, clearToken, storeToken, navigate]);

    return (
        <div>Loading...</div>
    );
}

export default Callback;
