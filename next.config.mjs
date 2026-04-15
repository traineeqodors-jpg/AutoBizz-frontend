/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["192.168.0.40"],
  images: {
    // This allows Next.js to fetch from your local machine's IP
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/public/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1", // Add this to match the error's IP
        port: "5000",
        pathname: "/public/**",
      },
    ],
    // Sometimes needed if your backend serves local content
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
