const BASE_URL = "http://localhost:8080";

export const basicFetch = (endpoint, options) => {
  return fetch(BASE_URL + endpoint, options);
};

export const secFetch = (endpoint, method, body) => {
  endpoint = BASE_URL + endpoint;
  let headers = new Headers();
  headers.append(
    "Authorization",
    "Bearer " + localStorage.getItem("userToken")
  );

  const options = {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: headers,
    referrerPolicy: "no-referrer",
    body: body,
  };
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
