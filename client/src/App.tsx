import React, { Component } from 'react';
import './App.css';

import Form from './Components/Form/Form';
import Sigma from './Components/Sigma/Sigma';

class App extends Component {
  state = {
    resourceTemplates: [],
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

    const rtResponse = await fetch('http://localhost:3000/api/resource_templates');
    const rtData = await rtResponse.json();
    this.setState({
      resourceTemplates: rtData
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

    console.log(this.state.formData.value)

    this.postFormDataToServer();
  }

  postFormDataToServer = async() => {
    const data = encodeURIComponent(this.state.formData.value);
    console.log(data)
    const url = `http://localhost:3000/api/form/${data}`;

   const response = await fetch(url);
   const responseData = await response.json();

   this.setState({
    graph: responseData
  });

  }

  render () {

  const appStyle = {

  };

    const sigma = <Sigma graph={this.state.graph} />;
    const form = <Form
      dropDownData={this.state.resourceTemplates}
      displayGraph={this.state.displayGraph}
      formValue={this.state.formData.value}
      handleFormData={this.handleFormData}
      setDisplayGraph={this.setDisplayGraph}/>;

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
