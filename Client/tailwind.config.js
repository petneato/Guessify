export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './public/index.html'
  ],
  theme: {
    colors: {
      spotifyBlack: '#282c34',
      spotifySand: '#696464',
      spotifyGreen: '#1DB954',
      spotifyHoverGreen: '#1ed760',
      spotifyWhite: '#FFFFFF',
      spotifyCardBlack: '#121212',
      orange: '#392892',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  pluagins: [],
}