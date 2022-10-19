/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  env: {
    strapiURL: `${process.env.STRAPI_URL}`
  }
}

module.exports = nextConfig
