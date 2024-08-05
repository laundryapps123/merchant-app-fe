import axios from "axios";

interface INotes {
  notes: string;
}

export const useUpdateNote = () => {
  const url: string = `${import.meta.env.VITE_API_URL}/note`;
  const updateNote = (values: INotes) => {
    axios.post(url, values).then();
  };

  return [updateNote];
};
