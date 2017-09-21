// @flow

import React, { Component } from "react";
import Image from "../Image";
import styles from "./TvShow.css";

type Props = {
  tvShow: Object
};

const TvShow = ({ tvShow }: Props) => {
  const {
    vote_average,
    name,
    poster_path,
    original_name,
    overview,
    first_air_date
  } = tvShow;
  const hasOriginalName = name !== original_name;
  const hasPoster = poster_path != null;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h3>{name}</h3>
        {hasOriginalName && <h4>{original_name}</h4>}
        <h5>
          First air date: <time>{first_air_date}</time>
        </h5>
        <h6>Rating: {vote_average}</h6>
      </header>
      <article className={styles.content}>
        {hasPoster && <Image name={poster_path} />}
        <p>{overview}</p>
      </article>
    </div>
  );
};

export default TvShow;
