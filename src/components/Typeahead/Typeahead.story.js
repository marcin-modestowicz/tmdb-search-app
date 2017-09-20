// @flow

import React from "react";
import { observable } from "mobx";
import { Observer } from "mobx-react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import Typeahead from "./Typeahead";

const store = observable({
  value: "",
  onChange(value) {
    store.value = value;
  },
  dataSource(input) {
    if (input) {
      if (window.fetch) {
        // free autocomplete api, only for testing purposes
        const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${input}`;
        return fetch(url)
          .then(response => response.json())
          .then(companies =>
            companies.map(company => ({
              label: company.name,
              value: company.name
            }))
          );
      }

      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            {
              value: "Stranger Things",
              label: "Stranger Things"
            },
            {
              value: "Doctor Strange",
              label: "Doctor Strange"
            },
            {
              value: "Strangers with Candy",
              label: "Strangers with Candy"
            },
            {
              value: "Stranger than Fiction",
              label: "Stranger than Fiction"
            }
          ]);
        }, 100);
      });
    }

    return Promise.resolve([]);
  }
});

storiesOf("Typeahead", module)
  .addDecorator(getStory => <Observer>{getStory}</Observer>)
  .addDecorator(withKnobs)
  .add("simple", () => (
    <Typeahead
      value={store.value}
      dataSource={store.dataSource}
      onChange={store.onChange}
      placeholder={text("Placeholder", "Search")}
    />
  ));
