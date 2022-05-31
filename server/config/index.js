export const COOKIE_KEY = process.env.COOKIE_KEY ?? 'simple_auth_cookie'
export const COOKIE_MAX_AGE = parseInt(process.env.COOKIE_MAX_AGE) ?? 24 * 60 * 60 * 1000