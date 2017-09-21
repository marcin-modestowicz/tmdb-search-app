// @flow
import request from "./request";

class Api {
  search(
    query: string,
    type: "multi" | "movie" | "person" | "tv"
  ): Promise<Object> {
    return request
      .get({
        url: `/search/${type}`,
        data: {
          query
        }
      })
      .then(response => response.json());
  }
}

export default new Api();
