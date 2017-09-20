// @flow
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import TextInput from "./TextInput";

describe("TextInput component", () => {
  let textInput;
  let onChange;
  let onFocus;
  let onBlur;
  let onMouseEnter;
  let onMouseLeave;

  beforeEach(() => {
    onChange = jest.fn();
    onFocus = jest.fn();
    onBlur = jest.fn();
    onMouseEnter = jest.fn();
    onMouseLeave = jest.fn();
    textInput = shallow(
      <TextInput
        value="one"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  });

  test("should render inactive", () => {
    expect(toJson(textInput)).toMatchSnapshot();
  });

  test("should render active", () => {
    textInput.find("input").simulate("focus");

    expect(toJson(textInput)).toMatchSnapshot();
  });

  test("should render with icon", () => {
    textInput = shallow(
      <TextInput
        value="one"
        onChange={onChange}
        icon={
          <svg>
            <rect width="30" height="10" />
          </svg>
        }
      />
    );

    expect(toJson(textInput)).toMatchSnapshot();
  });

  test("onChange handler should be triggered with text value", () => {
    textInput.find("input").simulate("change", { target: { value: "text" } });

    expect(onChange).toHaveBeenCalledWith("text");
  });

  test("onFocus handler should be triggered", () => {
    textInput.find("input").simulate("focus");
    expect(onFocus).toHaveBeenCalled();
  });

  test("onBlur handler should be triggered", () => {
    textInput.find("input").simulate("blur");
    expect(onBlur).toHaveBeenCalled();
  });

  test("onMouseEnter handler should be triggered", () => {
    textInput.find("input").simulate("mouseEnter");
    expect(onMouseEnter).toHaveBeenCalled();
  });

  test("onMouseLeave handler should be triggered", () => {
    textInput.find("input").simulate("mouseLeave");
    expect(onMouseLeave).toHaveBeenCalled();
  });
});
