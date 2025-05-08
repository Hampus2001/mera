const typography = require('@tailwindcss/typography');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
    require('daisyui'),
  ],
};
