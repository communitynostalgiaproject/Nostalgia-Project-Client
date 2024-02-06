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
        alignItems: "center"
    },
    experienceTitle: {
        fontFamily: "Nunito",
        fontWeight: 600,
        marginBottom: "10px"
    },
    experienceImageGroup: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "12px",
        
    },
    experienceImage: {
        width: "65px",
        height: "65px",
        borderRadius: "50%"
    },
    reactionGroup: {
        backgroundColor: "rgb(150, 210, 245)",
        height: "35px",
        width: "100%"
    }
})

export default useStyles;