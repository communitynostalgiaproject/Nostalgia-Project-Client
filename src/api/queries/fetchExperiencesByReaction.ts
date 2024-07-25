import { useQuery } from "react-query";
import axios from "axios";
import { Reaction, ReactionType } from "../../types/reaction";
import { getApiBase } from "../helpers";
import { string } from "prop-types";

interface ReactionParams {
  reaction?: ReactionType;
  userId?: string;
  experienceId?: string;
  createdDate?: Date | string;
}

const useFetchExperiencesByReaction = (reactionParams: ReactionParams) => {
  const queryKey = ["experiences", "reactions"];

  Object.entries(reactionParams).forEach((entry) => {
    const [key, value] = entry;
    if (value instanceof Date)
      queryKey.push(key, value.toDateString())
    else
      queryKey.push(key, value)
  });

  return useQuery(queryKey, async () => {
    const { data } = await axios.get(`${getApiBase()}/reactions`, {
      params: reactionParams,
      withCredentials: true
    });

    const reactions: Reaction[] = data;
    const experienceIds = reactions.map((reaction: Reaction) => reaction.experienceId);
    const res = await axios.get(`${getApiBase()}/experiences`, {
      params: {
        experienceId: experienceIds
      },
      withCredentials: true
    });

    return res.data;
  });
}

export default useFetchExperiencesByReaction;   