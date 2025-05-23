/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["canvas", "fabric"],
  },

  webpack(config, { isServer }) {
    // Exclude .svg files from the default file-loader
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // Use @svgr/webpack for SVG imports as React components
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });

    // Handle native modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        path: false,
      };
    }

    // Ignore canvas on server-side
    if (isServer) {
      config.externals = [...(config.externals || []), { canvas: "canvas" }];
    }

    // Add canvas to transpiled modules
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
    });

    // Configure module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": require("path").resolve(__dirname, "src"),
    };

    return config;
  },
};

module.exports = nextConfig;
