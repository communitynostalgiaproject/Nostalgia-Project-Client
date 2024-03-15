import { CRUDRequestBase } from "./base/CRUDRequestBase";

export class ExperienceRequest extends CRUDRequestBase {
    constructor(model:string) {
        super(model);
    };
};

export default new ExperienceRequest("experiences");