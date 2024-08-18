import Track from './Track';

function Playlist({ selectedTracks }) {
    if (!selectedTracks) return <p>Songs you add will appear here</p>;

    return (
        <div className="playlist">
            {selectedTracks.map((track, index) => (
                <Track key={index} track={track} />
            ))}
        </div>
    );
}

export default Playlist;