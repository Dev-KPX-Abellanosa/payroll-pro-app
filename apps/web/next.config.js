const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svg: false,
  },
  transpilePackages: ['@payroll-pro/ui', '@payroll-pro/utils', '@payroll-pro/data'],
  experimental: {
    serverActions: true,
  },
  webpack: (config, { isServer }) => {
    // Add path aliases for monorepo libraries
    const rootPath = path.resolve(__dirname, '../..');
    config.resolve.alias = {
      ...config.resolve.alias,
      '@payroll-pro/ui': path.resolve(rootPath, 'libs/ui/src/index.ts'),
      '@payroll-pro/utils': path.resolve(rootPath, 'libs/utils/src/index.ts'),
      '@payroll-pro/data': path.resolve(rootPath, 'libs/data/src/index.ts'),
    };
    
    // Ensure node_modules resolution works
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(rootPath, 'node_modules'),
    ];
    
    return config;
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);

