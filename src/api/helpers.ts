const dotenv = require('dotenv');
dotenv.config();

export const localApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/';
export const getApiBase = () => process.env.REACT_APP_API_URL || localApiUrl;

// The 'AWS API key may be necessary to make authorized request to hosted dB
export const HEADERS = {
    "Content-Type": "application/json",
    /*"X-Api-Key": process.env.REACT_APP_AWS_X_API_KEY*/
}