// @flow

import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Dropdown from "./Dropdown";

storiesOf("Dropdown", module).add("simple", () => (
  <Dropdown
    value="one"
    options={[{ value: "one", label: "One" }, { value: "two", label: "Two" }]}
    onSelect={action("option selected")}
  />
));
