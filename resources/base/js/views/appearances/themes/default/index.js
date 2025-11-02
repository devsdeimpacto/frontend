import { createTheme } from '@mui/material/styles';

//
import palette from './styles/palette';
import typography from './styles/typography';
import shadows, { customShadows } from './styles/shadows';
import shape from './styles/shape';
import breakpoints from './styles/breakpoints';

export default createTheme({
    palette,
    ...typography,
    shadows: shadows.light,
    customShadows: customShadows.light,
    shape,
    breakpoints
});