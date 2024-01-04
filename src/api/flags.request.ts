import { CRUDBaseClass } from "./CRUDBaseClass";

export class FlagRequest extends CRUDBaseClass {

    constructor(model:string) {
        super(model);
    };

};

export default new FlagRequest("flags");