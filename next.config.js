/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static project pages live in public/<name>/index.html; serve them at /<name>.
  async rewrites() {
    return [
      { source: "/rad", destination: "/rad/index.html" },
      // Unlisted committee scheduling page — delete this line and public/advancement/ to remove it.
      { source: "/advancement", destination: "/advancement/index.html" },
    ];
  },
}

module.exports = nextConfig
