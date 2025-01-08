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
                value: 'SAMEORIGIN',
            },
            {
                key: 'X-Content-Type-Options',
                value: 'nosniff',
            },
            {
                key: 'Referrer-Policy',
                value: 'origin-when-cross-origin',
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
