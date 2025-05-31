/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          natureGreen: {
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
          },
          darkText: {
            400: '#4b5563',
            600: '#1f2937',
          },
        },
      },
    },
    plugins: [],
  }
  