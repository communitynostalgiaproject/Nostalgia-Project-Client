import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    navBar: {
        backgroundColor: "#EDEDED",
        position: "fixed",
        height: "100px",
        width: '100%',
        boxShadow: "2px 0px 2px rgb(155, 155, 155)",
    },
    navContainer: {
        height: "100%",
        minWidth: '100%',
    },
    navContent: {
        display: 'flex',
        justifyContent: "space-between",
        width: '100%',
        height: "100%",
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
    logoName: {
        color: "#545454",
        fontWeight: 600,
        textDecoration: "none",
        fontSize: "26px",
        fontFamily: "serif",
        letterSpacing: "1.5px"
    },
    '&span': {
        color: "red"
    },
    logoImg: {
        maxHeight: '5rem',
        maxWidth: '10rem'
    }
})

export default useStyles