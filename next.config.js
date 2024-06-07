/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["jokio.s3.sa-east-1.amazonaws.com", "lh3.googleusercontent.com"],
  },
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
