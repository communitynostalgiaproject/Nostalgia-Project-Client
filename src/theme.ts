import createTheme from "@mui/material/styles/createTheme";
import { responsiveFontSizes } from '@mui/material';
import React from "react";

declare module '@mui/material/styles' {
    interface TypographyVariants {
        nostalgiaHeader: React.CSSProperties;
        nostalgiaSubHeader1: React.CSSProperties;
        nostalgiaSubHeader2: React.CSSProperties;
        eventTitle: React.CSSProperties;
        eventDetails: React.CSSProperties;
        teamMember: React.CSSProperties;
    }
  
    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        nostalgiaHeader?: React.CSSProperties;
        nostalgiaSubHeader1?: React.CSSProperties;
        nostalgiaSubHeader2?: React.CSSProperties
        eventTitle: React.CSSProperties;
        eventDetails: React.CSSProperties;
        teamMember: React.CSSProperties;
    }

    interface ButtonVariants {
        modalButton: React.CSSProperties;
    }

    interface ButtonVariansOptions {
        modalButton: true
    }
  };
  
  // Update the Typography's variant prop options
  declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        nostalgiaHeader: true;
        nostalgiaSubHeader1: true,
        nostalgiaSubHeader2: true,
        eventTitle: true,
        eventDetails: true,
        teamMember: true,
        h3: false;
    }
};
  

const theme = createTheme({
    typography: {
        h1: {
            fontFamily: 'Comfortaa',
        },
        fontFamily: 'Open Sans',
        nostalgiaHeader: {
            fontFamily: 'Comfortaa',
            fontSize: 96,
            color: '#5E0916',
        },
        nostalgiaSubHeader1: {
            fontFamily: 'Comfortaa',
            fontSize: 64,
            color: '#5E0916',
        },
        nostalgiaSubHeader2: {
            fontFamily: 'Comfortaa',
            fontSize: 52,
            color: '#5E0916',
        },
        eventTitle: {
            fontSize: 22,
        },
        eventDetails: {
            marginTop: '2.5rem',
            fontSize: 16,
            fontWeight: 'lighter',
        },
        teamMember: {
            transform: 'rotate(270deg)',
            transformOrigin: '-17px 2px',
        },
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