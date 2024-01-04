import { CRUDBaseClass } from "./CRUDBaseClass";

export class ReactionRequest extends CRUDBaseClass {

    constructor(model:string) {
        super(model);
    };

};

export default new ReactionRequest("reactions");