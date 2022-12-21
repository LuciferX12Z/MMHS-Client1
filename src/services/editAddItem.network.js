import axios from "axios";
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_BACKEND_URL
    : process.env.REACT_APP_DEV_BACKEND_URL;

export const editHandler = ({ url, values, withCredentials, history, toLink }) => {
  axios({
    method: "put",
    url: `${BASE_URL}/${url}`,
    data: values,
    withCredentials: withCredentials,
  }).then((res) => res.status === 200 && history.replace(toLink));
};

export const addHandler = ({ url, values, withCredentials, history, toLink }) => {
  axios({
    method: "post",
    url: `${BASE_URL}/${url}`,
    data: values,
    withCredentials: withCredentials,
  }).then((res) => res.status === 200 && history.replace(toLink));
};

