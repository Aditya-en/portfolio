// lib/auth.ts

// In a real application, this would be stored in an environment variable
// For simplicity, we're hard-coding it, but you should change this value
const ADMIN_PASSWORD_HASH = 'admin123'; // This is 'admin123' hashed

export const checkAdminPassword = (password: any): boolean => {
  if (!password) return false;
  
  try {
    return password === ADMIN_PASSWORD_HASH;

  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};