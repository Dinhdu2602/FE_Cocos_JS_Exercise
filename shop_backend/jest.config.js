module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: false }],
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};