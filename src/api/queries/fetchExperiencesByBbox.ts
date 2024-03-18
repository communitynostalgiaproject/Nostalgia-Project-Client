import { useInfiniteQuery } from "react-query";
import experiencesRequest from "../experiences.request";
import { useState } from "react";
import { Experience } from "../../types/experience";

const useFetchExperiencesByBbox = (bbox: String | null, limit=30) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const fetchExperiences = async ({ pageParam }: any) => {
    const results = await experiencesRequest.get({
      bbox,
      limit,
      offset: pageParam ? pageParam * limit : 0
    });

    return results;
  }

  const { data, ...rest } = useInfiniteQuery(
    ['experiences', bbox],
    fetchExperiences,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < limit) return undefined;
        return pages.length;
      },
      onSuccess: (data) => {
        // Create a new set of experiences, prioritizing new ones
        const updatedExperiences = data.pages.flat()
          .reduce((acc, experience) => {
            acc[experience._id] = experience; // Use an object to deduplicate, assuming `experience.id` is unique
            return acc;
          }, {});

        // Convert the object back into an array and set the state
        setExperiences(Object.values(updatedExperiences));
      },
      enabled: !!bbox
    }
  );


  return { experiences, setExperiences, ...rest };
}; 

export default useFetchExperiencesByBbox;