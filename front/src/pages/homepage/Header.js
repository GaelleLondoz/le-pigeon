import React from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import SearchResult from "../../components/search/SearchResult";
import SearchAuto from "../../components/search/SearchAuto";


const Header = () => {
  return (
    <section id="header-homepage">
      <Container>
        <Typography variant="h1">Trouvez votre agent de voyage</Typography>
        <div className="form-search">
          <form className="" noValidate autoComplete="off">
            <Grid container justify="center" spacing={4}>
               <Grid item>
                 <SearchAuto />
                {/*<TextField
                  id="outlined-basic"
                  label="Quelle région du monde ?"
                  variant="outlined"
                />*/}
              </Grid> 
              <Grid item>
                {/* <TextField
                  id="outlined-basic"
                  label="Quel type de voyage ?"
                  variant="outlined"
                /> */}
                
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
      </Container>
    </section>
  );
};

export default Header;
