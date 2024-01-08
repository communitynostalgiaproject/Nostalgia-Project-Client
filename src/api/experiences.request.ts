import { CRUDBaseClass } from "./CRUDRequestClass";

export class ExperienceRequest extends CRUDBaseClass {

    constructor(model:string) {
        super(model);
    };

};

export default new ExperienceRequest("experiences");