import React, { Component } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { browserHistory, Link, Router, Route } from 'react-router';
import { Button, ButtonToolbar, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import $ from 'jquery';
import SimpleBar from './simplebar';

export default class SimpleLine extends Component {
  constructor(props) {
    super(props);
  }

  location() {
    browserHistory.push('/');
  }

  render() {
    const nameList = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const dataBox = [];
    const dataList = () => {
      nameList.map(name => {
        let obj = {
          name: `Page ${name}`,
          uv: Math.floor(Math.random() * 9999),
          pv: Math.floor(Math.random() * 9999),
          amt: Math.floor(Math.random() * 9999)
        }
        dataBox.push(obj);
      })
      return dataBox;
    }

    return (
      <main>
        <LineChart width={600} height={300} data={dataList()} style={{ margin: '3rem auto 2rem' }}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          <Line type="monotone" dataKey="amt" stroke="#ffa500" />
        </LineChart>
      </main >
    )
  }
}

export class SimplePie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      datas: [
        { name: "正解", value: this.props.result },
        { name: "不正解", value: (this.props.all - this.props.result) }
      ],
      addname: "",
      names: [
      ],
      lists: [],
      show: false
    }
    this.onClick1 = this.onClick1.bind(this)
    this.onClick2 = this.onClick2.bind(this)
  }

  location() {
    browserHistory.push('/quiz/graph');
  }

  onClick1() {
    let correct = this.props.result;
    let all = this.props.all;
    let name = this.state.name;
    $.post('/sendResult', {
      Name: name,
      Correct: correct,
      All: all
    }, function (bool) {
      console.log(bool);
    });
  }

  onClick2() {
    let Namess = this.state.names;
    let add = this.state.addname;
    Namess.push(add);
    this.setState({
      Names: Namess
    });
    let Names = Namess.join('+');
    console.log(Names);
    let lists = this.state.lists;
    $.post('/showPerson', {
      Names: Names,
      Number: this.props.all
    }, function (personlists) {
      $.each(personlists, function (index, list) {
        lists.push(list);
      });
    });
    this.setState({
      lists: lists,
      show: true
    });
    return false;
  }

  render() {
    const colors = [
      "#8884d8", "#ffa500"
    ];
    return (
      <div>
        <PieChart width={730} height={250} style={{ margin: '3rem auto 2rem' }}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <Tooltip />
          <Legend />
          <Pie data={this.state.datas} dataKey="value" nameKey="name" cx="50%" cy="50%">
            {this.state.datas.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
        <ButtonToolbar>
          <Button onClick={this.onClick1} bsStyle="success">Send this result!</Button>
        </ButtonToolbar>
        <Form>
          <FormGroup controlId="formHorizontalAddAccount">
            <Col componentClass={ControlLabel} sm={2}>
              Add Account
            </Col>
            <Col sm={10}>
              <FormControl name="addaccount" type="text" placeholder="AddAccount" onChange={(e) => this.setState({ addname: e.target.value })} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="button" onClick={this.onClick2}>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
        {this.state.show ? <SimpleBar lists={this.state.lists} /> : null}
      </div>
    );
  }
}