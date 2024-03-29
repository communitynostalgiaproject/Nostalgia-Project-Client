import createTheme from "@mui/material/styles/createTheme";
import { responsiveFontSizes } from '@mui/material';
import React from "react";

declare module '@mui/material/styles' {
    interface TypographyVariants {
        nostalgiaHeader: React.CSSProperties;
        eventDetails: React.CSSProperties;
    }
  
    interface TypographyVariantsOptions {
        nostalgiaHeader?: React.CSSProperties;
        eventDetails: React.CSSProperties;
    }

    interface ButtonVariants {
        modalButton: React.CSSProperties;
    }

    interface ButtonVariansOptions {
        modalButton: true
    }
};
  
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        nostalgiaHeader: true;
        eventDetails: true,
    }
};
  

const theme = createTheme({
    typography: {
        fontFamily: 'Open Sans',    
        h4: {
            fontFamily: 'Comfortaa',
        },
        nostalgiaHeader: {
            fontFamily: 'Comfortaa',
            color: '#5E0916',
        },
        eventDetails: {
            marginTop: '2.5rem',
            fontSize: 16,
            fontWeight: 'lighter',
        }
    },
    components: {
        MuiStack: {
            defaultProps: {
                useFlexGap: true,
            },
        },
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    nostalgiaHeader: 'h1',
                },
            },
        }
    },
});
  
export default responsiveFontSizes(theme);