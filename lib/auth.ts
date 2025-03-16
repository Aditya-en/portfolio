// lib/auth.ts
import { compareSync } from 'bcryptjs';

// In a real application, this would be stored in an environment variable
// For simplicity, we're hard-coding it, but you should change this value
const ADMIN_PASSWORD_HASH = '$2a$10$8DnJOcLKmk6CbHGdSn5rDe6X1YIZUiZ.q.3IHCwYMhLUcAjG9hJzm'; // This is 'admin123' hashed

export const checkAdminPassword = (password: string | null): boolean => {
  if (!password) return false;
  
  try {
    return compareSync(password, ADMIN_PASSWORD_HASH);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};