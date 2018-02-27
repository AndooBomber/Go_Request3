import React, { Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { browserHistory } from 'react-router';
import $ from 'jquery';

export default class SimpleBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: this.props.lists
    }
  }
  render() {
    const nameList = Array(this.state.lists.length);
    const dataBox = [];
    const dataList = () => {
      nameList.map((list, index) => {
        let obj = {
          name: `${this.state.lists[index]["name"]}`,
          correct: Math.floor(this.state.lists[index]["correct"]),
        }
        dataBox.push(obj)
      })
      return dataBox;
    }
    return (
      <main>
        <BarChart width={600} height={300} data={dataList()} style={{ margin: '3rem auto 2rem' }}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="correct" fill="#8884d8" />
        </BarChart>
      </main>
    )
  }
}
