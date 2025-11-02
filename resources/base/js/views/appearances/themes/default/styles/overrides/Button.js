// ----------------------------------------------------------------------

export default function Button (theme) {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight : 500,
                    borderRadius: '8px',
                    minWidth : 96,
                    height : 38,
                    '&:hover': { 
                        boxShadow: 'none'
                    },
                    '&.Mui-disabled': {
                        color : theme.palette.grey[400],
                        backgroundColor: theme.palette.grey[200],
                        borderColor: theme.palette.grey[300]
                    },
                },
                sizeLarge: {
                    height: 48
                },
                // contained
                containedInherit: {
                    color: theme.palette.grey[800],
                    boxShadow: theme.customShadows.z8,
                    '&:hover': {
                        backgroundColor: theme.palette.grey[400]
                    }
                },
                containedPrimary: {
                    boxShadow: theme.customShadows.z8
                },
                containedSecondary: {
                    boxShadow: theme.customShadows.z8
                },
                containedInfo: {
                    boxShadow: theme.customShadows.z8
                },
                containedSuccess: {
                    boxShadow: theme.customShadows.z8
                },
                containedWarning: {
                    boxShadow: theme.customShadows.z8
                },
                containedError: {
                    boxShadow: theme.customShadows.z8
                },
                // outlined
                outlinedInherit: {
                    border: `1px solid ${theme.palette.grey[500_32]}`,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover
                    }
                },
                textInherit: {
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover
                    }
                },
                oulinedDisabled: {
                    borderColor : theme.palette.color_7,
                    color : theme.palette.color_7
                }
            }
        }
    };
}
  