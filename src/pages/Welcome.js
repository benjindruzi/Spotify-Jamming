function Welcome({ onClick }) {
    return (
        <div className="welcome-container">
            <h2>Welcome to Spotify Jamming</h2>
            <h3>Seems like you're not logged in. Please login in by clicking the button below</h3>
            <button onClick={onClick}>Login with Spotify</button>
        </div>
    );
}

export default Welcome;