// @flow
import request from "./request";

class Api {
  searchMulti = (query: string): Promise<string> => {
    return request
      .get({
        url: "/search/multi",
        data: {
          query
        }
      })
      .then((response: Response): Promise<string> => response.json());
  };
}

export default new Api();
