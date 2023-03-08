// Remove this if you're not using Fullcalendar features
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline'
]);

module.exports = withTM({
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/welcome',
        permanent: true
      }
    ];
  },
  images: {
    domains: ['logos103357-staging.s3.ap-southeast-2.amazonaws.com', 'lh1.googleusercontent.com','lh2.googleusercontent.com','lh3.googleusercontent.com','lh4.googleusercontent.com','lh5.googleusercontent.com','lh6.googleusercontent.com','lh7.googleusercontent.com','lh8.googleusercontent.com','lh9.googleusercontent.com','lh10.googleusercontent.com'],
  },
});
