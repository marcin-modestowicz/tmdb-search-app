// @flow
import "whatwg-fetch";

export const API_URL = "https://api.themoviedb.org/3";
export const API_KEY = "key";

type GetParams = {
  url: string,
  data?: Object
};

const request = {
  getQueryString(params: Object): string {
    const encode = encodeURIComponent;
    return Object.keys(params)
      .map(key => `${encode(key)}=${encode(params[key])}`)
      .join("&");
  },

  handleHTTPError(response: Response): Response {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    } else {
      return response;
    }
  },

  get(params: GetParams): Promise<Response> {
    const method = "GET";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const data = Object.assign({ api_key: API_KEY }, params.data || {});
    const queryString = `?${this.getQueryString(data)}`;
    const url = `${API_URL}${params.url}${queryString}`;

    return fetch(url, { method, headers }).then(this.handleHTTPError);
  }
};

export default request;
