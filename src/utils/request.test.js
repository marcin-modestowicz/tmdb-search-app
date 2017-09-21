// @flow
import request, { API_URL, API_KEY } from "./request";

describe("request utility", () => {
  describe("getQueryString method", () => {
    it("should return encoded query params", () => {
      const params = {
        param1: "value 1",
        param2: "value 2",
        param3: "value 3"
      };
      const encodedParams =
        "param1=value%201&param2=value%202&param3=value%203";

      expect(request.getQueryString(params)).toBe(encodedParams);
    });
  });

  describe("handleHTTPError method", () => {
    it("should return response if it's status is 2..", () => {
      const response = new Response(undefined, { status: 200 });

      expect(request.handleHTTPError(response)).toBe(response);
    });

    it("should throw error if response status code is below 2..", () => {
      const response = new Response(undefined, {
        status: 101,
        statusText: "Not ok"
      });

      expect(() => request.handleHTTPError(response)).toThrowError("Not ok");
    });

    it("should throw error if response status code is above 2..", () => {
      const response = new Response(undefined, {
        status: 301,
        statusText: "Not ok"
      });

      expect(() => request.handleHTTPError(response)).toThrowError("Not ok");
    });
  });

  describe("get method", () => {
    beforeAll(() => {
      jest
        .spyOn(global, "fetch")
        .mockReturnValueOnce(Promise.resolve("response"));
    });

    afterAll(() => {
      global.fetch.mockRestore();
    });

    it("should call fetch with url, headers and method", () => {
      request.get({ url: "/search/multi", data: { param1: "value 1" } });
      expect(
        global.fetch
      ).toHaveBeenCalledWith(
        `${API_URL}/search/multi?api_key=${API_KEY}&param1=value%201`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "GET"
        }
      );
    });
  });
});
