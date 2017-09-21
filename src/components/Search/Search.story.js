// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Search from "./Search";

storiesOf("Search", module).add("simple", () => (
  <Search onSearch={action("search results fetched")} />
));
