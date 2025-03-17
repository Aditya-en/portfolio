import { slugify } from '../lib/utils';
import { describe, expect, it } from 'vitest';

describe('slugify', () => {
  it('should convert a string to a slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('This is a test string')).toBe('this-is-a-test-string');
    // expect(slugify('String with - hyphens & special characters!')).toBe('string-with---hyphens--special-characters');
    expect(slugify('  String with leading and trailing spaces  ')).toBe('string-with-leading-and-trailing-spaces');
  });
});
