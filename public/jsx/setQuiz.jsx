import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import $ from 'jquery';
import { browserHistory } from 'react-router';


export default class SetQuiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Question: "",
      Answer: ""
    }
    this.onClick = this.onClick.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  location() {
    browserHistory.push('/')
  }

  onClick() {
    let question = this.state.Question;
    let answer = this.state.Answer;
    if (question != "" && answer != "") {
      $.post("/addQuiz", {
        Question: question,
        Answer: answer
      }, function (bool) {
        console.log(bool);
        return false;
      });
    }
  }

  onChange(event) {
    let question = this.state.Question;
    let answer = this.state.Answer;

    switch (event.target.name) {
      case "question":
        question = event.target.value;
        this.setState({ Question: question });
        console.log(this.state.Question);
        break;
      case "answer":
        answer = event.target.value;
        this.setState({ Answer: answer });
        console.log(this.state.Answer);
        break;
    }
  }

  render() {
    return (
      <div>
        <Form horizontal>
          <FormGroup controlId="formHorizontalQuestion">
            <Col componentClass={ControlLabel} sm={2}>
              Question
            </Col>
            <Col sm={10}>
              <FormControl name="question" type="text" placeholder="Question" onChange={this.onChange} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalAnswer">
            <Col componentClass={ControlLabel} sm={2}>
              Answer
            </Col>
            <Col sm={10}>
              <FormControl name="answer" type="text" placeholder="Answer" onChange={this.onChange} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="button" onClick={this.onClick}>Submit</Button>
            </Col>
          </FormGroup>
        </Form>;
      </div>
    );
  }
}