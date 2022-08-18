const { babel } = require('@rollup/plugin-babel');

export default {
  input: './index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    babel({
      "presets": ['@babel/preset-env'],
    }),
  ],
};