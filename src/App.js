import { useState } from 'react';
import Track from './components/Track';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    return (
        <div>
            <input type="text" placeholder="Search for a song..." onChange={event => setSearchQuery(event.target.value)} />
            <p>{searchQuery}</p>
        </div>
    );
}

export default App;
