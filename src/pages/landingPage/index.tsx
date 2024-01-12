import React, { useEffect, useState } from 'react';
import ReactionRequest from '../../api/reactions.request'
import AppVector from '../../shared/components/stadiaMap/index';

const LandingPage: React.FC = () => {

    useEffect(() => {
        const createReaction = async() => {
            let reaction = await ReactionRequest.getById("659c3809fcb2d898d87818d7")
            return reaction
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