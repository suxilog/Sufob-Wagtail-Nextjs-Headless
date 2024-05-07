/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL,
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    // exclude: ['/server-sitemap-index.xml'],
    transform: async (config, path) => {
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? [],
        }
    },
    additionalPaths: async (config) => [
        await config.transform(config, '/'),
        await config.transform(config, '/contact'),
        await config.transform(config, '/blog'),
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },

        ],
        additionalSitemaps: [
            process.env.SITE_URL + '/blog-sitemap.xml',

        ],
    },
}