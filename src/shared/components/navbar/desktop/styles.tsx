import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    navBar: {
        backgroundColor: "#EDEDED",
        position: "fixed",
        height: "80px",
        boxShadow: "2px 3px 10px rgb(35, 35, 35)"
    },
    navContainer: {
        height: "100%"
    },
    navContent: {
        height: "100%",
        justifyContent: "space-between",
    },
    navlinkContainer: {
        display: "flex",
        justifyContent: "space-between"
    },
    navLink: {
        '& a': {
            textDecoration: "none",
            color: "#3F3F3F",
            textTransform: "none",
            fontSize: "14px",
            fontFamily: "Nunito",
            '&.Mui-selected': {
                color: "#3F3F3F"
            }
        }
    },
    tabIndicator: {
        bottom: 6
    },
    logo: {
        color: "#545454",
        fontWeight: 600,
        textDecoration: "none",
        fontSize: "26px",
        fontFamily: "serif",
        letterSpacing: "1.5px"
    },
    '&span': {
        color: "red"
    }
})

export default useStyles