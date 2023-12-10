import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FacetCard from '../../components/facet-card/FacetCard';

type Facet = {
    id: number,
    title: string,
    content: string,
};

const DUMMY_DATA: Facet[] = [
    {
        id: 1,
        title: 'Facet 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
        id: 2,
        title: 'Facet 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
        id: 3,
        title: 'Facet 3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
        id: 4,
        title: 'Facet 4',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
        id: 5,
        title: 'Facet 5',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
        id: 6,
        title: 'Facet 6',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
        id: 7,
        title: 'Facet 7',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
        id: 8,
        title: 'Facet 8',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
        id: 9,
        title: 'Facet 9',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
        id: 10,
        title: 'Facet 10',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
];

const AboutPage = () => {

    const displayFacets = DUMMY_DATA.map((facet: Facet) => {
        return (
            <ListItem key={facet.id} >
                <FacetCard key={facet.id} id={facet.id} title={facet.title} content={facet.content} />
            </ListItem>
        )
    });

    return (
        <Container 
            sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                minWidth: '100%',
                minHeight: '80vh',
                paddingBottom: '5rem'
            }}
        >
            <Box
                sx={{
                    maxWidth: '40%',
                    height: '100%',
                    paddingRight: '2rem',
                }}
            >
                <Typography 
                    variant="h2" 
                    sx={{ 
                        marginBottom: '1.5rem',
                        fontFamily: 'comfortaa',
                        color: '#5E0916'
                    }}
                >
                        ABOUT US
                </Typography>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper quis lectus nulla at volutpat diam ut venenatis tellus. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Dignissim enim sit amet venenatis urna cursus eget. Id semper risus in hendrerit gravida rutrum quisque. Justo nec ultrices dui sapien eget mi proin sed. Nunc scelerisque viverra mauris in aliquam sem fringilla ut. Convallis a cras semper auctor neque vitae tempus quam pellentesque. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Phasellus faucibus scelerisque eleifend donec pretium vulputate. Amet nisl purus in mollis. Sed ullamcorper morbi tincidunt ornare massa. Diam donec adipiscing tristique risus nec feugiat in fermentum. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus. Turpis egestas sed tempus urna et pharetra. Sit amet venenatis urna cursus eget nunc. Mattis ullamcorper velit sed ullamcorper.
                    <br></br><br></br>
                    Massa id neque aliquam vestibulum. Varius duis at consectetur lorem. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus. Tellus id interdum velit laoreet id donec. Integer feugiat scelerisque varius morbi. Pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Urna neque viverra justo nec. Laoreet non curabitur gravida arcu ac tortor dignissim. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Et netus et malesuada fames ac turpis egestas. At varius vel pharetra vel turpis nunc eget lorem. Faucibus interdum posuere lorem ipsum dolor sit. Diam vulputate ut pharetra sit amet.
                </p>
            </Box>
            <List
                sx={{
                    width: '50%',
                    marginTop: '3rem',
                    maxHeight: '700px',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': { display: 'none' }
                }}
            >
                {displayFacets}
            </List>
        </Container>
        // <Container style={{ maxWidth: '90%', marginTop: '8rem' }}>
        //     <Stack sx={{ ml: 15, width:0.5 }}>
        //         <Typography variant='nostalgiaSubHeader2'>THE PROJECT.</Typography>
        //         <Typography style={{ width: '80%' }}>
        //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        //             <br/><br/>
        //             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        //         </Typography>
        //     </Stack>

        //     <Box style={{ display: 'flex', marginTop: '8rem' }}>
            
        //         <Grid container style={{ width: '65%' }}>
        //             <Grid item xs={2.4}>  
        //             <img src={sean} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Sean</strong> | Team Lead
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={2.4}>  
        //             <img src={patrick} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Patrick</strong> | Research
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={2.4}>  
        //             <img src={emily} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Emily</strong> | Engineer
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={2.4}>  
        //             <img src={parvati} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Parvati</strong> | Writer
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={2.4}>  
        //             <img src={zain} style={{ width: '79%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 5px'
        //                 }}>

        //                     <strong>Zain</strong> | Writer
        //                 </Typography>
        //             </Grid>

        //             <Grid item xs={2.4}>  
        //             <img src={sean} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Sean</strong> | Team Lead
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={2.4}>  
        //             <img src={patrick} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Patrick</strong> | Research
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={2.4}>  
        //             <img src={emily} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Emily</strong> | Engineer
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={2.4}>  
        //             <img src={parvati} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Parvati</strong> | Writer
        //                 </Typography>
        //             </Grid>

        //             <Grid item xs={2.4}></Grid>

        //             <Grid item xs={2.4}>  
        //             <img src={sean} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Sean</strong> | Team Lead
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={2.4}>  
        //             <img src={patrick} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Patrick</strong> | Research
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={2.4}>  
        //             <img src={emily} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Emily</strong> | Engineer
        //                 </Typography>
        //             </Grid>

        //             <Grid xs={4.8}></Grid>

        //             <Grid item xs={2.4}>  
        //             <img src={sean} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Sean</strong> | Team Lead
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={2.4}>  
        //             <img src={patrick} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Patrick</strong> | Research
        //                 </Typography>
        //             </Grid>

        //             <Grid item xs={7.2}></Grid>

        //             <Grid item xs={2.4}>  
        //             <img src={sean} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Sean</strong> | Team Lead
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={2.4}>  
        //             <img src={patrick} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Patrick</strong> | Research
        //                 </Typography>
        //             </Grid>

        //             <Grid item xs={7.2}></Grid>

        //             <Grid item xs={2.4}>  
        //             <img src={sean} style={{ width: '80%', }} alt='team member profile' />
        //                 <Typography style={{ 
        //                     position: 'relative',
        //                     bottom: 0,
        //                     left: 0,
        //                     transform: 'rotate(270deg)',
        //                     transformOrigin: '-17px 2px'
        //                 }}>

        //                     <strong>Sean</strong> | Team Lead
        //                 </Typography>
        //             </Grid>
        //         </Grid>

        //         <Stack style={{ width: '25%', marginLeft: '5%' }}>
        //             <Box>
        //                 <Typography variant='nostalgiaSubHeader2'>THE TEAM.</Typography>
        //                 <Typography>
        //                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        //                     <br/><br/>
        //                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        //                     <br/><br/>
        //                     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        //                 </Typography>
        //             </Box>
        //         </Stack>

        //     </Box>
        // </Container>
    );
};

export default AboutPage;