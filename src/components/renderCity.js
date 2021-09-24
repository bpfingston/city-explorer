import { Component } from "react"
import { Container } from "react-bootstrap"
import Card from 'react-bootstrap/Card'




export default class renderCity extends Component{

    render(){
        return (
            <Container>
            {this.props.locationUpdate.display_name &&
                <Card >
                <Card.Img variant="top" src={this.props.mappingCoord} />
                <Card.Body>
                    <Card.Title>City Name: {this.props.locationUpdate.display_name}</Card.Title>
                    <Card.Text>Latitude: {this.props.locationUpdate.lat}</Card.Text>
                    <Card.Text>Longitude: {this.props.locationUpdate.lon}</Card.Text>
                </Card.Body>
                </Card>
            }
                {this.props.testError&&
                <Card style={{width: '20 rem'}}>
                <Card.Body>
                    <Card.Title>ErRor</Card.Title>
                    <Card.Text>Please enter a Valid City</Card.Text>
                </Card.Body>
                </Card>
                }
            </Container>
        )
    }
}