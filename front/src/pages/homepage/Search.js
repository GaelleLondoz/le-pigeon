import React from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

// components
import SearchResult from "../../components/homepageSearch/SearchResult";
import SearchResult02 from "../../components/homepageSearch/SearchResult02";
import SearchAuto from "../../components/homepageSearch/SearchAuto";
import SearchWithChoice from "../../components/homepageSearch/SearchWithChoice";

// scss
import "../../assets/sass/components/_search.scss"


const Search = () => {
  return (
    <section id="search-homepage">
      <Container>
        <Typography variant="h1">Trouvez votre agent de voyage</Typography>
        <div className="form-search">
          <form className="" noValidate autoComplete="off">
            <Grid container justify="center" spacing={4}>
               <Grid item>
                 <SearchAuto />
              </Grid> 
              <Grid item>
                <SearchWithChoice />
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" size="large">
                  Rechercher
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <SearchResult />
        <SearchResult02 />
      </Container>
    </section>
  );
};

export default Search;
