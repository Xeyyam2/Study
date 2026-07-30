import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // `admin` is excluded: the admin panel lives at app/admin/* (outside [locale])
  // and is single-language (EN). next-intl must not locale-prefix or redirect it.
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)'],
};
