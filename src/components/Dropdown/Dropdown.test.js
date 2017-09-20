// @flow
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Dropdown from "./Dropdown";

describe("Dropdown component", () => {
  let dropdown;

  beforeEach(() => {
    dropdown = shallow(
      <Dropdown
        value="one"
        options={[
          { value: "one", label: "One" },
          { value: "two", label: "Two" }
        ]}
        onSelect={jest.fn()}
      />
    );
  });

  test("should render without options", () => {
    expect(toJson(dropdown)).toMatchSnapshot();
  });

  test("should show options when clicked", () => {
    dropdown
      .find("div")
      .last()
      .simulate("click");

    expect(toJson(dropdown)).toMatchSnapshot();
  });

  test("should hide options when option is chosen", () => {
    dropdown
      .find("div")
      .last()
      .simulate("click");
    dropdown
      .find("ul")
      .children()
      .last()
      .simulate("click");

    expect(toJson(dropdown)).toMatchSnapshot();
  });

  test("should hide options when list is not active", () => {
    dropdown
      .find("div")
      .last()
      .simulate("click");
    dropdown.find("ul").simulate("mouseLeave");

    expect(toJson(dropdown)).toMatchSnapshot();
  });
});
