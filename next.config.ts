import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // CMS member photos, team photos, testimonial avatars and company logos,
    // uploaded through the admin panel into Supabase's public bucket. Without
    // this every one of them is rejected by next/image at runtime.
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
    ],
    // Next 16 only honours a `quality` prop whose value appears here; anything
    // else silently falls back to 75. The member portraits are small source
    // files (356-800px on the short side) being shown on 2x displays, so they
    // are already scaling up — compression artefacts on top of that are what
    // reads as "pixelated". 90 costs a few KB on ~25 images.
    qualities: [75, 90],
  },
};

export default nextConfig;
