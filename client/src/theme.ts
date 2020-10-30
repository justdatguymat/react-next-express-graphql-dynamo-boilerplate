import { Theme } from '@material-ui/core';
import { createMyTheme } from 'utils';

const fontFamilies = {
  body: [
    'Montserrat',
    '\'Open Sans\'',
    '\'Nato Sans\'',
    'Lato',
    'Roboto',
    '\'Helvetica Neue\'',
    'Arial',
    'sans-serif',
    '-apple-system',
    'BlinkMacSystemFont',
  ].join(','),
  headers: [
    'Montserrat',
    'Anton',
    '\'Rammetto One\'',
    'Syncopate',
    '\'Poller One\'',
    'Righteous',
    '\'Gravitas One\'',
    '\'Wendy One\'',
    '\'Text me One\'',
    '\'Helvetica Neue\'',
    'Arial',
    'sans-serif',
    '-apple-system',
    'BlinkMacSystemFont',
  ].join(','),
};

//const theme: Theme = createMuiTheme({
const theme: Theme = createMyTheme({
  inputVariant: 'outlined',
  buttonVariant: {
    primary: 'contained',
    secondary: 'text',
  },
  spacing: (factor) => `${0.5 * factor}rem`,
  shape: {
    borderRadius: 8,
  },
  palette: {
    type: 'light',
    common: {
      white: '#fff',
      black: '#000',
    },
    /*
    text: {
      primary: "rgba(0, 0, 0, 0.75)",
      secondary: "rgba(0, 0, 0, 0.65)",
      disabled: "rgba(0, 0, 0, 0.55)",
      hint: "rgba(0, 0, 0, 0.55)",
    },
    */
    primary: {
      main: '#FF9800',
      dark: '#F57C00',
      light: '#FFB74D',
      //main: '#bd60ff',
      contrastText: '#fff',
    },
    secondary: {
      main: '#282c34',
      contrastText: '#ddd',
    },
    tertiary: {
      main: '#89ce1a',
    },
    success: {
      main: '#34ab27',
    },
    /*
    error: {
      main: '#ff6666',
      contrastText: '#fff',
    },
     */
    background: {
      default: '#fffbf2',
      paper: '#fff',
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '1.5em',
      },
    },
  },
  typography: {
    fontFamily: fontFamilies.body,
    button: {
      fontWeight: 600,
    },
    h1: {
      fontFamily: fontFamilies.headers,
    },
    h2: {
      fontFamily: fontFamilies.headers,
    },
    h3: {
      fontFamily: fontFamilies.headers,
    },
    h4: {
      fontFamily: fontFamilies.headers,
    },
    h5: {
      fontFamily: fontFamilies.headers,
    },
    h6: {
      fontFamily: fontFamilies.headers,
    },
  },
});

export default theme;
