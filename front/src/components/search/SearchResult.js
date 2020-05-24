import React, { Component, useState } from "react";
import Rating from "../rating";


//placesAutocomplete.getVal()    (Get the current input value.)


class SearchResult extends Component {
    render() {
        return (
            <>
            <p>haut</p>
            <Rating />
            <p>bas</p>
            </>
        )
    }
}

export default SearchResult;