import React, { Component } from 'react';
import './normalize.css';
import './skeleton.css';
import './custom.css';
import burger from '../img/burger.png';
import cart from '../img/cart.png';
import close from '../img/close.png';
import './App.css';
import { Row, Col, Image, Carousel, Thumbnail, Button } from 'react-bootstrap';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import AuthService from './AuthService'

const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);

function increment() {
  return {
    type: 'INCREMENT'
  }
}

function showOverlay() {
  return {
    type: 'SHOW_OVERLAY'
  }
}

function hideOverlay() {
  return {
    type: 'HIDE_OVERLAY'
  }
}

function counterReducer(state = {counter: 0, showOverlay: false}, action) {
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, state, {counter: state.counter + 1});
    case 'SHOW_OVERLAY':
      return Object.assign({}, state, {showOverlay: true});
    case 'HIDE_OVERLAY':
      return Object.assign({}, state, {showOverlay: false});
    default:
      return state;
  }
}

let store = createStore(counterReducer);

class Teaser extends Component {
  render () {
    const callToAction = !this.props.small ? <button className="button">{this.props.callToAction}</button> : <a className="action-link">{this.props.callToAction}</a>;
    const subHeadline = this.props.small ? [] : <p className="sub-headline">{this.props.subHeadline}</p>;
    return (
      <div className={this.props.small ? 'teaser small-teaser' : 'teaser'}>
        <img src={this.props.src} role="presentation" className="teaser-image" />
          <p className="top-headline">{this.props.topHeadline}</p>
          <h2 className="big-headline">{this.props.bigHeadline}</h2>
        {subHeadline}
        {callToAction}
      </div>
    )
  }
}

const mapStateToPageProps = function (state) {
  return { overlayShown: state.showOverlay }
};

const mapDispatchToPageProps = function (dispatch) {
  return {
    hideOverlay: () => dispatch(hideOverlay()),
    showOverlay: () => dispatch(showOverlay())
  }
};

class Page extends Component {
  toggleOverlay() {
    if (this.props.overlayShown) {
      this.props.hideOverlay()
    } else {
      this.props.showOverlay()
    }
  }

  render() {
    const menuIcon = this.props.overlayShown ? close : burger;
    return (
      <div>
        <section className="header">
          <div className="container mobile-nav">
            <div className="row">
              <div className="twelve columns">
                <img className="menu-icon" src={menuIcon} alt="Toggle menu" onClick={this.toggleOverlay.bind(this)} />
                <span className="logo">DRINKLY</span>
                <img className="shopping-cart" src={cart} alt="Shopping cart" />
              </div>
            </div>
          </div>
          <div className="container desktop-nav">
            <div className="row">
              <div className="four columns">
                <span className="logo">DRINKLY</span>
              </div>
              <div className="four columns">
                <input type="text" className="search-field" placeholder="What are you looking for?" />
              </div>
              <div className="four columns">
                <img className="shopping-cart" src={cart} alt="Shopping cart" />
                <span className="login"><a href="#">LOG IN / SIGN UP</a></span>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          {this.props.children}
        </section>
        <OverlayContainer />
      </div>
    );
  }
}

const PageContainer = connect(
  mapStateToPageProps,
  mapDispatchToPageProps
)(Page);

const mapStateToProps = (state) => {
  return {
    counter: state.counter
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

const mapStateToOverlayProps = function (state) {
  return {
    show: state.showOverlay
  }
};

class Overlay extends Component {
  render () {
    return this.props.show ? (
      <div className="overlay">
        <input type="text" className="search-field" placeholder="What are you looking for?" /><br/>
        <span className="login"><a href="#">LOG IN / SIGN UP</a></span>
      </div>
    ) : null;
  }
}

const OverlayContainer = connect(
  mapStateToOverlayProps
)(Overlay)

class Categories extends Component {
  render() {
    return (
      <section className="content">
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <span className="mobile-dropdown-link left">SHOP</span>
              <span className="mobile-dropdown-link right">MAGAZINE</span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="seven columns">
              <Teaser small={false} src="http://www.placehold.it/539x438" topHeadline="More than a digestive"
                      bigHeadline="Enjoy our Selection of Finest Bitters"
                      subHeadline="Stock your bar with exclusive Bitters to be ready for your next coctail party."
                      callToAction="Shop now" />
            </div>
            <div className="five columns">
              <Teaser small={true} src="http://www.placehold.it/379x228" topHeadline="Edinburgh at night"
                      bigHeadline="Take a Walk on the Wild Side in Scotlands Beautiful Capital"
                      callToAction="Read our travel guide" />
              <Teaser small={true} src="http://www.placehold.it/379x228" topHeadline="Delicious"
                      bigHeadline="You Deserve Some Very Special Desserts"
                      callToAction="Read our recipes" />
            </div>
          </div>
        </div>
      </section>
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
          <Route path="/" component={PageContainer} auth={auth}>
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
