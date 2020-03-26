import React from "react";
import { Helmet } from "react-helmet";

class Head extends React.Component {
  render() {
    return (
      <div className="allApplication">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Le Pigeon de Julien</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Helmet>
      </div>
    );
  }
}

export default Head;
