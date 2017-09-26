import React, { Component } from "react";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import Search from "./components/Search";
import Movie from "./components/Movie";
import TvShow from "./components/TvShow";
import Person from "./components/Person";
import styles from "./App.scss";

@observer
class App extends Component {
  @observable searchResults: Object;

  @action
  handleSearchResults = (results: Object) => {
    this.searchResults = results;
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <h2>The Movie Database Search</h2>
        </div>
        <Search onSearch={this.handleSearchResults} />
        {this.searchResults &&
          this.searchResults.map(result => {
            if (result.title != null) {
              return <Movie movie={result} />;
            }
            if (result.name != null && result.overview != null) {
              return <TvShow tvShow={result} />;
            }
            if (result.name != null) {
              return <Person person={result} />;
            }
          })}
      </div>
    );
  }
}

export default App;
