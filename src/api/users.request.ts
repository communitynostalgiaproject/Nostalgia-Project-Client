import { CRUDRequestBase } from "./CRUDRequestBase";

export class UserRequest extends CRUDRequestBase {

    constructor(model:string) {
        super(model);
    };

};

export default new UserRequest("users");