import React, { useEffect, useState } from 'react';
import FlagRequest from '../../api/flags.request'
import AppVector from '../../shared/components/stadiaMap/index';

const LandingPage: React.FC = () => {

    useEffect(() => {
        const postFlag = async() => {
            for(let i = 1; i < 6; i++) {
                await FlagRequest.post({
                    contentId: `${i}e1a0651741b255ddda996c4`,
                    contentType: "Comment",
                    userId: "6541795c8c2ca0edcda512df",
                    priority: "high",
                    reason: "misinformation",
                    userComment: "It ain't pop, it's soda",
                    moderatorComments: ["The devil is a lie"],
                    resolved: true,
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