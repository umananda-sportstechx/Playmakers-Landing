import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // CMS member photos, team photos, testimonial avatars and company logos,
    // uploaded through the admin panel into Supabase's public bucket. Without
    // this every one of them is rejected by next/image at runtime.
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
    ],
  },
};

export default nextConfig;
