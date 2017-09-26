// @flow
import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import api from "../../utils/api";
import type { FieldValue } from "../../types";
import Typeahead from "../Typeahead";
import Dropdown from "../Dropdown";
import Button from "../Button";
import styles from "./Search.scss";

type Props = {
  onSearch: (Object[]) => void
};

@observer
class Search extends Component<Props> {
  searchScopeOptions: FieldValue = [
    {
      value: "multi",
      label: "All"
    },
    {
      value: "movie",
      label: "Movie"
    },
    {
      value: "tv",
      label: "TV Show"
    },
    {
      value: "person",
      label: "People"
    }
  ];
  @observable searchValue: string = "";
  @observable
  searchScope: FieldValue = {
    value: "multi",
    label: "All"
  };

  @action
  handleSuggestionChange = (value: string) => {
    this.searchValue = value;
  };

  @action
  handleSuggestionSelect = (suggestion: FieldValue) => {
    this.searchValue = suggestion.label;
    this.props.onSearch([suggestion]);
  };

  @action
  getSuggestions = (query: string) => {
    return api
      .search(query, this.searchScope.value)
      .then((response: { results: Object[] }) =>
        response.results.map(result => {
          const name = result.name || result.original_title;

          return Object.assign(result, { value: name, label: name });
        })
      );
  };

  @action
  handleSearchScopeChange = (value: string) => {
    this.searchScope = this.searchScopeOptions.find(
      option => option.value === value
    );
  };

  @action
  handleButtonClick = async () => {
    const result = await api.search(this.searchValue, this.searchScope.value);

    this.props.onSearch(result.results);
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.typeahead}>
          <Typeahead
            value={this.searchValue}
            onChange={this.handleSuggestionChange}
            onSelect={this.handleSuggestionSelect}
            dataSource={this.getSuggestions}
            placeholder="Search"
          />
        </div>
        <div className={styles.options}>
          <div className={styles.dropdown}>
            <Dropdown
              value={this.searchScope.label}
              options={this.searchScopeOptions}
              onSelect={this.handleSearchScopeChange}
            />
          </div>
          <div className={styles.button}>
            <Button onClick={this.handleButtonClick}>Search</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
