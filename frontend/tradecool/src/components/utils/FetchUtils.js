import { ErrorResponse } from "@remix-run/router";

const BASE_URL = "http://localhost:8080";
export const secFetch = (endpoint, options) => {
  endpoint = BASE_URL + endpoint;
  return fetch(endpoint, options)
    .then((resp) => {
      if (resp.status === 401) {
        localStorage.removeItem("userToken");
        return new Error("Authorization required!");
      }
      return resp;
    })
    .catch((err) => {
      return err;
    });
};
