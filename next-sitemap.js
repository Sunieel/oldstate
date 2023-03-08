/** @type {import('next-sitemap').IConfig} */
// Default code you can customize according to your requirements.
module.exports = {
  siteUrl: 'https://youradvocat.com.au',
  generateRobotsTxt: true, // (optional)
  exclude: ['/api', '/blog', '/authentication', '/docs/', '/dashboard'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/blog', '/authentication', '/docs/', '/dashboard'],
      },
    ]
  },
  }