import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const sponsorOneLogo = require('../../assets/sponsor-logo.png');
const sponsorNRCSLogo = require('../../assets/sponsor-NRCS-logo.png');

const SponsorsPage = () => {

    const [formData, setFormData] = useState({
        senderEmail: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('FORM DATA: ', formData);

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log('RESULT: ', result);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <Box 
            sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10rem', 
                width: '100%',
                padding: '0 1rem 0 1rem' 
            }} 
        >
            <Box sx={{ width: { xs: '100%', sm: '100%', md: '80%', lg: '40%' } }}>
            <form 
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}
                onSubmit={handleSubmit}
            >
                <Typography 
                    variant='nostalgiaHeader' 
                    sx={{  
                        margin: '2.5rem 0 2rem 0' 
                    }} 
                >
                    Interested in Becoming a Sponsor?
                </Typography>
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <input
                        style={{ width: '100%', height: '1.5rem' }}
                        type="email"
                        name="senderEmail"
                        placeholder="Your Email"
                        value={formData.senderEmail}
                        onChange={handleChange}
                        required
                    />
                    <span style={{ width: '10%' }} />
                    <input
                        style={{ width: '100%', height: '1.5rem' }}
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <textarea
                    style={{ width: '100%', margin: '1rem 0 1rem 0', resize: 'none' }}
                    rows='5'
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <Button 
                    variant="outlined" 
                    sx={{ 
                        width: '100%',
                        border: '1px solid #5E0916', 
                        color:'#5E0916' 
                    }} 
                >
                    Send Email
                </Button>
            </form>
            </Box>
            <Typography variant='nostalgiaHeader' sx={{ margin: '5rem 0 1rem 0' }} >Our Sponsors</Typography>
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '75%',
                    padding: '.2rem'
                }} 
            >
                <img
                    alt='Sponsor logo' 
                    src={sponsorOneLogo} 
                    style={{ 
                        height: '5rem', 
                        width: '7.5rem',
                        margin: '0 1rem 0 1rem' 
                    }}
                />
                <img
                    alt='New Roots Charter School logo' 
                    src={sponsorNRCSLogo} 
                    style={{ 
                        height: '5rem', 
                        width: '7.5rem',
                        margin: '0 1rem 0 1rem' 
                    }}
                />
            </Box>
        </Box>
    );
};

export default SponsorsPage;
