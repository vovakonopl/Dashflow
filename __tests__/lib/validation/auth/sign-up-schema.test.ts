import { signInSchema } from '@/lib/validation/auth/sign-in-schema';
import { signUpSchema } from '@/lib/validation/auth/sign-up-schema';

describe('signUpSchema', () => {
  test('should validate correct sign-up data', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'myEmail@gmail.com',
      password: 'myPassword123',
      confirmPassword: 'myPassword123',
    };

    const result: boolean = signUpSchema.safeParse(data).success;
    expect(result).toBe(true);
  });

  test('should fail validation for mismatched passwords', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'myEmail@gmail.com',
      password: 'myPassword123',
      confirmPassword: 'myDifferentPassword123',
    };

    const result: boolean = signUpSchema.safeParse(data).success;
    expect(result).toBe(false);
  });

  test('should fail validation for first name that is too long', () => {
    const data = {
      firstName: 'a'.repeat(100),
      lastName: 'Doe',
      email: 'myEmail@gmail.com',
      password: 'myPassword123',
      confirmPassword: 'myPassword123',
    };

    const result: boolean = signUpSchema.safeParse(data).success;
    expect(result).toBe(false);
  });

  test('should fail validation for last name that is too short', () => {
    const data = {
      firstName: 'John',
      lastName: '',
      email: 'myEmail@gmail.com',
      password: 'myPassword123',
      confirmPassword: 'myPassword123',
    };

    const result: boolean = signUpSchema.safeParse(data).success;
    expect(result).toBe(false);
  });

  test('should fail validation for password that is too short', () => {
    const data = {
      email: 'myEmail@gmail.com',
      password: 'short',
    };

    const result: boolean = signInSchema.safeParse(data).success;
    expect(result).toBe(false);
  });

  test('should fail validation for missing first name and email', () => {
    const data = {
      lastName: 'Doe',
      password: 'myPassword123',
      confirmPassword: 'myPassword123',
    };

    const result: boolean = signUpSchema.safeParse(data).success;
    expect(result).toBe(false);
  });
});
