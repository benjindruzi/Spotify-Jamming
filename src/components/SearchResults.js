import Track from './Track';

function SearchResults({ tracks, onAddTrack }) {
    if (!tracks) return <p>No tracks found</p>;
    
    return (
        <div className="search-results">
            {tracks.map((track, index) => (
                <Track key={index} track={track} onAdd={() => onAddTrack(track)} />
            ))}
        </div>
    );
}

export default SearchResults;