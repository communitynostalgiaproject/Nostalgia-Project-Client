import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const map = require('../../assets/map.png');

const ComingSoonPage = () => {

    return (
        <Box sx={{ 
                backgroundColor: '#5E0916', 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}
        >
            <img
                src={map}
                alt={'Street map'}
                loading="lazy"
                style={{ position: 'absolute', left: '0', height: '100%', width: '50%' }}
            />
            <div                 
                style={{ 
                    position: 'absolute', 
                    height: '100%', 
                    width: '50%', 
                    zIndex: '2', 
                    left: '0%', 
                    backgroundColor: 'rgba(94, 9, 22, 0.4)' 
                }}>
            </div>
            <Box 
                sx={{ 
                    width: '700px', 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'center', 
                    position: 'absolute', 
                    zIndex: '3' 
                }}
            >
                <Typography 
                    sx={{ 
                        fontFamily: 'comfortaa',
                        padding: '0', 
                        textTransform: 'uppercase', 
                        flex: '0 0 100%', 
                        fontSize: '7rem', 
                        fontWeight: '100', 
                        color: '#fff'
                    }}
                >
                    Coming
                </Typography>
                <Typography 
                    sx={{ 
                        fontFamily: 'comfortaa', 
                        padding: '0', 
                        textTransform: 'uppercase', 
                        flex: '1', 
                        fontWeight: 'bold', 
                        fontSize: '7rem', 
                        color: '#fff'
                    }}
                >
                    Soon
                </Typography>
                <Box sx={{ flex: '1' }}>
                    <Typography sx={{ marginLeft: '2rem', fontSize: '1rem', color: '#fff' }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi odit quaerat vero eveniet accusantium sit praesentium earum quidem voluptate dolor quia ea, ipsa obcaecati ut porro voluptatem maiores ad rem!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi odit quaerat vero eveniet accusantium sit praesentium earum quidem voluptate dolor quia ea, ipsa obcaecati ut porro voluptatem maiores ad rem!
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ComingSoonPage;