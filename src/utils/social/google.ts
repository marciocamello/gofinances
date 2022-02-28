const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_REDIRECT_URI } = process.env;

export const RESPONSE_TYPE = 'token';
export const SCOPE = encodeURI('profile email');
export const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
export const googleApiUrl = 'https://www.googleapis.com/oauth2';
