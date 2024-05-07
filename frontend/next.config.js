/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dev.sufob.com",
                port: '',
                pathname: '/media/**/*',
            },
            {
                protocol: "http",
                hostname: "dev.sufob.com",
                port: '',
                pathname: '/media/**/*',
            },
        ]
    },
    async redirects() {
        return [
            // Basic redirect
            {
                source: '/blog',
                destination: '/blog/latest-articles',
                permanent: true,
            },

        ]
    },
    logging: {
        fetches: {
            fullUrl: true
        },
    },
    compiler: {
        removeConsole: false,
    },

}

module.exports = nextConfig
