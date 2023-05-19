module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amarillito: '#F4DFB0',
        caca_clara: '#8C6F4D',
        caca_oscura: '#895847',
        moradito_palido: '#8086A8',
        azulito_oscuro: '#414562',
        con_derechos: '#FFFFFF',
        sin_derechos: '#0E0F15',
      },
      fontFace: {
        jeju: {
          family: 'jeju',
          source: 'url("fonts/jeju.ttf")',
        },
      },

      fontFamily: {
        titulo: ['var(--font-gelio)', 'Inter', 'sans-serif'],
        texto: ['var(--font-jeju)', 'Inter', 'sans-serif'],
        normalita: ['Inter', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
