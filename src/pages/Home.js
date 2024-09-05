import { useEffect, useState } from 'react';
import SearchResults from '../components/SearchResults';
import Playlist from '../components/Playlist';
import { useAuth } from '../contexts/AuthContext';
import { savePlaylist, searchTracks } from '../helpers';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const { checkTokenExpiration, token, user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [playlistName, setPlaylistName] = useState('');

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

    const handleRemoveTrack = (track) => {
        setSelectedTracks(prevTracks => prevTracks.filter(t => t.id !== track.id))
    }

    const handleSavePlaylist = async () => {
        if (token && user && selectedTracks.length > 0 && playlistName) {
            const response = await savePlaylist(token, user, selectedTracks, playlistName);
            alert(`Playlist "${response.name}" saved successfully!`);
            setSelectedTracks('');
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home-container">
            <div className="header">
                <h1>Spotify Jamming</h1>
                <p>Welcome {user.id}</p>
            </div>
            <div className="content">
                <div className="search-side">
                    <input type="text" placeholder="Search for a song..." onChange={event => setQuery(event.target.value)} />
                    <SearchResults tracks={results} onAddTrack={handleAddTrack} />
                </div>
                <div className="playlist-side">
                    <input type="text" placeholder="Rename your playlist..." onChange={event => setPlaylistName(event.target.value)} />
                    <Playlist selectedTracks={selectedTracks} onRemoveTrack={handleRemoveTrack} />
                </div>
            </div>
            {selectedTracks.length > 0
                &&
            <button className="save-playlist-button" onClick={handleSavePlaylist}>
                Save to Spotify
            </button>
            }
        </div>
    );
}

export default Home;
