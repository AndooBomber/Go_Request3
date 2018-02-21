import React, { Component } from 'react';
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
);
