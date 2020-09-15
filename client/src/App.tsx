import React, { Component } from 'react';
import './App.css';

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
        {id:'e2',source:'n3',target:'n2',label:'SEES'},
        {id:'e3',source:'n4',target:'n2',label:'SEES'},
        {id:'e4',source:'n5',target:'n6',label:'SEES'}
      ]
    }
  };

  render () {
    const sigma = <Sigma graph = {this.state.exampleGraph}/>;
    return (
      <div className='App'>
        {sigma}
      </div>
    );
  }
}

export default App;
