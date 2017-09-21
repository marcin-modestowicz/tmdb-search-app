// @flow
import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import type { FieldValue } from "../../types";
import styles from "./Typeahead.css";

type Props = {
  suggestion: FieldValue,
  searchFor: string,
  onClick: (suggestion: FieldValue) => void
};

@observer
class TypeaheadSuggestion extends Component<Props> {
  props: Props;

  handleClick = () => {
    this.props.onClick(this.props.suggestion);
  };

  renderSuggestion = () => {
    const { suggestion: { label }, searchFor } = this.props;
    const commonPartStartIndex = label
      .toLowerCase()
      .search(searchFor.toLowerCase());
    let firstPart = label;
    let lastPart = "";
    let commonPart = "";

    // In case server returns data that indirectly matches searched string
    // (e.g. abbreviations)
    if (commonPartStartIndex !== -1) {
      const commonPartEndIndex = commonPartStartIndex + searchFor.length;
      firstPart = label.slice(0, commonPartStartIndex);
      lastPart = label.slice(commonPartEndIndex);
      commonPart = label.slice(commonPartStartIndex, commonPartEndIndex);
    }

    return (
      <div>
        {firstPart}
        <span className={styles.commonPart}>{commonPart}</span>
        {lastPart}
      </div>
    );
  };

  render() {
    const { suggestion } = this.props;

    return (
      <li
        role="button"
        className={styles.suggestion}
        onClick={this.handleClick}
      >
        {this.renderSuggestion()}
      </li>
    );
  }
}

export default TypeaheadSuggestion;
