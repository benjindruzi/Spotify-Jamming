import { Link } from 'react-router-dom';

function Welcome() {
    return (
        <div>
            <h2>Welcome to Spotify Jamming</h2>
            <h3>Seems like you're not logged in. Please login in by clicking the button below</h3>
            <Link to='/'>Login with Spotify</Link>
        </div>
    );
}

export default Welcome;