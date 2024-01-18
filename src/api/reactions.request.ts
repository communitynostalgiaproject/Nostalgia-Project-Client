import { CRUDRequestBase } from "./CRUDRequestBase";

export class ReactionRequest extends CRUDRequestBase {

    constructor(model:string) {
        super(model);
    };

};

export default new ReactionRequest("reactions");