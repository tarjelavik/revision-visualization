import React, { Component } from 'react';
import './App.css';

import Form from './Components/Form/Form';
import Sigma from './Components/Sigma/Sigma';

class App extends Component {
  state = {
    exampleGraph: {
      nodes:[
        {id:'n1', label:'Alice Rade'},
        {id:'n2', label:'Syon Abbey'},
        {id:'n3', label: 'Alys Hastyngs'},
        {id:'n4', label: 'Elizabeth Edward'},
        {id:'n5', label: 'James Grenehalgh'},
        {id:'n6', label: 'Sheen Charterhouse'}
      ],
      edges:[
        {id:'e1',source:'n1',target:'n2',label:'SEES'},
        {id:'e2',source:'n3',target:'n2',label:'Label?'},
        {id:'e3',source:'n4',target:'n2',label:'SEES'},
        {id:'e4',source:'n5',target:'n6',label:'SEES'}
      ]
    },
    displayGraph: false
  };


  setDisplayGraph = (bool: boolean) => {
    this.setState({
      displayGraph: bool
    });
  }


  render () {
    const sigma = <Sigma graph = {this.state.exampleGraph}/>;
    const form = <Form props = {this.setDisplayGraph}/>;
    return (
      <div className='App'>
        <div>
          {form}
          {this.state.displayGraph ? sigma : null}
        </div>
      </div>
    );
  }
}

export default App;
