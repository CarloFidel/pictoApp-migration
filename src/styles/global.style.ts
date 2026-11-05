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
      boxShadow: '0px 2px 6px rgba(2, 20, 51, 0.25)',
    },
    medium: {
      boxShadow: '0px 4px 14px rgba(2, 20, 51, 0.55)',
    },
    large: {
      boxShadow: '0px 8px 24px rgba(2, 20, 51, 0.55)',
    },
    xlarge: {
      boxShadow: '0px 12px 36px rgba(2, 20, 51, 0.75)',
    },
    dashboard: {
      boxShadow: '0px -12px 36px rgba(4, 32, 80, 0.42)',
    },
  },
  buttonPress: 'active:shadow-md active:opacity-90 active:scale-99 trassition-all duration-200'
} as const;

