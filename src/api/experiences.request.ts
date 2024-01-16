import { CRUDRequestBase } from "./CRUDRequestBase";
import { getApiBase } from "./helpers";
import axios from "axios";

export class ExperienceRequest extends CRUDRequestBase {
    constructor(model:string) {
        super(model);
    };

    fetchData = async () => {
      let response = await axios.get(`${getApiBase()}/users/fetchData`, {
          withCredentials: true
      });

      return response.data;
    }
};

export default new ExperienceRequest("experiences");