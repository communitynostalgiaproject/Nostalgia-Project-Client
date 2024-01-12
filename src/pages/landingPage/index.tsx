import React, { useEffect, useState } from 'react';
import ReactionRequest from '../../api/reactions.request'
import AppVector from '../../shared/components/stadiaMap/index';

const LandingPage: React.FC = () => {

    useEffect(() => {
        const getReactions = async() => {
            let reactions = await ReactionRequest.get(2);
            return reactions
        };

        getReactions().then((res) => console.log(res));
    }, []);

    return (
        <>
            <AppVector/>
        </>
    )
}

export default LandingPage;