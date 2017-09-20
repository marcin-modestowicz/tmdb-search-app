// @flow

import React, { Component } from "react";
import styles from "./Dropdown.css";

type Props = {
  value: string,
  label: string,
  onClick: (value: string) => void
};

class DropdownOption extends Component<Props> {
  props: Props;

  handleClick = () => {
    this.props.onClick(this.props.value);
  };

  render() {
    return (
      <div role="button" className={styles.option} onClick={this.handleClick}>
        {this.props.label}
      </div>
    );
  }
}

export default DropdownOption;
