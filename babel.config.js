module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          tests: './tests/',
          '@': './src/',
        },
      },
    ],
  ],
};
