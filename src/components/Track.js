function Track({ track, onAdd, onRemove }) {
    const { album, name, artists, duration_ms, uri } = track;
    const trackDuration = `${Math.floor(duration_ms / 60000)}:${('0' + Math.floor((duration_ms % 60000) / 1000)).slice(-2)}`;

    return (
        <div className="track">
            <img src={album.images[2].url} alt={name} className="track-image" />
            <div className="track-info">
                <h5 className="track-title">{name}</h5>
                <p className="track-artist">{artists.map(artist => artist.name).join(', ')}</p>
            </div>
            <p className="track-duration">{trackDuration}</p>
            {onAdd ?
            <button className="track-add-button" onClick={() => onAdd(track)}>
                +
            </button>
            :
            <button className="track-remove-button" onClick={() => onRemove(track)}>
                -
            </button>
            }
        </div>
    );
}

export default Track;