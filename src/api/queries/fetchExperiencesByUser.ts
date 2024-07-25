import { useQuery } from "react-query";
import axios from "axios";
import experiencesRequest from "../experiences.request";
import { getApiBase } from "../helpers";

const useFetchExperiencesByUser = (userId: string) => {
  return useQuery(["userExperiences", userId], async () => {
    const res = await axios.get(`${getApiBase()}/experiences`, {
      params: {
        "creatorId": userId
      },
      withCredentials: true
    });

    return res.data;
  });
}

export default useFetchExperiencesByUser;   