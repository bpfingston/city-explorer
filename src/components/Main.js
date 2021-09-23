import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Component } from 'react';
import axios from 'axios';
import LocationData from './Location.js'
import RenderCity from './renderCity.js'
import WeatherData from './weather.js'

let server = 'http://localhost:9001/'



export default class Main extends Component{
    constructor(props){
        super(props);
        this.state={
          searchQuery: '',
          location: {},
          weather:[],
          mappingCoord: null,
          error: false,

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
                error: false
            });

            var mappingCoord = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=12&format=jpeg`;
            
            this.setState({ 
                mappingCoord,
            });


            let weatherCoord = `${server}/weather?searchQuery=${this.state.searchQuery}&lat=${this.state.location.lat}&lon=${this.state.location.lon}`;
            var response2 = await axios.get(weatherCoord)
            var weatherReport= response2.data;
            console.log(weatherReport)
            this.setState({
                weather: weatherReport,
            })
            console.log(weatherReport)
            } catch(error) {
            this.setState({error: true})
            };
    };

    handleChange = async (query) =>{
        this.setState({
            searchQuery:query
        });
    };

    render(){
    
        return(
          <>
          <LocationData location={this.state.location} searchQuery={this.state.searchQuery} update={this.handleChange} getLocationData={(event) => this.getLocationData(event)}/>
          <RenderCity testError={this.state.error} locationUpdate={this.state.location} mappingCoord={this.state.mappingCoord} />
          <WeatherData weather={this.state.weather} />
          </>
        );
      }
    
}