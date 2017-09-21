// @flow
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { fromPromise, PENDING, FULFILLED } from "mobx-utils";
import Typeahead from "./Typeahead";

describe("Typeahead component", () => {
  let onChange;
  let onSelect;
  let dataSource;
  let typeahead;
  let instance;
  let resetSuggestionsMock;

  beforeEach(() => {
    onChange = jest.fn();
    onSelect = jest.fn();
    dataSource = jest.fn(() =>
      Promise.resolve([
        { id: "1", value: "test1", label: "Test1" },
        { id: "2", value: "test2", label: "Test2" }
      ])
    );
    typeahead = shallow(
      <Typeahead
        value="one"
        onChange={onChange}
        onSelect={onSelect}
        dataSource={dataSource}
        placeholder="Search"
      />
    );
    instance = typeahead.instance();
    resetSuggestionsMock = jest.spyOn(instance, "resetSuggestions");
  });

  test("should render without suggestions", () => {
    expect(toJson(typeahead)).toMatchSnapshot();
  });

  test("should render with suggestions", async () => {
    instance.suggestionsRequest = fromPromise(dataSource());

    await instance.suggestionsRequest;

    expect(toJson(typeahead)).toMatchSnapshot();
  });

  describe("method handleInputBlur", () => {
    test("should set isInputFocused to false", () => {
      instance.isInputFocused = true;
      instance.handleInputBlur();
      expect(instance.isInputFocused).toBeFalsy();
    });

    test("if list is focused should do nothing", () => {
      instance.isListFocused = true;
      instance.handleInputBlur();
      expect(onChange).not.toHaveBeenCalled();
      expect(resetSuggestionsMock).not.toHaveBeenCalled();
    });

    describe("if list is not focused", () => {
      beforeEach(() => {
        instance.isListFocused = false;
        instance.handleInputBlur();
      });

      test("should call onChange prop", () => {
        expect(onChange).toHaveBeenCalledWith(instance.value);
      });

      test("should reset suggestions", () => {
        expect(resetSuggestionsMock).toHaveBeenCalled();
      });
    });
  });

  test("method handleInputFocus should set isInputFocused to true", () => {
    instance.isInputFocused = false;
    instance.handleInputFocus();
    expect(instance.isInputFocused).toBeTruthy();
  });

  test("method handleListBlur should set isListFocused to false", () => {
    instance.isListFocused = true;
    instance.handleListBlur();
    expect(instance.isListFocused).toBeFalsy();
  });

  test("method handleListFocus should set isListFocused to true", () => {
    instance.isListFocused = false;
    instance.handleListFocus();
    expect(instance.isListFocused).toBeTruthy();
  });

  describe("method handleChange", () => {
    beforeEach(() => {
      instance.handleChange("text");
    });

    test("should set value", () => {
      expect(instance.value).toBe("text");
    });

    test("should reset suggestions", () => {
      expect(resetSuggestionsMock).toHaveBeenCalled();
    });
  });

  describe("method handleSelect", () => {
    let suggestion;

    beforeEach(() => {
      suggestion = { label: "Test1", value: "test1" };
      instance.isListFocused = true;
      instance.handleSelect(suggestion);
    });

    test("should set value", () => {
      expect(instance.value).toBe("Test1");
    });

    test("should call onSelect with suggestion", () => {
      expect(onSelect).toHaveBeenCalledWith(suggestion);
    });

    test("should set isListFocused to false", () => {
      expect(instance.isListFocused).toBeFalsy();
    });

    test("should reset suggestions", () => {
      expect(resetSuggestionsMock).toHaveBeenCalled();
    });
  });
});
