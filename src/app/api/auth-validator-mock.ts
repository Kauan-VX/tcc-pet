export const authValidator = (token: string) => {
  if (!token) return false;

  return true;
};
