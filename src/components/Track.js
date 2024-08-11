function Track({ title, artist }) {
    return (
        <div className="track">
            <h5 className="track-title">{title}</h5>
            <p className="track-type">Song</p>
            <p className="track-artist">{artist}</p>
        </div>
    );
}

export default Track;