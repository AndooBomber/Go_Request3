{/*import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, ButtonToolbar, Panel } from 'react-bootstrap';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    };
  }

  onClick() {
    this.setState({
      count: this.state.count + 1
    });
    $.get("/getUser", function (list) {
      if (!list) {
        console.log("nothing");
      } else {
        console.log(list);
        this.setState({
          name: list.name,
          age: list.age
        });
      }
    }.bind(this));
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <ButtonToolbar>
          <Button onClick={this.onClick.bind(this)} bsStyle="success">Count Up!</Button>
        </ButtonToolbar>
        <Panel>
          <Panel.Heading>{this.state.name}</Panel.Heading>
          <Panel.Body>{this.state.age}</Panel.Body>
        </Panel>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);*/}

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom'

class Wrapper extends Component {
  render() {
    let { children } = this.props;
    return (
      <div className="wrapper">
        <header>
          {children}
        </header>
        <nav>
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/a">Page A</Link></li>
            <li><Link to="/b">Page B</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <h1>App</h1>
    );
  }
}

class PageA extends Component {
  render() {
    return (
      <h1>PageA</h1>
    );
  }
}

class PageB extends Component {
  render() {
    return (
      <h1>PageB</h1>
    );
  }
}

render((
  <BrowserRouter>
    <div>
      <Route path='/' component={Wrapper}>
        <Route path='/' component={App} />
        <Route path='/a' component={PageA} />
        <Route path='/b' component={PageB} />
      </Route>
    </div>
  </BrowserRouter>
), document.getElementById("root"));

