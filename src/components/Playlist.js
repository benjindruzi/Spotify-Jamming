import Track from './Track';

function Playlist({ selectedTracks, onRemoveTrack }) {
    if (!selectedTracks) return <p>Songs you add will appear here</p>;

    return (
        <div className="playlist">
            {selectedTracks.map((track, index) => (
                <Track key={index} track={track} onRemove={() => onRemoveTrack(track)} />
            ))}
        </div>
    );
}

export default Playlist;