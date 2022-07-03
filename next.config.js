/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    outputStandalone: true,
  },
  output: 'standalone',
  publicRuntimeConfig: {
    backendUrl: process.env.BACKEND_HOST,
  },
};
