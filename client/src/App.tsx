import React, { Component } from 'react';
import './App.css';

import Form from './Components/Form/Form';
import Sigma from './Components/Sigma/Sigma';
import Databox from './Components/DataBox/DataBox';

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
    this.postFormDataToServer();
  }

  postFormDataToServer = async() => {

    const data = encodeURIComponent(this.state.formData.value);
    const url = `http://localhost:3000/api/form/${data}`;

   const response = await fetch(url);
   const responseData = await response.json();

   this.setState({
    graph: responseData
  });
  }

  getClickedNodeData = async(id: any) => {

    // TODO: Make a request to the server. The server then makes a request to the Birgitta API and returns the data.

    const url = `https://birgitta.test.uib.no/api/items/${id}`
    const options = {
      headers: {
          "Access-Control-Allow-Origin": "http://localhost:1234",
          "Access-Control-Allow-Methods": "GET",
          "Content-Type": 'application/json'
      }
  };
    const nodeData = await fetch(url, options)
    console.log(nodeData)


  }

  render () {

  const appStyle = {

  };

    const sigma = <Sigma graph={this.state.graph} getClickedNodeData={this.getClickedNodeData}/>;
    const form = <Form
      dropDownData={this.state.resourceTemplates}
      displayGraph={this.state.displayGraph}
      formValue={this.state.formData.value}
      handleFormData={this.handleFormData}
      setDisplayGraph={this.setDisplayGraph}/>;

    const databox = <Databox />

    return (
      <div className='App'>
        <div style={appStyle}>
          {form}
          {this.state.displayGraph ? sigma : null}
        </div>
        {databox}
      </div>
    );
  }
}

export default App;
