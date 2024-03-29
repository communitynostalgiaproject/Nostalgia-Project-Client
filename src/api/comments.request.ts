import { CRUDRequestBase } from "./base/CRUDRequestBase";

export class CommentRequest extends CRUDRequestBase {

    constructor(model:string) {
        super(model);
    };
};
    // Still considering the use of comments per Hetvi's suggestion.
    // Will rework to coincide with experience class when functionality is added to backend endpoints.

export default new CommentRequest("comments");