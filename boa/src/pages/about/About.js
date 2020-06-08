import React from 'react'
import AuthorComponent from '../../components/author/Author';
import './About.css';

export default class AboutPage extends React.Component {
    render() {
        return (
            <div id="about-board">
                <h3>Hello Im in about</h3>
                <AuthorComponent name="Nuno" info={{description: 'boring bald dude', work:'Developer Wannabe'}} />
                <AuthorComponent name="Rafael" info={{description: 'just a dude', work:'Developer Wannabe'}} />
            </div>
        );
    }
}