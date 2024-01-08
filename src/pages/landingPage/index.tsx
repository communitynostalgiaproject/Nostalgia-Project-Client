import React, { useEffect, useState } from 'react';
import ReactionRequest from '../../api/reactions.request'
import AppVector from '../../shared/components/stadiaMap/index';

const LandingPage: React.FC = () => {

    useEffect(() => {
        const createReaction = async() => {
            let deleted = await ReactionRequest.post({
                reaction: "meToo",
                userId: "6541795c8c2ca0edcda512df",
                experienceId: "659c2be7198da1cbcf8d41d6",
                createdDate: "2023-01-08"
            })
            return deleted
        };

        createReaction().then(res => console.log(res));
    }, []);

    return (
        <>
            <AppVector/>
        </>
    )
}

export default LandingPage;