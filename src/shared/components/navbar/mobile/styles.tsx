import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    navBar: {
        height: "80px",
        width: "100%",
        backgroundColor: "#EDEDED",
        position: "fixed",
        zIndex: 1,
        boxShadow: "2px 3px 10px rgb(35, 35, 35)",
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 50px"
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
        fontSize: "2.5em",
        color: "#EDEDED",
        fontWeight: 600,
        letterSpacing: "1.5px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "0px",
        paddingTop: "65px",
        paddingBottom: "10px",
        backgroundColor: "rgb(30, 30, 30)"
    },
    navItemBox: {
        height: "100%",
        backgroundColor: "rgb(30, 30, 30)",
    },
    navItemGroup: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "space-evenly",
        padding: "45px 45px 0px 45px",
        height: "60%"
    },
    navItem: {
        '& span': {
            fontSize: "1.7em",
            fontFamily: "arial",
            fontWeight: 500,
            color: "#EDEDED",
            textAlign: "center"
        }
    },
    logo: {
        color: "#545454",
        fontWeight: 600,
        textDecoration: "none",
        fontSize: "26px",
        fontFamily: "serif",
        letterSpacing: "1.5px"
    },
})

export default useStyles;