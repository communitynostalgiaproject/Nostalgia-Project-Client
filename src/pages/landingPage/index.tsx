import React, { useEffect, useState } from 'react';
import ExperienceRequest from '../../api/experiences.request'
import AppVector from '../../shared/components/stadiaMap/index';

const LandingPage: React.FC = () => {

    useEffect(() => {
        const createExperience = async() => {
            let deleted = await ExperienceRequest.delete("659c2be7198da1cbcf8d41ce")
            return deleted
        };

        createExperience().then(res => console.log(res));
    }, []);

    return (
        <>
            <AppVector/>
        </>
    )
}

export default LandingPage;