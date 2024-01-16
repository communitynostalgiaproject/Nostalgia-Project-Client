import { CRUDRequestBase } from "./CRUDRequestBase";

export class ExperienceRequest extends CRUDRequestBase {

    constructor(model:string) {
        super(model);
    };

};

export default new ExperienceRequest("experiences");