import React, { useState } from 'react';
import reactionsRequest from '../../../api/reactions.request';
import { useMutation } from 'react-query';

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
    const [selectedReaction, setSelectedReaction] = useState<string | null>(null)

    const mutation = useMutation(async (data: {}) => {
        return await reactionsRequest.post(data)
    })

    const handleReaction = (event: React.MouseEvent<HTMLDivElement>) => {
        let reaction = event.currentTarget?.id;
        let experienceId = event.currentTarget?.getAttribute("data-experience");
        let reactionIcon = document.getElementById(`${reaction}-svg`);

        if (reactionIcon) {
            if (selectedReaction !== reaction) {
                let currentReaction = document.getElementById(`${selectedReaction}-svg`);
                if(currentReaction) { currentReaction.style.fill = "rgb(0, 0, 0)" }

                reactionIcon.style.fill = "rgb(130, 210, 250)"
                setSelectedReaction(reaction);
            } else if(selectedReaction === reaction) {
                reactionIcon.style.fill = "rgb(0, 0, 0)"
                setSelectedReaction(null)
                return;
            }
        }

        mutation.mutate({
            reaction: reaction,
            userId: "6541795c8c2ca0edcda512df",
            experienceId: experienceId
        });
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
                <div id="meToo" className={classes.meToo} title='Me Too' data-experience={experience._id} onClick={handleReaction}>
                    <MeToo/>
                </div>
                <div id="thanksForSharing" className={classes.thanksForSharing} title='Thanks for sharing' data-experience={experience._id} onClick={handleReaction}>
                    <ThanksForSharing />
                </div>
                <div id="willTry" className={classes.willTry} title='Will try' data-experience={experience._id} onClick={handleReaction}>
                    <WillTry />
                </div>
            </div>
        </div>
    )
}

export default ReactionBar;