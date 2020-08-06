import React, { Component } from "react";
import AlgoliaPlaces from "algolia-places-react";

class Places extends Component {
  render() {
    return (
      <AlgoliaPlaces
        placeholder={this.props.placeholder}
        name={this.props.name}
        options={{
          appId: process.env.REACT_APP_APP_ID_ALGOLIA_NAIM,
          apiKey: process.env.REACT_APP_API_KEY_ALGOLIA_NAIM,
          language: "fr",
          type: this.props.type,
          // Other options from https://community.algolia.com/places/documentation.html#options
        }}
        onChange={({ query, rawAnswer, suggestion, suggestionIndex }) =>
          this.props.handleChange(suggestion)
        }
        onSuggestions={({ rawAnswer, query, suggestions }) =>
          console.log(
            "Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed."
          )
        }
        onCursorChanged={({ rawAnswer, query, suggestion, suggestonIndex }) =>
          console.log(
            "Fired when arrows keys are used to navigate suggestions."
          )
        }
        onClear={() => console.log("Fired when the input is cleared.")}
        onLimit={({ message }) =>
          console.log("Fired when you reached your current rate limit.")
        }
        onError={({ message }) =>
          console.log(
            "Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit."
          )
        }
      />
    );
  }
}

export default Places;
