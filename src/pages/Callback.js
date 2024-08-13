import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, fetchProfile } from '../helpers';
import { useAuth } from '../contexts/AuthContext';

function Callback() {
    const navigate = useNavigate();
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const { setUser, setIsAuthenticated } = useAuth();
    
    useEffect(() => {
        async function handleAuth() {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');

            if (!code) {
                navigate('/');
                return;
            }

            try {
                const token = await getAccessToken(clientId, code);
                const profile = await fetchProfile(token);
                localStorage.setItem('token', token);
                setUser(profile);
                setIsAuthenticated(true);
                console.log('Authentication successful');
                navigate('/home');
            } catch (error) {
                console.error('Authentication failed: ', error);
                setUser(null);
                setIsAuthenticated(false);
                navigate('/');
            }
        }

        handleAuth();
    }, [clientId, navigate, setUser, setIsAuthenticated]);

    return (
        <div>Loading...</div>
    );
}

export default Callback;
