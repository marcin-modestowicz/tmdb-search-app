// @flow
import request from "./request";
import api from "./api";

describe("Api", () => {
  describe("searchMulti method", () => {
    let fetchedProducts;
    let requestResult;
    let requestGetSpy;

    beforeAll(async () => {
      requestResult = { response: "response" };
      requestGetSpy = jest.spyOn(request, "get");
      requestGetSpy.mockReturnValueOnce(
        Promise.resolve(new Response(JSON.stringify(requestResult)))
      );

      fetchedProducts = await api.searchMulti("query");
    });

    afterAll(() => {
      requestGetSpy.mockRestore();
    });

    it("should call request with passed params", () => {
      expect(requestGetSpy).toHaveBeenCalledWith({
        url: "/search/multi",
        data: {
          query: "query"
        }
      });
    });

    it("should return request response as string", () => {
      expect(fetchedProducts).toEqual(requestResult);
    });
  });
});
