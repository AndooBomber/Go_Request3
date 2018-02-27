import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { Button, ButtonToolbar, Panel } from 'react-bootstrap';
import $ from 'jquery';
import Quiz from './quiz'
import SetQuiz from './setQuiz'

class Wrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    this.onClick = this.onClick.bind(this)
  }
  componentDidMount() {
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
      <div className="wrapper">
        <div>
          <Route exact path='/' component={SetQuiz} />
          <Route path='/quiz' component={Quiz} />
          <Route path='/button' render={props => <App detail={this.state} onClick={this.onClick} />} />
          <nav>
            <ul>
              <li><Link to="/">HOME</Link></li>
              <li><Link to='/quiz'>Quiz</Link></li>
              <li><Link to='/button'>Button</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props)
  }

  location() {
    browserHistory.push('/button')
  }

  render() {
    return (
      <div>
        <h1>{this.props.detail.count}</h1>
        <ButtonToolbar>
          <Button onClick={this.props.onClick} bsStyle="success">Count Up!</Button>
        </ButtonToolbar>
        <Panel>
          <Panel.Heading>{this.props.detail.name}</Panel.Heading>
          <Panel.Body>{this.props.detail.age}</Panel.Body>
        </Panel>
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Wrapper />
  </BrowserRouter>,
  document.getElementById("root")
);