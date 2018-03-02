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
