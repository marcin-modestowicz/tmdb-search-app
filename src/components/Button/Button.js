// @flow

import React, { Component } from "react";
import styles from "./Button.css";

/* global React$Element */

type Props = {
  children: React$Element<*>,
  onClick: () => void
};

const Button = ({ children, onClick }: Props) => (
  <div role="button" className={styles.root} onClick={onClick}>
    {children}
  </div>
);

export default Button;
