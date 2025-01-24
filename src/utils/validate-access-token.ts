import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp?: number;
}

export const isTokenExpired = (token: string) => {
  if (!token) return true;
  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp ? decodedToken.exp < currentTime : true;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};
