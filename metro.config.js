const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add path resolution for @ alias
config.resolver.extraNodeModules = {
  '@': path.resolve(__dirname)
};

module.exports = config; 