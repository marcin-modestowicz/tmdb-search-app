// @flow

import React from "react";

export const IMAGE_URL = "https://image.tmdb.org/t/p/";
export const IMAGE_SIZE = "w185";

type Props = {
  name: string
};

const Image = ({ name }: Props) => (
  <img src={`${IMAGE_URL}${IMAGE_SIZE}${name}`} />
);

export default Image;
