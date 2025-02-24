/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

const headers = async () => [
    {
        source: '/(.*)', // Apply headers to all routes
        headers: [
            {
                key: 'X-DNS-Prefetch-Control',
                value: 'on',
            },
            {
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains; preload',
            },
            {
                key: 'X-Frame-Options',
                value: 'Deny',
            },
            {
                key: 'X-Content-Type-Options',
                value: 'nosniff',
            },
            {
                key: 'Referrer-Policy',
                value: 'strict-origin-when-cross-origin',
            },
            {
                key: 'Content-Security-Policy',
                value: `
                    default-src 'self';
                    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com;
                    style-src 'self' 'unsafe-inline';
                    img-src 'self' data:;
                    connect-src 'self' https://vd-auth.com https://api.vd-auth.com https://www.google-analytics.com;
                    font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
                    frame-src 'self' https://www.google.com https://accounts.google.com;
                    form-action 'self';
                    base-uri 'self';
                    object-src 'none';
                    upgrade-insecure-requests;
                    block-all-mixed-content;
                `.replace(/\s{2,}/g, ' ').trim(),
            },
        ],
    },
];

export default {
    ...nextConfig,
    async headers() {
        return headers();
    },
};
