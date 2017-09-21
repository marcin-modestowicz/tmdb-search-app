// @flow

import React, { Component } from "react";
import { reaction, observable, action, computed } from "mobx";
import type { IPromiseBasedObservable } from "mobx-utils";
import { fromPromise, PENDING, FULFILLED } from "mobx-utils";
import { observer } from "mobx-react";
import type { FieldValue } from "../../types";
import TypeaheadSuggestion from "./TypeaheadSuggestion";
import TextInput from "../TextInput";
import Spinner from "./spinner.svg";
import styles from "./Typeahead.css";

type Props = {
  value: any,
  onChange?: (value: string) => void,
  onSelect?: (value: string) => void,
  dataSource: (value: string) => Promise<FieldValue[]>,
  placeholder?: string
};

@observer
class Typeahead extends Component<Props> {
  static Suggestion = TypeaheadSuggestion;

  @observable value: string = "";
  @observable isInputFocused: boolean = false;
  @observable isListFocused: boolean = false;
  @observable suggestionsRequest: ?IPromiseBasedObservable<any> = null;
  props: Props;

  constructor(props: Props) {
    super(props);

    this.value = props.value;

    reaction(
      () => this.value,
      async value => {
        if (value !== "" && !this.isValueSet) {
          this.suggestionsRequest = fromPromise(this.props.dataSource(value));
        }
      },
      {
        name: "Get suggestions",
        delay: 500
      }
    );
  }

  componentWillReceiveProps(props: Props) {
    this.value = props.value;
  }

  @computed
  get isValueSet(): boolean {
    return this.value === this.props.value;
  }

  @computed
  get isActive(): boolean {
    return this.isInputFocused || this.isListFocused;
  }

  @computed
  get isLoading(): boolean {
    const request = this.suggestionsRequest;
    return request != null && request.state === PENDING;
  }

  @computed
  get suggestions(): FieldValue[] {
    const request = this.suggestionsRequest;
    return request != null && request.state === FULFILLED ? request.value : [];
  }

  @computed
  get hasSuggestions(): boolean {
    return this.suggestions.length > 0;
  }

  @action
  handleInputBlur = () => {
    this.isInputFocused = false;

    if (!this.isActive) {
      if (this.props.onChange) {
        this.props.onChange(this.value);
      }
      this.resetSuggestions();
    }
  };

  @action
  handleInputFocus = () => {
    this.isInputFocused = true;
  };

  @action
  handleListBlur = () => {
    this.isListFocused = false;
  };

  @action
  handleListFocus = () => {
    this.isListFocused = true;
  };

  @action
  handleChange = (value: string) => {
    this.value = value;
    this.resetSuggestions();
  };

  @action
  handleSelect = (suggestion: FieldValue) => {
    this.value = suggestion.label;
    if (this.props.onSelect) {
      this.props.onSelect(suggestion);
    }
    this.resetSuggestions();
    this.isListFocused = false;
  };

  @action
  resetSuggestions = () => {
    this.suggestionsRequest = null;
  };

  render() {
    const { placeholder } = this.props;

    return (
      <div className={styles.root}>
        <TextInput
          value={this.value}
          placeholder={placeholder}
          onChange={this.handleChange}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck={false}
          icon={this.isLoading ? <Spinner /> : null}
        />
        {this.hasSuggestions && (
          <ul
            className={styles.suggestions}
            onMouseEnter={this.handleListFocus}
            onMouseLeave={this.handleListBlur}
          >
            {this.suggestions.map(suggestion => (
              <Typeahead.Suggestion
                key={suggestion.id}
                suggestion={suggestion}
                searchFor={this.value}
                onClick={this.handleSelect}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Typeahead;
