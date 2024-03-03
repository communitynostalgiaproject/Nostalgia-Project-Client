import React, { useState, useEffect } from 'react';
import reactionsRequest from '../../../api/reactions.request';
import usersRequest from '../../../api/users.request';
import { useQuery } from 'react-query';

import ThanksForSharing from '../../../assets/reactionIcons/thanksForSharing';
import MeToo from '../../../assets/reactionIcons/meToo';
import WillTry from '../../../assets/reactionIcons/willTry';
import useStyles from './styles';

interface Experience {
    title: string;
    foodPhotoUrl: string;
    _id: string;
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

    useEffect(() => {
        if(reactions !== undefined) {
            for(let [key] of Object.entries(selectedReaction)) {
                let reactionEl = document.getElementById(key);
                let reactionIcon = document.getElementById(`${key}-svg`);
    
                if(reactionEl && reactionIcon) {
                    let reactionObj = reactions.find((item: any) => item.reaction === reactionEl?.id);
              
                    if(reactionObj?.reaction) {
                        reactionIcon.style.fill = "rgb(50, 150, 255)"; 

                        setSelectedReaction(reactionState => ({
                            ...reactionState,
                            [reactionObj.reaction as keyof typeof reactionState]: !reactionState[reactionObj.reaction as keyof typeof reactionState]
                        }));
                    } else {
                        reactionIcon.style.fill = "rgb(50, 50, 50)"; 
                    }
                }
            }
            // console.log(reactions);
        }
    }, [reactions])

    const handleReaction = async(event: React.MouseEvent<HTMLDivElement>) => {
        let reaction = event.currentTarget?.id;
        let experienceId = event.currentTarget?.getAttribute("data-experience");
        let reactionIcon = document.getElementById(`${event.currentTarget?.id}-svg`);
            
        if(reactionIcon) {
            if(selectedReaction[reaction as keyof typeof selectedReaction] === false) {
                await reactionsRequest.put({
                    experienceId: experienceId as string,
                    reaction: reaction,
                });
                reactionIcon.style.fill = "rgb(50, 150, 255)" 
            } else {
                await reactionsRequest.removeReaction({
                    experienceId: experienceId as string,
                    reaction: reaction,
                });
                reactionIcon.style.fill = "rgb(50, 50, 50)" 
            }
            
            setSelectedReaction(reactionState => ({
                ...reactionState,
                [reaction as keyof typeof reactionState]: !reactionState[reaction as keyof typeof reactionState]
            }))
        }
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