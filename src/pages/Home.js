import { useEffect, useState } from 'react';
import SearchResults from '../components/SearchResults';
import Playlist from '../components/Playlist';
import { useAuth } from '../contexts/AuthContext';
import { searchTracks } from '../helpers';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const { checkTokenExpiration, token, user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkTokenExpiration();

        if (!user) {
            navigate('/');
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        async function fetchTracks() {
            if (token && query) {
                const response = await searchTracks(token, query);
                setResults(response);
            }
        }

        fetchTracks();
    }, [query, token]);

    const handleAddTrack = (track) => {
        setSelectedTracks(prevTracks => {
            if (!prevTracks.some(t => t.id === track.id)) {
                return [...prevTracks, track];
            }

            return prevTracks;
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home-container">
            <div className="header">
                <h1>Spotify Jamming</h1>
                <p>Welcome {user.email}</p>
            </div>
            <div className="content">
                <div className="search-side">
                    <input type="text" placeholder="Search for a song..." onChange={event => setQuery(event.target.value)} />
                    <SearchResults tracks={results} onAddTrack={handleAddTrack} />
                </div>
                <div className="playlist-side">
                    <input type="text" placeholder="Rename your playlist..." onChange={event => setQuery(event.target.value)} />
                    <Playlist selectedTracks={selectedTracks} />
                </div>
            </div>
        </div>
    );
}

export default Home;
