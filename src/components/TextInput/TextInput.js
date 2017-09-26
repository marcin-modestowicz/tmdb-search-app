// @flow
import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import cn from "classnames";
import styles from "./TextInput.scss";

/* global SyntheticInputEvent, React$Element */

type Props = {
  value: ?string,
  placeholder?: string,
  onChange?: (value: string) => void,
  onBlur?: () => void,
  onFocus?: () => void,
  onMouseEnter?: (name?: string) => void,
  onMouseLeave?: (name?: string) => void,
  autocomplete?: string,
  autocorrect?: string,
  autocapitalize?: string,
  spellcheck?: boolean,
  autoFocus?: boolean,
  icon?: ?React$Element<any>
};

@observer
class TextInput extends Component<Props> {
  props: Props;

  static defaultProps = {
    placeholder: "",
    autocomplete: "on",
    autocapitalize: "on",
    autocorrect: "on",
    spellcheck: true,
    autoFocus: false
  };

  @observable isFocused = false;

  handleChange = (event: SyntheticInputEvent<*>) => {
    const value = event.target.value;

    if (this.props.onChange && value !== this.props.value) {
      this.props.onChange(value);
    }
  };

  @action
  handleFocus = () => {
    this.isFocused = true;

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  @action
  handleBlur = () => {
    this.isFocused = false;

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  render() {
    const {
      value,
      placeholder,
      onMouseEnter,
      onMouseLeave,
      autocapitalize,
      autocorrect,
      autocomplete,
      spellcheck,
      autoFocus,
      icon
    } = this.props;

    return (
      <div className={cn(styles.root, { [styles.active]: this.isFocused })}>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          className={styles.input}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          autoCapitalize={autocapitalize}
          autoCorrect={autocorrect}
          autoComplete={autocomplete}
          spellCheck={spellcheck}
          autoFocus={autoFocus}
          tabIndex="0"
        />
        <div className={styles.icon}>{icon}</div>
      </div>
    );
  }
}

export default TextInput;
