import React from "react";
import { Helmet } from "react-helmet";

class Head extends React.Component {
  render() {
    return (
      <div className="allApplication">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Le Pigeon</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Helmet>
      </div>
    );
  }
}

export default Head;
