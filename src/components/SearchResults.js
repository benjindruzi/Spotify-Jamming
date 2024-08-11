import Track from './Track';

function SearchResults({ tracks }) {
    if (tracks.length === 0) {
        return <p>No results found</p>;
    }

    return (
        <div>
            {tracks.map((track, index) => (
                <Track key={index} title={track.title} artist={track.artist} />
            ))}
        </div>
    );
}

export default SearchResults;