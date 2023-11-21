export const validatePassword = (password: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
  return regex.test(password);
};
