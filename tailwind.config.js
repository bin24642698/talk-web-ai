/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // 吉卜力风格色彩
        ghibli: {
          blue: '#6A9BB0',         // 天空蓝
          teal: '#8BB8A8',         // 森林绿
          green: '#7DA86E',        // 草地绿
          yellow: '#EBC258',       // 暖阳黄
          orange: '#E19B50',       // 温暖橙
          brown: '#9C7F61',        // 泥土棕
          cream: '#F5EED7',        // 米黄色
          pink: '#E4A7B0',         // 柔和粉
          red: '#D67464',          // 红砖色
          lavender: '#C4B2D3',     // 淡紫色
          deepblue: '#3E5C76',     // 深蓝色
          background: '#F7F4EB',   // 背景米白色
        },
      },
      fontFamily: {
        ghibli: ['Noto Sans SC', 'sans-serif'],
      },
      backgroundImage: {
        'ghibli-gradient': 'linear-gradient(to right, #8BB8A8, #6A9BB0)',
        'ghibli-card': 'linear-gradient(to bottom, #F7F4EB, #F5EED7)',
      },
      boxShadow: {
        'message': '0 2px 5px rgba(0, 0, 0, 0.04)',
        'message-hover': '0 4px 8px rgba(0, 0, 0, 0.08)',
        'ghibli': '0 4px 8px rgba(156, 127, 97, 0.15)',
        'ghibli-hover': '0 8px 16px rgba(156, 127, 97, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-dot': 'pulse 1.5s infinite',
        'typing': 'typing 1.4s steps(3) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      borderRadius: {
        'ghibli': '16px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
} 