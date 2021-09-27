import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

 
export default class LocationForm extends Component{

    formEvent = (event) =>{
        event.preventDefault();
        this.props.update(event.target.value)
    };
    
    render(){
        return (
            <>
                <Form>
                    <h1>Enter a City Name</h1>
                <Form.Control onChange={ this.formEvent }
                    type="text" placeholder="Type in a City"/>
                <Button onClick={(event) => 
                    this.props.getLocationData(event)} variant="primary">Explore?</Button>
                </Form>
            </>
        );
    }
};