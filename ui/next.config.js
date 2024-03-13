const { parsed: env } = require('dotenv').config();

const nextConfig = {
  env,
  compiler: {
    removeConsole: false,
  },
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig
