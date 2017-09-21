// @flow

import React, { Component } from "react";
import Image from "../Image";
import styles from "./Movie.css";

type Props = {
  movie: Object
};

const Movie = ({ movie }: Props) => {
  const {
    vote_average,
    title,
    poster_path,
    original_title,
    overview,
    release_date
  } = movie;
  const hasOriginalTitle = title !== original_title;
  const hasPoster = poster_path != null;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h3>{title}</h3>
        {hasOriginalTitle && <h4>{original_title}</h4>}
        <h5>
          Release date: <time>{release_date}</time>
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

export default Movie;
