import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
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
        width: "130px",
        height: "130px",
        borderRadius: "50%",
        // border: "4px solid rgb(240, 200, 50)",
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
        borderRadius: "50%",
        paddingTop: "4px",
        transition: "transform .3s ease",
        '&:hover': {
            cursor: "pointer",
            transform: "scale(1.2)",
        }
    },
    thanksForSharing: {
        height: "25px",
        width: "25px",
        borderRadius: "50%",
        transition: "transform .3s ease",
        '&:hover': {
            cursor: "pointer",
            transform: "scale(1.2)",
        }
    },
    willTry: {
        height: "21px",
        width: "21px",
        borderRadius: "50%",
        transition: "transform .3s ease",
        '&:hover': {
            cursor: "pointer",
            transform: "scale(1.2)"
        }
    }
})

export default useStyles;