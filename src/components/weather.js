import { Component } from "react";
import Card from "react-bootstrap/Card";


export default class weatherRender extends Component {
  render() {
    return (
      <>
        {this.props.weather.map((weatherData, idx) => {
            return(
            <Card
              style={{
              width: "18rem",
              height: "15rem",}}
              key={idx}>
            <Card.Title>Forecast</Card.Title>  
              <Card.Body>
                <Card.Text>Date: {weatherData.date}</Card.Text>
                <Card.Text>Report: {weatherData.description}</Card.Text>
              </Card.Body>
            </Card>
            )
        })};
      </>
    );
  };
}