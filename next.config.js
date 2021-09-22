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
      // disable: process.env.NODE_ENV === 'development',
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ['@svgr/webpack'],
      });

      return config;
    }
  }
)
