import { Component } from "react";
import { Container } from "react-bootstrap"
import Card from "react-bootstrap/Card";


export default class movieRender extends Component {
  render() {
    return (
      <Container>
        {this.props.movie.map((movieData, idx) => {
            return(
            <Card key={idx}>
            <Card.Title>{movieData.title}</Card.Title>  
              <Card.Body>
                <Card.Img variant="right" src={'https://www.themoviedb.org/t/p/w300_and_h450_bestv2'}/>
                <Card.Text>Average Votes: {movieData.averagevotes}</Card.Text>
                <Card.Text>Total Votes: {movieData.totalvotes}</Card.Text>
                <Card.Text>Popularity: {movieData.popularity}</Card.Text>
                <Card.Text>Released On: {movieData.releasedon}</Card.Text>
                <Card.Text>Overview: {movieData.overview}</Card.Text>
              </Card.Body>
            </Card>
            )
        })};
      </Container>
    );
  };
}