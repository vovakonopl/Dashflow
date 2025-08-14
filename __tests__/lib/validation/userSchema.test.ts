import { userSchema } from '@/lib/validation/user-schema';

describe('User validation schema', () => {
  test('valid user data passes validation', () => {
    const result = userSchema.safeParse({
      id: '123',
      email: 'JohnDoe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(result.success).toBe(true);
  });

  test('valid user data do not pass validation because of email is not defined', () => {
    const result = userSchema.safeParse({
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(result.success).toBe(false);
  });

  test('valid user data do not pass validation because name strings are empty', () => {
    const result = userSchema.safeParse({
      id: '123',
      email: 'JohnDoe@gmail.com',
      firstName: '',
      lastName: '',
    });

    expect(result.success).toBe(false);
  });
});
