export type Tokens = typeof globalStyle;
export type ColorTokens = Tokens['color'];
export type ShadowTokens = Tokens['shadow'];

export const globalStyle = {
  color: {
    background: {
      light: '#f5f5f5',
      default: '#f5f5f5',
    },
    primary: {
      default: '#1475de',
      50: '#e6f2ff',
      100: '#b3d9ff',
      200: '#80bfff',
      300: '#4da6ff',
      400: '#1a8cff',
      500: '#1475de',
      600: '#0f5cb3',
      700: '#0a4290',
      800: '#052967',
      900: '#021433',
    },
    alert: '#ff3c3c',
    error: '#f26161',
    text: '#333333',
    gray: {
      '04': '#f5f5f5',
      '16': '#cecece',
      '55': '#737373',
    },
  },
  font: {
    hanken: {
      regular: 'HankenGrotesk-Regular',
      light: 'HankenGrotesk-Light',
      medium: 'HankenGrotesk-Medium',
      bold: 'HankenGrotesk-Bold',
    },
  },
  shadow: {
    small: {
      shadowColor: '#1D1C1C96',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 10,
    },
    medium: {
      shadowColor: '#1D1C1C96',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 20,
    },
    large: {
      shadowColor: '#1D1C1C96',
      shadowOffset: { width: 0, height: 24 },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 30,
    },
    xlarge: {
      shadowColor: '#1D1C1C96',
      shadowOffset: { width: 0, height: 32 },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 40,
    },
  },
  buttonPress: 'active:shadow-md active:opacity-90 active:scale-99 trassition-all duration-200'
} as const;

