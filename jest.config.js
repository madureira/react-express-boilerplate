module.exports = {
  verbose: true,
  testPathIgnorePatterns: ['./node_modules/'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?)$',
  moduleFileExtensions: ['js', 'json', 'node'],
  setupFiles: ['./jest.setup.js'],
};
