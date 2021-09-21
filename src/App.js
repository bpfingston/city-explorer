import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'



export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchQuery: '',
      location: {},
    }
  }

  getlocation = async (event) => {
    event.preventDefault();
    console.log(this.state.searchQuery)
    console.log(process.env.REACT_APP_CITY_KEY)
    var coord = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;
    const response = await axios.get(coord);
    console.log(coord);
    const location = response.data[0];
    console.log(location);

    this.setState({ 
      location,
    })
  
  }; 

  render(){
    return (
      <>
      <Form>
        <Form.Label>
          Enter a City Name
        </Form.Label>
        <Form.Control onChange={ event => this.setState({ searchQuery: event.target.value})}
        type="text" placeholder="type in a city"/>
        <Button onClick={this.getlocation} variant="primary" type="Submit">Explore?</Button>

        {this.state.location.place_id &&
          <Form.Text>City Name: {this.state.location.display_name}</Form.Text>
        }
        {this.state.location.place_id &&
          <Form.Text>Latitude: {this.state.location.lat}</Form.Text>
        }
        {this.state.location.place_id &&
          <Form.Text>Longitude: {this.state.location.lon}</Form.Text>
        }
      </Form>
      </>
    )
  }
};