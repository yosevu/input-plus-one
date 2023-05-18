const path = require('path')

module.exports = function (api) {
  api.cache(false)

  const envPath = path.resolve(__dirname, '../../', '.env')

  require('dotenv').config({
    path: envPath,
  })

  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      'react-native-reanimated/plugin',
      'nativewind/babel',
      [
        'inline-dotenv',
        {
          path: envPath,
        },
      ],
    ],
  }
}
