import axios from "axios";
import { useEffect, useState } from "react";
import { IDuration } from "../../types/duration";

const useGetDuration = () => {
  const url: string = `${import.meta.env.VITE_API_URL}/duration`;
  const [data, setData] = useState<IDuration[]>([]);

  useEffect(() => {
    axios.get(url).then((response: any) => {
      setData(response);
      console.log("data", data);
    });
  }, []);

  return { data };
};

export default useGetDuration;
