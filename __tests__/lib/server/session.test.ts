/**
 * @jest-environment node
 */

// Jose library uses ESM, we need to mock required functions for Jest,
// because it either can't handle it or can't mock functions with experimental ESM support.
jest.mock('jose', () => {
  return {
    SignJWT: jest.fn((payload) => ({
      setProtectedHeader: jest.fn(() => ({
        setIssuedAt: jest.fn(() => ({
          setExpirationTime: jest.fn(() => ({
            sign: jest.fn(() => {
              return JSON.stringify({ payload });
            }),
          })),
        })),
      })),
    })),

    jwtVerify: jest.fn(JSON.parse),
  };
});

// Storage to simulate get/set/delete operations
let cookiesStorage: Record<string, unknown> = {};

// Mock methods in object returned from cookies()
const mockCookies = {
  get: jest.fn((key: string) => ({
    value: cookiesStorage[key],
  })),
  set: jest.fn((key: string, data: unknown) => {
    cookiesStorage[key] = data;
  }),
  delete: jest.fn((key: string) => {
    delete cookiesStorage[key];
  }),
};

jest.mock('next/headers', () => ({
  cookies: () => mockCookies,
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(() => {
    throw new Error('Mock Redirect'); // Simulate redirect by throwing an error
  }),
}));

import { SESSION_COOKIE_CONFIG } from '@/lib/constants/session-cookie-config';
import {
  createSession,
  verifySession,
  deleteSession,
} from '@/lib/server/session';

const userPayload = Object.freeze({
  userId: 'user123',
  email: 'JohnDoe@gmail.com',
  firstName: 'John',
  lastName: 'Doe',
});

describe('Session tests', () => {
  // Clear mocks and storage before each test
  beforeEach(() => {
    jest.clearAllMocks();
    cookiesStorage = {};
  });

  test('should create a session and set the cookie', async () => {
    await createSession(userPayload);
    expect(mockCookies.set).toHaveBeenCalledTimes(1);
    expect(cookiesStorage[SESSION_COOKIE_CONFIG.name]).toBeDefined();
  });

  test('should set the cookie and then verify it and return userPayload', async () => {
    await createSession(userPayload);
    expect(cookiesStorage[SESSION_COOKIE_CONFIG.name]).toBeDefined();

    const verifiedSession = await verifySession();
    expect(verifiedSession).toEqual(userPayload);
  });

  test('should verify session and redirect because cookie is not set', async () => {
    await expect(verifySession).rejects.toThrow();
  });

  test('should set and then delete cookie with session data', async () => {
    await createSession(userPayload);
    expect(cookiesStorage[SESSION_COOKIE_CONFIG.name]).toBeDefined();

    await expect(deleteSession).rejects.toThrow('Mock Redirect');
    expect(cookiesStorage).toEqual({});
  });
});
