import React, { Component } from 'react';
import './App.css';
import { Grid, Row, Col, Image, Carousel, Thumbnail, Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { Router, Route, IndexRoute, IndexLink, browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect, Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { createStore } from 'redux';
import AuthService from './AuthService'

const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);

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
              <IndexLink to="/">react-sandbox</IndexLink>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <LinkContainer to="/categories">
              <NavItem>Categories</NavItem>
            </LinkContainer>
            <LinkContainer to="/profile">
              <NavItem>Profile</NavItem>
            </LinkContainer>
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
        <Row style={{marginTop:30,marginBottom:30}}>
          <Col md={12}>
            <Carousel style={{maxWidth:800, margin:'auto'}}>
              <Carousel.Item>
                <Image src="http://placehold.it/800x300" thumbnail />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image src="http://placehold.it/800x300" thumbnail />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image src="http://placehold.it/800x300" thumbnail />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <Col xs={12} sm={6} md={4}>
          <Thumbnail src="http://placehold.it/242x200" alt="242x200">
            <h3>Thumbnail label</h3>
            <p>Description</p>
            <p>
              <Button bsStyle="primary">Button</Button>&nbsp;
              <Button bsStyle="default">Button</Button>
            </p>
          </Thumbnail>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Thumbnail src="http://placehold.it/242x200" alt="242x200">
            <h3>Thumbnail label</h3>
            <p>Description</p>
            <p>
              <Button bsStyle="primary">Button</Button>&nbsp;
              <Button bsStyle="default">Button</Button>
            </p>
          </Thumbnail>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Thumbnail src="http://placehold.it/242x200" alt="242x200">
            <h3>Thumbnail label</h3>
            <p>Description</p>
            <p>
              <Button bsStyle="primary">Button</Button>&nbsp;
              <Button bsStyle="default">Button</Button>
            </p>
          </Thumbnail>
        </Col>
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
        <Router history={browserHistory}>
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
