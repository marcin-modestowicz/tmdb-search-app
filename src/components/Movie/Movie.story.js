// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Movie from "./Movie";

storiesOf("Movie", module).add("simple", () => (
  <Movie
    movie={{
      original_title: "Batman",
      overview:
        "The Dark Knight of Gotham City begins his war on crime with his first major enemy being the clownishly homicidal Joker, who has seized control of Gotham's underworld.",
      poster_path: "/kBf3g9crrADGMc2AMAMlLBgSm2h.jpg",
      release_date: "1989-06-23",
      title: "Batman",
      vote_average: 7
    }}
  />
));
