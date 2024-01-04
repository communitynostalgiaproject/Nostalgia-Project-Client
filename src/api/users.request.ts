import { CRUDBaseClass } from "./CRUDBaseClass";

export class UserRequest extends CRUDBaseClass {

    constructor(model:string) {
        super(model);
    };

};

export default new UserRequest("users");