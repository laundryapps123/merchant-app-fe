import axios from "axios";
import { useEffect, useState } from "react";
import { IDuration } from "../../types/duration";

const useGetDetailDuration = (id: string) => {
  const url: string = `${import.meta.env.VITE_API_URL}/duration/${id}`;
  const [data, setData] = useState<IDuration[]>([]);

  useEffect(() => {
    axios.get(url).then((response: any) => {
      setData(response);
    });
  }, []);

  return { data };
};

export default useGetDetailDuration;
