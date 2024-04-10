import { useQuery } from "react-query";
import axios from "axios";

const useFetchCurrentUser = () => {
  return useQuery("currentUser", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fetchData`, { withCredentials: true });

    return res.data;
  });
}

export default useFetchCurrentUser;