import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import Search from "./components/Search";
import styles from "./App.css";

@observer
class App extends Component {
  @observable searchResults: Object;

  @action
  handleSearchResults = (results: Object) => {
    this.searchResults = results;
    console.log(results);
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <h2>The Movie Database Search</h2>
        </div>
        <Search onSearch={this.handleSearchResults} />
      </div>
    );
  }
}

export default App;
