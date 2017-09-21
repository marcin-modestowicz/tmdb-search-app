// @flow

import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";
import Image from "./Image";

storiesOf("Image", module)
  .addDecorator(withKnobs)
  .add("simple", () => (
    <Image name={text("Filename:", "/kBf3g9crrADGMc2AMAMlLBgSm2h.jpg")} />
  ));
