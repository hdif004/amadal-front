/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '340px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },

      backgroundImage: {
        'Hero-Header': "url('/HeroHeader.png')",
        'News-Image': "url('/NewsImage.png')",
        'Video-Image': "url('/VideoImage.png')",
        'Contact-Image': "url('/ContactHeader.png')",
      },
      

      fontFamily: {
        Merri: ["Merriweather sans"]
      },

      colors: {
        'primary': '#048162'
      },

      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      
      animation : {
        marquee: 'marquee 40s linear infinite',
      },

    },
  },
  plugins: [],
}