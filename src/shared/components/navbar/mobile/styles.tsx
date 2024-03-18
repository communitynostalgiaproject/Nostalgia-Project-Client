import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    navBar: {
        height: "100px",
        width: "100%",
        backgroundColor: "#EDEDED",
        position: "fixed",
        top: 0,
        zIndex: 1,
        boxShadow: "2px 0px 2px rgb(155, 155, 155)",
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 10% 0 2.5%"
    },
    iconButton: {
        '&:hover': {
            backgroundColor: "transparent"
        },
    },
    menuIcon: {
        color: "#3F3F3F",
        fontSize: "1.7em"
    },
    drawer: {
        height: "100%",
    },
    navHeader: {
        fontSize: "1.2em",
        color: "#EDEDED",
        fontWeight: 600,
        letterSpacing: "1.5px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgb(26, 26, 26)",
        height: "100px",
        textTransform: "uppercase",
        paddingLeft: "40px"
    },
    navItemBox: {
        height: "100%",
        backgroundColor: "rgb(26, 26, 26)"
    },
    navItemGroup: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        margin: "0px 0px 0px 40px",
        padding: "15px 45px 0px 10px",
        borderLeft: "1px solid #EDEDED"
    },
    navItem: {
        '& span': {
            fontSize: "1.45em",
            fontFamily: "Arial",
            fontWeight: 500,
            letterSpacing: "2px",
            color: "#EDEDED",
            textAlign: "center",
            paddingBottom: "40px"
        }
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoName: {
        color: "#545454",
        fontWeight: 600,
        textDecoration: "none",
        fontSize: "26px",
        fontFamily: "serif",
        letterSpacing: "1.5px"
    },
    logoImg: {
        maxHeight: '5rem',
        maxWidth: '10rem'

    },
})

export default useStyles;