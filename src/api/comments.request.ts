import { CRUDBaseClass } from "./CRUDRequestClass";

export class CommentRequest extends CRUDBaseClass {

    constructor(model:string) {
        super(model);
    };
};

    // Will rework to coincide with experience class

export default new CommentRequest("comments");