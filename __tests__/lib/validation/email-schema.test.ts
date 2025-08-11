import { emailSchema } from '@/lib/validation/email-schema';

describe('signUpSchema', () => {
  test('should validate correct email', () => {
    const email = 'myEmail@gmail.com';
    const result: boolean = emailSchema.safeParse(email).success;

    expect(result).toBe(true);
  });

  test('should validate incorrect email', () => {
    const email = 'myEmail';
    const result: boolean = emailSchema.safeParse(email).success;

    expect(result).toBe(false);
  });

  test('should validate incorrect email', () => {
    const email = 'myEmail@gmail';
    const result: boolean = emailSchema.safeParse(email).success;

    expect(result).toBe(false);
  });

  test('should validate incorrect email', () => {
    const email = 'my Email@gmail.com';
    const result: boolean = emailSchema.safeParse(email).success;

    expect(result).toBe(false);
  });

  test('should validate incorrect email', () => {
    const email = 'myEmail.gmail.com';
    const result: boolean = emailSchema.safeParse(email).success;

    expect(result).toBe(false);
  });
});
