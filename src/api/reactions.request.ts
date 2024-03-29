import { CRUDRequestBase } from "./base/CRUDRequestBase";
import { getApiBase } from "./helpers";
import axios from "axios";

interface reactionReqBody {
    experienceId: string;
    reaction: string;
}

export class ReactionRequest extends CRUDRequestBase {

    constructor(model:string) {
        super(model);
    };

    getByUserId = async(req: { experienceId: string, userId: string }, headers?: {}) => {
        let response = await axios.get(`${getApiBase()}/experiences/${req.experienceId}/reactions`,
        {   params: { userId: req.userId },
            withCredentials: true 
        });

        return response.data
    }

    put = async(req: reactionReqBody, headers?: {}) => {
        let response = await axios.put(`${getApiBase()}/experiences/${req.experienceId}/reactions`, 
        { reaction: req.reaction }, 
        { withCredentials: true });

        return response.data
    }

    removeReaction = async(req: reactionReqBody, headers?: {}) => {
        let response = await axios.put(`${getApiBase()}/experiences/${req.experienceId}/reactions/remove`, 
        { reaction: req.reaction }, 
        { withCredentials: true });

        return response.data
    }

};

export default new ReactionRequest("reactions");