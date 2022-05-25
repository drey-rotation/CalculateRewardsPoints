module.exports = {
  testMatch: [
    '**\\*test.js',
    '**/*test.js',
    'src\\**\\*.test.js',
    'src/components/**/*.test.js',
    '<rootDir>\\src\\components\\**\\*.test.js',
    '<rootDir>/src/components/**/*.test.js',
    'src/components/.*|(.|/)(.test).js?$'
  ],
};