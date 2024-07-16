/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: '*.googleusercontent.com'
            },
            {
                hostname: 'onelink-files.s3.amazonaws.com'
            }
        ],
    }
};

export default nextConfig;
