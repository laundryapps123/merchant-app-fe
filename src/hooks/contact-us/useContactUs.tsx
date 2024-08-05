import axios from "axios";
import { useState } from "react";

interface ISendEmail {
  title: string;
  message: string;
}

export const useContactUs = () => {
  const url: string = `${import.meta.env.VITE_API_URL}/email-support`;
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const sendEmail = (values: ISendEmail) => {
    axios.post(url, values).then(() => {
      setIsSuccess(true);
    });
  };

  return [isSuccess, sendEmail];
};
