import { useState, useEffect } from "react";
import axios from 'axios';

const useUserSession = () => {
  const [user, setUser] = useState<any>();

  const fetchUser = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/fetchData`, {withCredentials: true});

    sessionStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      setUser(storedUser);
      return; 
    }

    try {
      fetchUser();
    } catch(err) {
      console.log("Unable to fetch user");
    }
  }, []);

  return user;
};

export default useUserSession;