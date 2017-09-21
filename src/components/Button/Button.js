// @flow

import React, { Component } from "react";
import styles from "./Button.css";

type Props = {
  children: any,
  onClick: () => any
};

const Button = ({ children, onClick }: Props) => (
  <div role="button" className={styles.root} onClick={onClick}>
    {children}
  </div>
);

export default Button;
