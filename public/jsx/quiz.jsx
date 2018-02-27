import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap';
import $ from 'jquery';
import { Router, Route, browserHistory } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import SimpleLine, { SimplePie } from './graph'

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quiz: [],
      ans: {},
      count: 0
    }
    this.onClick = this.onClick.bind(this);
  }

  location() {
    browserHistory.push('/quiz')
  }

  componentDidMount() {
    $.get("/showQuiz", function (lists) {
      if (!lists) {
        console.log("nothing");
      } else {
        let quizs = this.state.quiz;
        $.each(lists, function (index, list) {
          quizs.push(list);
        });
        this.setState({ quiz: quizs });
      }
    }.bind(this));
  }

  onClick() {
    let answer = this.state.ans;
    let count = this.state.count;
    $.each(this.state.quiz, function (index, list) {
      if (answer[list._id] == list.answer) {
        count++;
      }
    })
    this.setState({ count: count });
  }

  onChange(index, event) {
    let answer = this.state.ans;
    answer[index] = event.target.value;
    this.setState({ ans: answer });
  }

  render() {
    const listItems = this.state.quiz.map((list, index) =>
      <ListGroupItem key={index} >
        <p> {list.question}</p>
        <input type="text" onChange={this.onChange.bind(this, list._id)} />
      </ListGroupItem>
    );
    return (
      <div className="wrapper">
        <h3>Name</h3>
        <input type="text" placeholder="Input Name" onChange={(e) => this.setState({ name: e.target.value })} />
        <ListGroup>
          {listItems}
        </ListGroup>
        <Link to="/quiz/graph">
          <ButtonToolbar>
            <Button onClick={this.onClick} bsStyle="success">Answer</Button>
          </ButtonToolbar>
        </Link>
        <Route path='/quiz/graph' render={props => <SimplePie name={this.state.name} result={this.state.count} all={this.state.quiz.length} />} />
      </div>
    );
  }
}



