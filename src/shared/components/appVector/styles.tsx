import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    fullScreenMap: {
        height: "100vh",
        zIndex: 0,
    },
    popupGroup: {
        marginTop: "25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "170px"
    },
    experienceTitle: {
        fontFamily: "Nunito",
        fontWeight: 600,
        marginBottom: "10px"
    },
    experienceImageGroup: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "14px",
        
    },
    experienceImage: {
        width: "65px",
        height: "65px",
        borderRadius: "50%",
        border: "4px solid rgb(240, 200, 50)",
        boxSizing: "border-box"
    },
    reactionGroup: {
        height: "35px",
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
    },
    meToo: {
        height: "25px",
        width: "25px",
        paddingTop: "4px",
        transition: "transform .3s ease",
        '&:hover': {
            cursor: "pointer",
            transform: "scale(1.4)"
        }
    },
    thanksForSharing: {
        height: "25px",
        width: "25px",
        transition: "transform .3s ease",
        '&:hover': {
            cursor: "pointer",
            transform: "scale(1.4)"
        }
    },
    willTry: {
        height: "22px",
        width: "22px",
        transition: "transform .3s ease",
        '&:hover': {
            cursor: "pointer",
            transform: "scale(1.4)"
        }
    }
})

export default useStyles;