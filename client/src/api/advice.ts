import axios from "axios";

export interface Advice {
  author: string;
  authorProfile: string;
  message: string;
}

export const fetchAdvice = async (): Promise<Advice> => {
  const res = await axios.get<Advice>("https://korean-advice-open-api.vercel.app/api/advice");
  return res.data;
};
