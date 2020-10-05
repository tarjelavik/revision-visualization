import React, { Component } from 'react';
import './App.css';

import Form from './Components/Form/Form';
import Sigma from './Components/Sigma/Sigma';

class App extends Component {
  state = {
    displayGraph: false,
    graph: {
        nodes:[ {
          id: '',
          label: ''
        }],
        edges:[ {
          id: '',
          source: '',
          target: '',
          label: ''
        }]
      },
    formData: {
      value: ''
    }
  };

  async componentDidMount() {
    const url = 'http://localhost:3000/api/fetch';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      graph: data
    });
  }

  setDisplayGraph = (bool: boolean) => {
    this.setState({
      displayGraph: bool
    });
  }

  handleFormData = async(data: any) => {
    let formValue = this.state.formData;
    formValue.value = await data;
    this.setState({
      formData: {
        value: formValue.value
      }
    });
    console.log(this.state.formData)
  }

  render () {

  const appStyle = {

  };

    const sigma = <Sigma graph={this.state.graph} />;
    const form = <Form displayGraph={this.state.displayGraph} handleFormData={this.handleFormData} setDisplayGraph={this.setDisplayGraph}/>;

    return (
      <div className='App'>
        <div style={appStyle}>
          {form}
          {this.state.displayGraph ? sigma : null}
        </div>
      </div>
    );
  }
}

export default App;
