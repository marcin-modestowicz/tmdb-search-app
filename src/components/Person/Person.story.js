// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Person from "./Person";

storiesOf("Person", module).add("simple", () => (
  <Person
    person={{
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
    }}
  />
));
