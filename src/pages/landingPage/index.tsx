import React, { useEffect, useState } from 'react';
import CommentRequest from '../../api/comments.request'
import AppVector from '../../shared/components/stadiaMap/index';

const LandingPage: React.FC = () => {

    useEffect(() => {
        const postFlag = async() => {
            for(let i = 1; i < 6; i++) {
                await CommentRequest.post({
                    experienceId: "659c2be7198da1cbcf8d41d6",
                    text: `sting post ${i}`,
                    createdDate: "2024-1-12",
                    creatorId: "6541795c8c2ca0edcda512df"
                });
            }
        };

        postFlag();
    }, []);

    return (
        <>
            <AppVector/>
        </>
    )
}

export default LandingPage;