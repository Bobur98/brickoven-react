import { createTheme } from '@mui/material/styles';
import { common } from '@mui/material/colors';
import shadow from './shadow';
import typography from './typography';
import { maxWidth } from '@mui/system';

/**
 * LIGHT THEME (DEFAULT)
 */
const light = {
  palette: {
    type: 'light',
    background: {
      default: '#f8f8ff',
      paper: '#ffffff', // Use a slightly lighter shade of white
    },
    primary: {
      contrastText: '#ffffff', // White text on the primary color
      main: '#f44336', // Red color for pizza theme
    },
    secondary: {
      contrastText: '#343434', // Dark text on the secondary color
      main: '#ffb74d', // Orange color for complementing the primary
    },
    text: {
      primary: '#343434', // Dark text for readability
      secondary: '#d7b586', // Lighter text for contrast
      dark: '#000000', // Black text for headings and important info
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: '100%',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: '100%' },
        body: { background: '#f4f6f8', height: '100%', minHeight: '100%' },
      },
    },
  },
  shadow,
  typography,
};

// A custom theme for this app
let theme = createTheme(light);
theme = createTheme(theme, {
	components: {
		MuiContainer: {
			styleOverrides: {
				maxWidthLg: {
					[theme.breakpoints.up('lg')]: {
						maxWidth: '1300px',
					},
				},
			},
		},
	},
});

export default theme;
