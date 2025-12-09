const { getDefaultConfig } = require('expo/metro-config');
const { withNxMetro } = require('@nx/react-native');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = withNxMetro(defaultConfig, {
  // Change this to true to see debugging info.
  // Useful if you have issues resolving modules
  debug: false,
  // all the file extensions used for imports other than 'ts', 'tsx', 'js', 'jsx'
  extensions: [],
});

