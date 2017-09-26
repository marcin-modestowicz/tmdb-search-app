// @flow

import React, { Component } from "react";
import Image from "../Image";
import styles from "./Person.scss";

type Props = {
  person: Object
};

const Person = ({ person }: Props) => {
  const { profile_path, name, known_for } = person;
  const hasProfilePhoto = profile_path != null;
  const isKnownFrom = known_for != null;

  return (
    <div className={styles.root}>
      <h3>{name}</h3>
      <div className={styles.content}>
        {hasProfilePhoto && <Image name={profile_path} />}
        {isKnownFrom && (
          <div>
            <h4>Known for:</h4>
            <ul>
              {known_for.map(movie => (
                <li key={movie.id}>{movie.title || movie.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Person;
