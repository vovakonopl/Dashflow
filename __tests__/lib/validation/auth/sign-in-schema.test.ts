import { signInSchema } from '@/lib/validation/auth/sign-in-schema';

describe('signInSchema', () => {
  test('should validate correct sign-in data', () => {
    const data = {
      email: 'myEmail@gmail.com',
      password: 'myPassword123',
    };

    const result: boolean = signInSchema.safeParse(data).success;
    expect(result).toBe(true);
  });

  test('should fail validation for invalid email (missing "@" symbol)', () => {
    const data = {
      email: 'invalidEmail.com',
      password: 'myPassword123',
    };

    const result: boolean = signInSchema.safeParse(data).success;
    expect(result).toBe(false);
  });

  test('should fail validation for invalid email (missing domain)', () => {
    const data = {
      email: 'invalidEmail@com',
      password: 'myPassword123',
    };

    const result: boolean = signInSchema.safeParse(data).success;
    expect(result).toBe(false);
  });

  test('should fail validation for password that is too long', () => {
    const data = {
      email: 'myEmail@gmail.com',
      password: 'a'.repeat(300),
    };

    const result: boolean = signInSchema.safeParse(data).success;
    expect(result).toBe(false);
  });

  test('should fail validation for missing email', () => {
    const data = {
      password: 'myPassword123',
    };

    const result: boolean = signInSchema.safeParse(data).success;
    expect(result).toBe(false);
  });

  test('should fail validation for missing password', () => {
    const data = {
      email: 'myEmail@gmail.com',
    };

    const result: boolean = signInSchema.safeParse(data).success;
    expect(result).toBe(false);
  });
});
