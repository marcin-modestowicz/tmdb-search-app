// @flow
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Person from "./Person";

describe("Person component", () => {
  test("should render properly", () => {
    const personData = {
      profile_path: "/ce84udJZ9QRSR44jxwK2apM3DM8.jpg",
      name: "Sean Connery",
      known_for: [
        {
          id: 1,
          title: "Indiana Jones and the Last Crusade"
        },
        {
          id: 2,
          title: "The Rock"
        }
      ]
    };
    const person = shallow(<Person person={personData} />);
    expect(toJson(person)).toMatchSnapshot();
  });
});
