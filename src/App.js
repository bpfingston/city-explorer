import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'



export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchQuery: '',
      location: {},
      error: false
    }
  }

  getLocationData = async (event) => {
    event.preventDefault();
    try{
    const coord = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;
    const response = await axios.get(coord);
    const location = response.data[0];

    this.setState({ 
      location,
      error: false,
    });
    } catch(error) {
      this.setstate({error: true})
    };
    var coord2 = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=12&format=jpeg`;
    const response2 = await axios.get(coord2);
    const mapLocation = response2.config.url;
    console.log(mapLocation);

    this.setState({ 
      mapLocation,
    })
  
  }; 
  
  render(){
    return (
      <>
      <Form
        >
        <h1>
          Enter a City Name
        </h1>
        <Form.Control onChange={ event => this.setState({ searchQuery: event.target.value})}
        type="text" placeholder="Type in a City"/>
        <Button onClick={this.getLocationData} variant="primary" type="Submit">Explore?</Button>
        </Form>
      <Col>
      <Card style={{ margin: '20px', width: '20 rem' }}>
        <Card.Img variant="top" src={this.state.mapLocation} />
        <Card.Body>
          {this.state.location.place_id &&
          <Card.Title>City Name: {this.state.location.display_name}</Card.Title>
          }
          {this.state.location.place_id &&
          <Card.Text>Latitude: {this.state.location.lat}</Card.Text>
          }
          {this.state.location.place_id &&
          <Card.Text>Longitude: {this.state.location.lon}</Card.Text>
          }
        </Card.Body>
      </Card>
      </Col>
        <Container>
        {this.state.error &&
          <h2>'Please put in a valid City Name'</h2>
        }
        </Container>
      </>
    );
  };
};