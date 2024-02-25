import { useInfiniteQuery } from "react-query";
import experiencesRequest from "../experiences.request";
import { useEffect } from "react";

const useFetchExperiencesByBbox = (bbox: String | null, limit=30) => {
  const fetchExperiences = async (pageParam: any) => {
    console.log("In fetchExperiences");
    console.log(`pageParam: ${JSON.stringify(pageParam)}`);
    const results = await experiencesRequest.get({
      bbox,
      limit,
      offset: pageParam ? pageParam : 0
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
      enabled: !!bbox
    }
  );

  useEffect(() => console.log(`data: ${JSON.stringify(data)}`), [data]);
  

  return { experiences: data?.pages.flatMap(page => page) || [], ...rest };
}; 

export default useFetchExperiencesByBbox;