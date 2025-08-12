export const SESSION_COOKIE_CONFIG = Object.freeze({
  name: 'session',
  options: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    path: '/',
  },
  duration: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
});
