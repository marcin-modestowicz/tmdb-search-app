// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import TvShow from "./TvShow";

storiesOf("TvShow", module).add("simple", () => (
  <TvShow
    tvShow={{
      original_name: "Saturday Night Live",
      name: "Saturday Night Live",
      vote_average: 6.43,
      poster_path: "/aXdHYUXubjdVzdQvUsV5OxpCNeu.jpg",
      first_air_date: "1975-10-11",
      overview:
        "A late-night live television sketch comedy and variety show created by Lorne Michaels. The show's comedy sketches, which parody contemporary culture and politics, are performed by a large and varying cast of repertory and newer cast members. Each episode is hosted by a celebrity guest, who usually delivers an opening monologue and performs in sketches with the cast, and features performances by a musical guest."
    }}
  />
));
