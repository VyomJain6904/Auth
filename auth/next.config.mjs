/** @type {import('next').NextConfig} */


export const nextConfig = {
    reactStrictMode: true,
};

exports = {
    ...nextConfig,
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        reactStrictMode: true,
                    },
                    {
                        // X-DNS-Prefetch-Control
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    }
                    ,
                    {
                        // X-Strict-Transport-Security ( Max Age 2 Years )
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        // X-Frame-Options
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        // X-Content-Type-Options
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',

                    },
                    {
                        // Referrer-Policy
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ]
    },
};
