import React from 'react';
import logo from '../../assets/boa.png';
import './Home.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br/>
          <p className="parag">
            Bem-vindos à Biblioteca de Álbuns BOA!!
        </p>
       
        </header>
      </div>
    );
  }
}

