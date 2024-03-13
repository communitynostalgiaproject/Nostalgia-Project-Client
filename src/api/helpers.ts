// import dotenv from 'dotenv';
// dotenv.config();

export const localApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export const getApiBase = () => process.env.REACT_APP_API_URL || localApiUrl;
export const redirectToLogin = () => {
  window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
}