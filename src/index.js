import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  state = {
    books: []
  };

  getFetch() {
    const app_id = process.env.APP_ID;
    const app_key = process.env.APP_KEY;
    const baseName = "Books";

    fetch(`https://api.airtable.com/v0/${app_id}/${baseName}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + app_key }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          books: Object.values(json.records).map(i => i.fields.Name)
        });
      });
  }

  render() {
    return (
      <>
        <h1>List of books</h1>
        <ul>
          {this.state.books.map(book => (
            <li>{book}</li>
          ))}
        </ul>
        <button onClick={this.getFetch()}>Refresh</button>
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
