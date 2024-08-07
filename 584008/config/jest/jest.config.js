module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '\\.css$': '<rootDir>/config/jest/cssTransform.js',
    },
  };
  