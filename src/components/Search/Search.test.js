// @flow
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import api from "../../utils/api";
import Search from "./Search";

describe("Search component", () => {
  let apiMock;
  let response;
  let search;
  let onSearch;
  let instance;

  beforeAll(() => {
    apiMock = jest.spyOn(api, "search");
    response = {
      results: [{ id: "1", original_title: "test" }, { id: "2", name: "test2" }]
    };
    apiMock.mockImplementation(() => Promise.resolve(response));
  });

  afterAll(() => {
    apiMock.mockRestore();
  });

  beforeEach(() => {
    onSearch = jest.fn();
    search = shallow(<Search onSearch={onSearch} />);
    instance = search.instance();
  });

  test("should render properly", () => {
    expect(toJson(search)).toMatchSnapshot();
  });

  test("method handleSuggestionChange should update searchValue", () => {
    instance.handleSuggestionChange("test");

    expect(instance.searchValue).toBe("test");
  });

  describe("method handleSuggestionSelect", () => {
    let suggestion;

    beforeEach(() => {
      suggestion = { value: "test", label: "Test" };

      instance.handleSuggestionSelect(suggestion);
    });

    test("should update searchValue", () => {
      expect(instance.searchValue).toBe("Test");
    });

    test("should call onChange prop", () => {
      expect(onSearch).toHaveBeenCalledWith(suggestion);
    });
  });

  describe("method getSuggestions", () => {
    let result;

    beforeEach(async () => {
      result = await instance.getSuggestions("query", "multi");
    });

    test("should query api and transform suggestions", () => {
      expect(apiMock).toHaveBeenCalledWith("query", "multi");
    });

    test("should transform suggestions", () => {
      expect(result).toEqual([
        { id: "1", original_title: "test", value: "test", label: "test" },
        { id: "2", name: "test2", value: "test2", label: "test2" }
      ]);
    });
  });

  test("method handleSearchScopeChange should update searchScope", () => {
    instance.handleSearchScopeChange("person");

    expect(instance.searchScope).toEqual({
      value: "person",
      label: "People"
    });
  });

  describe("method handleButtonClick", async () => {
    beforeEach(async () => {
      instance.searchValue = "John Doe";
      instance.searchScope = {
        value: "person",
        label: "People"
      };

      await instance.handleButtonClick();
    });

    test("should query api", () => {
      expect(apiMock).toHaveBeenCalledWith("John Doe", "person");
    });

    test("should call onChange prop", () => {
      expect(onSearch).toHaveBeenCalledWith(response);
    });
  });
});
