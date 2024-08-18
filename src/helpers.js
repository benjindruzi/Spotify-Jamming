const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));

    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)

    return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

export async function redirectToAuthCodeFlow(clientId) {
    const codeVerifier  = generateRandomString(64);
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);

    localStorage.setItem('code_verifier', codeVerifier);

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', `${process.env.REACT_APP_REDIRECT_URI}`);
    params.append('scope', 'user-read-private user-read-email playlist-modify-public');
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', codeChallenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessToken(clientId, code) {
    const codeVerifier = localStorage.getItem('code_verifier');
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', `${process.env.REACT_APP_REDIRECT_URI}`);
    params.append('code_verifier', codeVerifier);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    });

    const { access_token, expires_in } = await response.json();

    return [access_token, expires_in];
}

export async function fetchProfile(token) {
    const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;
}

export async function searchTracks(token, query) {
    const params = new URLSearchParams();
    params.append('q', query);
    params.append('type', 'track');
    params.append('limit', '10');

    const response = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    const data = await response.json();

    if (!response.ok) {
        console.log('Failed to search songs: ', data);
        return;
    }

    if (!data.tracks.items) {
        console.log('No tracks found: ', data);
        return [];
    }
    
    return data.tracks.items;
}