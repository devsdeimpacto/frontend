import { withStyles } from '@mui/styles';
import palette from './palette';

import PublicSansRegular from '../fonts/PublicSans/PublicSans-Regular.ttf';
import PublicSansBold from '../fonts/PublicSans/PublicSans-Bold.ttf';
import PublicSansBoldItalic from '../fonts/PublicSans/PublicSans-BoldItalic.ttf';
import PublicSansLight from '../fonts/PublicSans/PublicSans-Light.ttf';
import PublicSansLightItalic from '../fonts/PublicSans/PublicSans-LightItalic.ttf';
import PublicSansMedium from '../fonts/PublicSans/PublicSans-Medium.ttf';
import PublicSansMediumItalic from '../fonts/PublicSans/PublicSans-MediumItalic.ttf';

const GlobalStyles = withStyles((theme) => ({
    '@global': {
        '*': {
            fontFamily : '"Public Sans", sans-serif',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box'
        },
        '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
        },
        '*::-webkit-scrollbar-track': {
            boxShadow: 'inset 0px 0px 6px #00000029',
            border: '0',
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: palette.primary.main,
            outline: '0px',
            border: '0px',
        },
        html: {
            width: '100%',
            height: '100%',
            '-ms-text-size-adjust': '100%',
            '-webkit-overflow-scrolling': 'touch'
        },
        body: {
            width: '100%',
            height: '100%'
        },
        '#root': {
            width: '100%',
            height: '100%'
        },
        input: {
            '&[type=number]': {
                MozAppearance: 'textfield',
                '&::-webkit-outer-spin-button': { margin: 0, WebkitAppearance: 'none' },
                '&::-webkit-inner-spin-button': { margin: 0, WebkitAppearance: 'none' }
            }
        },
        textarea: {
            '&::-webkit-input-placeholder': { color: theme.palette.text.disabled },
            '&::-moz-placeholder': { opacity: 1, color: theme.palette.text.disabled },
            '&:-ms-input-placeholder': { color: theme.palette.text.disabled },
            '&::placeholder': { color: theme.palette.text.disabled }
        },
        a: { color: theme.palette.primary.main },
        img: { display: 'block', maxWidth: '100%' },

        // Lazy Load Img
        '.blur-up': {
            WebkitFilter: 'blur(5px)',
            filter: 'blur(5px)',
            transition: 'filter 400ms, -webkit-filter 400ms'
        },
        '.blur-up.lazyloaded ': {
            WebkitFilter: 'blur(0)',
            filter: 'blur(0)'
        },
        '@font-face': [
            {
                fontFamily		: 'Public Sans',
                src				: `url(${PublicSansRegular}) format('truetype')`,
                fontStyle		: 'normal',
                fontWeight		: 400,
                fontDisplay		: 'swap',
            },
            {
                fontFamily		: 'Public Sans',
                src				: `url(${PublicSansBold}) format('truetype')`,
                fontStyle		: 'normal',
                fontWeight		: 700,
                fontDisplay		: 'swap',
            },
            {
                fontFamily		: 'Public Sans',
                src				: `url(${PublicSansBoldItalic}) format('truetype')`,
                fontStyle		: 'italic',
                fontWeight		: 700,
                fontDisplay		: 'swap',
            },
            {
                fontFamily		: 'Public Sans',
                src				: `url(${PublicSansLight}) format('truetype')`,
                fontStyle		: 'normal',
                fontWeight		: 300,
                fontDisplay		: 'swap',
            },
            {
                fontFamily		: 'Public Sans',
                src				: `url(${PublicSansLightItalic}) format('truetype')`,
                fontStyle		: 'italic',
                fontWeight		: 300,
                fontDisplay		: 'swap',
            },
            {
                fontFamily		: 'Public Sans',
                src				: `url(${PublicSansMedium}) format('truetype')`,
                fontStyle		: 'normal',
                fontWeight		: 500,
                fontDisplay		: 'swap',
            },
            {
                fontFamily		: 'Public Sans',
                src				: `url(${PublicSansMediumItalic}) format('truetype')`,
                fontStyle		: 'italic',
                fontWeight		: 500,
                fontDisplay		: 'swap',
            },
        ],
    },
    
}))(() => null);

export default GlobalStyles;