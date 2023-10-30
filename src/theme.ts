import createTheme from "@mui/material/styles/createTheme";

declare module '@mui/material/styles' {
    interface TypographyVariants {
        nostalgiaHeader: React.CSSProperties;
        nostalgiaSubHeader: React.CSSProperties;
        eventTitle: React.CSSProperties;
        eventDetails: React.CSSProperties;
    }
  
    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        nostalgiaHeader?: React.CSSProperties;
        nostalgiaSubHeader?: React.CSSProperties;
        eventTitle: React.CSSProperties;
        eventDetails: React.CSSProperties;
    }
  };
  
  // Update the Typography's variant prop options
  declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        nostalgiaHeader: true;
        nostalgiaSubHeader: true,
        eventTitle: true,
        eventDetails: true,
        h3: false;
    }
};
  

const theme = createTheme({
    typography: {
        nostalgiaHeader: {
            fontSize: 96,
            color: '#5E0916',
        },
        nostalgiaSubHeader: {
            fontSize: 36,
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
        },
    },
});
  
export default theme;