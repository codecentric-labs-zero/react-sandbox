import React, { Component } from 'react';
import './App.css';
import { Grid, Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import { connect, Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { createStore } from 'redux';
import AuthService from './AuthService'

const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);

console.log(process.env.REACT_APP_AUTH0_CLIENT_ID);
console.log(process.env.REACT_APP_AUTH0_DOMAIN);

function increment() {
  return {
    type: 'INCREMENT'
  }
}

function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
}

let store = createStore(counterReducer);


class Page extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">react-sandbox</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem><Link to="/categories">Categories</Link></NavItem>
            <NavItem><Link to="/profile">Profile</Link></NavItem>
          </Nav>
        </Navbar>
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(increment());
    }
  }
};

class Home extends Component {
  render() {
    return (
      <div>
        <p>Home</p>
        <p>{this.props.counter}</p>
        <Button bsSize="large" onClick={this.props.onClick}>Increment counter</Button>
      </div>
    )
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

class Categories extends Component {
  render() {
    return (
      <p>Categories</p>
    )
  }
}

class Profile extends Component {
  render() {
    return (
      <p>Profile</p>
    )
  }
}

class Login extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <p>Login</p>
        <Button bsStyle="primary" onClick={auth.login}>Login</Button>
      </div>
    )
  }
}

class App extends Component {
  requireAuth = (nextState, replace) => {
   if (!auth.loggedIn()) {
     replace({ pathname: '/login' })
   }
  };

  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={Page} auth={auth}>
            <IndexRoute component={HomeContainer}/>
            <Route path="categories" component={Categories} />
            <Route path="profile" component={Profile} onEnter={this.requireAuth} />
            <Route path="login" component={Login} />
          </Route>
        </Router>
      </Provider>
    )
  }
}

export default App;
