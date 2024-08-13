import Welcome from './pages/Welcome';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import { redirectToAuthCodeFlow } from './helpers';
import { AuthProvider } from './contexts/AuthContext';
import Callback from './pages/Callback';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <div>
                <Routes>
                    <Route path='/' element={<Welcome onClick={() => redirectToAuthCodeFlow(process.env.REACT_APP_CLIENT_ID)} />} />
                    <Route path='/callback' element={<Callback />} />
                    <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
