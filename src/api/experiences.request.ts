import { CRUDBaseClass } from "./CRUDBaseClass";

export class ExperienceRequest extends CRUDBaseClass {

    constructor(model:string) {
        super(model);
    };

};

export default new ExperienceRequest("experiences");