export default function Card (theme) {
    return {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: theme.customShadows.z48,
                    borderRadius: theme.shape.borderRadiusMd,
                    position: 'relative',
                    zIndex: 0 // Fix Safari overflow: hidden with border radius
                }
            }
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: { variant: 'h6' },
                subheaderTypographyProps: {
                    variant: 'body2',
                    marginTop: theme.spacing(0.5)
                }
            },
            styleOverrides: {
                root: {
                    padding: theme.spacing(3, 3, 0)
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: theme.spacing(3)
                }
            }
        }
    };
}
  