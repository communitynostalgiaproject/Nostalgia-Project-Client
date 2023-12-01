import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    navBar: {
        backgroundColor: "white",
        display: "flex",
    },
    navContent: {
        justifyContent: "space-between"
    },
    navLink: {
        textDecoration: "none",
        color: "#3F3F3F",
        textTransform: "none",
        fontSize: "16px",
        fontFamily: "Nunito"
    },
    logo: {
        color: "#3F3F3F",
        fontWeight: 600,
        textDecoration: "none",
        fontSize: "22px",
        fontFamily: "serif",
        letterSpacing: "1.5px"
    }
})

export default useStyles