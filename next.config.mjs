/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "khurshid-bucket.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/cabins/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
