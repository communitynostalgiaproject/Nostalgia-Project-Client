import { CRUDRequestBase } from "./base/CRUDRequestBase";

export class FlagRequest extends CRUDRequestBase {

    constructor(model:string) {
        super(model);
    };

};

export default new FlagRequest("flags");