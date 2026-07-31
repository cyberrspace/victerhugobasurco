/**
 * Two deploy modes:
 *  - Default (Vercel / Node host): image optimization ON.
 *  - `npm run export`: emits a fully static /out folder you can drag into
 *    Hostinger's File Manager (public_html). Nothing on this site needs a
 *    server — EmailJS runs in the browser — so static export is lossless.
 */
const isStatic = !!process.env.STATIC_EXPORT;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: isStatic ? 'export' : undefined,
  trailingSlash: isStatic,
  images: { unoptimized: isStatic },
};

export default nextConfig;