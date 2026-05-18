import axios from "axios";

const client = (baseURL: string) => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      post: {
        "Content-Type": "application/json",
      },
    },
  });
};

export default client;
