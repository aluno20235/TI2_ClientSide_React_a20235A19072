import React from 'react';
import { Card } from 'react-bootstrap';
import photocartoon from '../../assets/photocartoon.jpg';

export default class AuthorComponent extends React.Component {
    render() {
        return (
            <Card style={{ width: '10rem' }}>
                <Card.Img variant="top" src={photocartoon} />
                <Card.Body>
                    <Card.Title >{this.props.name}</Card.Title>
                    <Card.Subtitle className="mb 2 text muted">
                        {this.props.info.work}
                    </Card.Subtitle>
                    <Card.Text>
                        {this.props.info.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}