// @flow
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Image from "./Image";

describe("Image component", () => {
  test("should render with proper src attribute value", () => {
    const image = shallow(<Image name="/kBf3g9crrADGMc2AMAMlLBgSm2h.jpg" />);

    expect(toJson(image)).toMatchSnapshot();
  });
});
