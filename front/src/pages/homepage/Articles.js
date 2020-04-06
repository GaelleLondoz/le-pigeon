import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@material-ui/core";

const Articles = () => {
  return (
    <section id="articles-blog">
      <Container>
        <Typography variant="h2">Découvrez nos articles de Blog</Typography>
        <Grid container spacing={7}>
          <Grid item xs={12} md={4}>
            <Card className="">
              <CardActionArea>
                <CardMedia
                  component="img"
                  src="https://cdn.pixabay.com/photo/2017/01/06/17/28/road-1958388__340.jpg"
                  title="Afrique du sud"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    Découvrez l’Amerique du Sud
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  En savoir plus
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="">
              <CardActionArea>
                <CardMedia
                  component="img"
                  src="https://cdn.pixabay.com/photo/2012/03/04/00/09/africa-21787__340.jpg"
                  title="La tanzanie"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    Envolez vous en Tanzanie!
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  En savoir plus
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="">
              <CardActionArea>
                <CardMedia
                  component="img"
                  src="https://cdn.pixabay.com/photo/2017/06/26/15/12/woman-2444053__340.jpg"
                  title="Dauphins, république dominicaine"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    Nagez avec les dauphins en Rep Dom.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  En savoir plus
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Articles;
