module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@payroll-pro/ui': '../../libs/ui/src',
            '@payroll-pro/utils': '../../libs/utils/src',
            '@payroll-pro/data': '../../libs/data/src',
          },
        },
      ],
    ],
  };
};

