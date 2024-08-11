import Track from './Track';

function Playlist({ selectedTracks }) {
    if (selectedTracks.length === 0) {
        return <p>Songs you add will appear here</p>;
    }

    return (
        <div>
            {selectedTracks.map((track, index) => {
                <Track key={index} title={track.title} artist={track.artist} />
            })}
        </div>
    );
}

export default Playlist;