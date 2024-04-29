import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FacetCard from '../../shared/components/facet-card/FacetCard';

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

const OurMissionPage = () => {

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
                flexDirection: { xs: "column", md: "row" },
                minWidth: '100%',
                minHeight: '80vh',
                paddingBottom: '5rem',
            }}
        >
            <Box
                sx={{
                    maxWidth: { xs: '100%', md: '40%' },
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
                    maxWidth: { xs: '100%', md: '50%' },
                    marginTop: '3rem',
                    maxHeight: '700px',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': { display: 'none' }
                }}
            >
                {displayFacets}
            </List>
        </Container>
    );
};

export default OurMissionPage;