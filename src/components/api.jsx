import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.unsplash.com/",
  params: {
    client_id: "GSuz9ityvF_8tNnTGG9QC0qd31RnLO7SJT4XnO6OPnA",
  },
});

export default instance;
