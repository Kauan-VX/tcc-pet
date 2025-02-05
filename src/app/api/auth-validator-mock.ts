import jwt from 'jsonwebtoken';

export const authValidator = (token: string): boolean => {
  if (!token) return false;

  token = token.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, 'secret');

    return !!decoded;
  } catch {
    return false;
  }
};
