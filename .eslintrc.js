module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  env: {
    browser: true,
    node: true
  },
  rules: {
    'linebreak-style': 0,
    'react/destructuring-assignment': 'never',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-shadow': [
      'error',
      { builtinGlobals: false, hoist: 'functions', allow: [] }
    ]
  }
};
