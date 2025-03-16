import { checkAdminPassword } from '../lib/auth';
import { describe, expect, it } from 'vitest';

describe('checkAdminPassword', () => {
  it('should return true for the correct password', () => {
    expect(checkAdminPassword('admin')).toBe(true);
  });

  it('should return false for an incorrect password', () => {
    expect(checkAdminPassword('wrongpassword')).toBe(false);
    expect(checkAdminPassword('')).toBe(false);
    expect(checkAdminPassword(null)).toBe(false);
    // expect(checkAdminPassword(undefined)).toBe(false);
  });
});