import { CRUDRequestBase } from "./base/CRUDRequestBase";
import { getApiBase } from "./helpers";
import axios from "axios";

export class UserRequest extends CRUDRequestBase {

    constructor(model:string) {
        super(model);
    };

    fetchData = async () => {
      let response = await axios.get(`${getApiBase()}/${this.model}/fetchData`, {
          withCredentials: true
      });

      return response.data;
    }
};

export default new UserRequest("users");