// @flow

import React, { Component } from "react";
import cn from "classnames";
import { reaction, observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import type { FieldValue } from "../../types";
import DropdownOption from "./DropdownOption";
import styles from "./Dropdown.scss";

type Props = {
  value: any,
  options: FieldValue[],
  onSelect: (value: string) => void
};

@observer
class Dropdown extends Component<Props> {
  props: Props;

  static Option = DropdownOption;

  @observable isListFocused: boolean = false;

  @action
  handleListBlur = () => {
    this.isListFocused = false;
  };

  @action
  handleListFocus = () => {
    this.isListFocused = true;
  };

  @action
  handleClick = () => {
    this.isListFocused = true;
  };

  @action
  handleSelect = (value: string) => {
    this.isListFocused = false;

    if (this.props.onSelect) {
      this.props.onSelect(value);
    }
  };

  render() {
    const { value, options } = this.props;

    return (
      <div className={cn(styles.root, { [styles.active]: this.isListFocused })}>
        <div role="button" onClick={this.handleClick}>
          {value}
        </div>
        {options &&
          this.isListFocused && (
            <ul
              className={styles.options}
              onMouseEnter={this.handleListFocus}
              onMouseLeave={this.handleListBlur}
            >
              {options.map(({ value, label }) => (
                <Dropdown.Option
                  key={value}
                  value={value}
                  label={label}
                  onClick={this.handleSelect}
                />
              ))}
            </ul>
          )}
      </div>
    );
  }
}

export default Dropdown;
