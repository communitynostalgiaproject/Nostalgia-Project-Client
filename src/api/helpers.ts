import dotenv from 'dotenv';
dotenv.config();

export const localApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export const getApiBase = () => process.env.REACT_APP_API_URL || localApiUrl;

// The 'AWS API key may be necessary to make authorized request to lambda functions
export const HEADERS = {
    "Content-Type": "application/json",
    /*"X-Api-Key": process.env.REACT_APP_AWS_X_API_KEY*/
}