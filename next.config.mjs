/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "s3-inventorymanagement.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
