// @flow
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Button from "./Button";

describe("Button component", () => {
  let button;
  let onClick;

  beforeEach(() => {
    onClick = jest.fn();
    button = shallow(<Button onClick={onClick}>Button</Button>);
  });

  test("should render", () => {
    expect(toJson(button)).toMatchSnapshot();
  });

  test("onClick handler should be triggered", () => {
    button.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});
