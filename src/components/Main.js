import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Component } from 'react';
import axios from 'axios';
import LocationData from './Location.js'
import RenderCity from './renderCity.js'
import WeatherData from './weather.js'
import MovieData from './movie.js'

let server = 'http://localhost:9001/'



export default class Main extends Component{
    constructor(props){
        super(props);
        this.state={
          searchQuery: '',
          location: {},
          weather:[],
          error: false,
          movie:[],

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

            const mappingCoord = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=12&format=jpeg`;
            
            this.setState({ 
                mappingCoord,
            });


            const weatherCall = `${server}weather?searchquery=${this.state.searchQuery}&lon=${this.state.location.lon}&lat=${this.state.location.lat}`;
            console.log(weatherCall)
            var response2 = await axios.get(weatherCall)
            
            if(response2.status !== 200){
                this.setState({
                    error:true,
                })
            } else {
                    var weatherReport= response2.data;
                    this.setState({weather: weatherReport});
            }}catch {
                this.setState({
                    error: true,
                });
            };
            

            const movieCall = `${server}movie?searchquery=${this.state.searchQuery}`
            var movie2 = await axios.get(movieCall)
            var movieReport = movie2.data
            console.log(movieReport.vote_average)

            this.setState({
                movie: movieReport,
            })
    
    
    
    };

    handleSubmit = async (query) =>{
        this.setState({
            searchQuery: query
        });
    };

    render(){
    
        return(
          <>
          <LocationData location={this.state.location} searchQuery={this.state.searchQuery} update={this.handleSubmit} getLocationData={(event) => this.getLocationData(event)}/>
          <RenderCity testError={this.state.error} locationUpdate={this.state.location} mappingCoord={this.state.mappingCoord} />
          <WeatherData weather={this.state.weather} />
          <MovieData movie={this.state.movie} />
          </>
        );
      }
    
}