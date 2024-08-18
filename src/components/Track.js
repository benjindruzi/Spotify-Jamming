function Track({ track, onAdd }) {
    const { album, name, artists, duration_ms } = track;
    const trackDuration = `${Math.floor(duration_ms / 60000)}:${('0' + Math.floor((duration_ms % 60000) / 1000)).slice(-2)}`;

    return (
        <div className="track">
            <img src={album.images[2].url} alt={name} className="track-image" />
            <div className="track-info">
                <h5 className="track-title">{name}</h5>
                <p className="track-artist">{artists.map(artist => artist.name).join(', ')}</p>
            </div>
            <p className="track-duration">{trackDuration}</p>
            <button className="track-add-button" onClick={() => onAdd(track)}>
                +
            </button>
        </div>
    );
}

export default Track;