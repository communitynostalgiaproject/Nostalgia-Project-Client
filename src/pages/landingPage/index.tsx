import React, { useEffect, useState } from 'react';
import UserRequest from '../../api/users.request';
import AppVector from '../../shared/components/stadiaMap/index';
import usersRequest from '../../api/users.request';

const LandingPage: React.FC = () => {

    useEffect(() => {
        const createUser = async() => {
            let post = await UserRequest.post({
                "googleId": "test37_4c8e67e1-5972-49a6-84f6-885b73e6dfff",
                "displayName": "Test User37",
                "emailAddress": "test.user37@gmail.com",
                "isModerator": "true",
                "isAdmin": "false"
            })
            // get testuser36
            let getById = await usersRequest.getById("6596c0b7c7b05b50c19c9fb3")
            
            let get = await usersRequest.get("4")
           
            let patch = await usersRequest.patch({
                _id: "658d88bb2fdc23cdd2c5c65e",
                __v: 0,
                displayName: "CHANGED!!"
            })
            
            let deleted = await usersRequest.delete("6541795c8c2ca0edcda512df")

            return {
                post, 
                getById,
                get,
                patch,
                deleted
            }
        };

        createUser().then(({ post, getById, get, patch, deleted }) => {
            console.log(`post: ${JSON.stringify(post)}\ngetById: ${JSON.stringify(getById)}\nget: ${JSON.stringify(get)}\npatch: ${JSON.stringify(patch)}\ndeleted: ${JSON.stringify(deleted)}`)
        })

    }, []);

    return (
        <>
            <AppVector/>
        </>
    )
}

export default LandingPage;