export const CLIENT_ID = '';
export const REDIRECT_URI = '';
export const RESPONSE_TYPE = 'code';
export const SCOPE = 'profile email';
export const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
