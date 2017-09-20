// @flow

import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "./Button";

storiesOf("Button", module).add("simple", () => (
  <Button onClick={action("clicked")}>Button</Button>
));
