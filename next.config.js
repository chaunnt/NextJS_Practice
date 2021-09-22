const withPWA = require('next-pwa')
module.exports = withPWA(
  {
    env: {
      apiUrl: process.env.API_URL || 'https://bds-api.service.hodace.network',
      appId: '667983873394718',
      port: process.env.PORT || 3000
    },
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'dev',
    },
    eslint: {
      // Warning: Dangerously allow production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    webpack5: false,

    // webpack(config) {
    //   config.module.rules.push({
    //     test: /\.svg$/,
    //     // issuer: {
    //     //   test: /\.(js|ts)x?$/,
    //     // },
    //     use: ['@svgr/webpack'],
    //   });

    //   return config;
    // }
  }
)
