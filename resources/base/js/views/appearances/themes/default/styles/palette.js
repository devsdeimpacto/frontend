import { alpha } from '@mui/system';

const GREY = {
    0: '#FFFFFF',
    100: '#F9F9FA',
    200: '#DFE1E4',
    300: '#B0B3BC',
    400: '#848997',
    500: '#3B3F4C',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
};
  
const PRIMARY = {
    light: 'rgb(182 229 82)',
    main: 'rgb(128 156 20)',
    dark: 'rgb(96 124 60)',
    contrastText: '#fff',
};
  
const SECONDARY = {
    light: '#b0efe9',
    main: '#3382e9ff',
    dark: '#00b39d',
    contrastText: '#fff',
};
  
const INFO = {
    light: '#92E9DA',
    main: '#0CDAC1',
    dark: '#00A882',
    contrastText: '#fff',
};
  
const SUCCESS = {
    light: '#BBF2CC',
    main: '#02E64A',
    dark: '#017E29',
    contrastText: GREY[800],
};
  
const WARNING = {
    light: '#F7E8BF',
    main: '#FBBC11',
    dark: '#A67A03',
    contrastText: GREY[800],
};
  
const ERROR = {
    light: '#F7C1C1',
    main: '#F91919',
    dark: '#900404',
    contrastText: '#fff',
};

const colors = {

    //
    color_1 	: '#FFFFFF',
    color_2 	: '#707070',
    color_3		: '#000000',
    color_4 	: '#0CDAC3',
    color_5 	: '#F8F8F8',
    color_6		: '#F3FDF6',
    color_7 	: '#B5B5B5',
    color_8 	: '#D5D5D5',
    color_9 	: '#5C5C5C',
    color_10 	: '#E6E6E6',

    //
    color_11	: '#C3A87B',
    color_12	: '#032723',
    color_13	: '#C3BDBD',
    color_14 	: '#838383',
    color_15	: '#EDEDED',
    color_16	: '#02E64A',
    color_17	: '#D1DAF6',
    color_18    : '#19E64A',
    color_19    : '#13CBF0',
    color_20    : '#f44336',
    color_21    : '#fbbc11',
    color_22    : '#f7f7f7'
};

const palette = {
    common: { black: '#000', white: '#fff' },
    primary: PRIMARY,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    grey: GREY,
    divider: alpha(GREY[500], 0.24),
    text: {
        primary: GREY[800],
        secondary: GREY[600],
        disabled: GREY[500],
    },
    background: {
        paper: '#f7f7f7',
        default: GREY[100],
        neutral: GREY[200],
    },
    action: {
        active: PRIMARY.main,
        hover: alpha(PRIMARY.main, 0.08),
        selected: alpha(PRIMARY.main, 0.16),
        disabled: alpha(GREY[400], 0.8),
        disabledBackground: alpha(PRIMARY.main, 0.24),
        focus: alpha(PRIMARY.main, 0.24),
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
    },
    ...colors
};

export default palette;