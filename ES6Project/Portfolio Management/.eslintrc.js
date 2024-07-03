module.exports= {
  'env': {
    'browser': true,
    'es2020': true,
    'es6': true,
    'node':true
  },
  'extends': 'eslint:recommended',
    
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'rules': {
    'semi': ['error','always'],
    'no-console':'off',
    'quotes':['error','single'],
    'no-multi-spaces': ['error'],
    'indent': ['error', 2]
  },
        
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
};