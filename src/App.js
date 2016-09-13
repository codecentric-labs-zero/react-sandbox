import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">react-sandbox</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey="{1}" href="#">Categories</NavItem>
          <NavItem eventKey="{2}" href="#">Profile</NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default App;
