import React, { useState, useEffect } from 'react';
import reactionsRequest from '../../../api/reactions.request';
import usersRequest from '../../../api/users.request';
import { useMutation, useQuery } from 'react-query';

import ThanksForSharing from '../../../assets/reactionIcons/thanksForSharing';
import MeToo from '../../../assets/reactionIcons/meToo';
import WillTry from '../../../assets/reactionIcons/willTry';
import useStyles from './styles';

interface Experience {
    title: string;
    foodPhotoUrl: string;
    _id: string;
}

interface reactionReqBody {
    experienceId: string;
    reaction: string;
}

const ReactionBar: React.FC<Experience> = (experience) => {
    const classes = useStyles()
    const [selectedReaction, setSelectedReaction] = useState({
        meToo: false,
        thanksForSharing: false,
        willTry: false
    })

    const { data: user } = useQuery("currentUser", async () => {
        return await usersRequest.fetchData();
    }); 

    const { data: reactions } = useQuery("reactions", async() => {
        return await reactionsRequest.getByUserId({ experienceId: experience["_id"], userId: user["_id"] })
    })

    const postReaction = useMutation(async (data: reactionReqBody) => {
        return await reactionsRequest.put(data)
    })

    useEffect(() => {
        if(reactions !== undefined) {
            console.log(reactions)
        }
    }, [reactions])

    useEffect(() => {
        for(let [key, value] of Object.entries(selectedReaction)) {
            let reactionIcon = document.getElementById(`${key}-svg`);

            if(reactionIcon) {
                if(value) {
                    reactionIcon.style.fill = "rgb(50, 150, 255)" 
                } else {
                    reactionIcon.style.fill = "rgb(50, 50, 50)" 
                }
            }
        }
        
    }, [selectedReaction])

    const handleReaction = async(event: React.MouseEvent<HTMLDivElement>) => {
        let reaction = event.currentTarget?.id;
        let experienceId = event.currentTarget?.getAttribute("data-experience");

        if(selectedReaction[reaction as keyof typeof selectedReaction] === false) {
            await reactionsRequest.put({
                experienceId: experienceId as string,
                reaction: reaction,
            })
        } else {
            await reactionsRequest.removeReaction({
                experienceId: experienceId as string,
                reaction: reaction,
            })
        }
        
        setSelectedReaction(reactionState => ({
            ...reactionState,
            [reaction as keyof typeof reactionState]: !reactionState[reaction as keyof typeof reactionState]
        }))
    };

    return (
        <div className={classes.popupGroup}>
            <div className={classes.experienceTitle}>
                {experience.title}
            </div>
            <div className={classes.experienceImageGroup}>
                <img src={experience.foodPhotoUrl} alt={experience.title} className={classes.experienceImage} />
            </div>
            <div className={classes.reactionGroup}>
                <div id="meToo" className={classes.meToo} title='Me Too' data-experience={experience["_id"]} onClick={handleReaction}>
                    <MeToo/>
                </div>
                <div id="thanksForSharing" className={classes.thanksForSharing} title='Thanks for sharing' data-experience={experience["_id"]} onClick={handleReaction}>
                    <ThanksForSharing />
                </div>
                <div id="willTry" className={classes.willTry} title='Will try' data-experience={experience["_id"]} onClick={handleReaction}>
                    <WillTry />
                </div>
            </div>
        </div>
    )
}

export default ReactionBar;