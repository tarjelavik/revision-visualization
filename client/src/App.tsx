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
    },
    nodeData: null
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
    const url = `http://localhost:3000/api/graph/node/${id}`
    const response = await fetch(url);
    try {
      const nodeData = await response.json();
      this.setState({
        nodeData: nodeData
      });
    } catch (error) {
      // TODO: Handle this is a more elegant manner which lets end user know that something is wrong.
      console.log(error)
    }
  }

  render () {

  const appStyle = {
    display: "grid",
    grid: "auto auto auto"
  };

    const sigma = <Sigma graph={this.state.graph} getClickedNodeData={this.getClickedNodeData}/>;
    const form = <Form
      dropDownData={this.state.resourceTemplates}
      displayGraph={this.state.displayGraph}
      formValue={this.state.formData.value}
      handleFormData={this.handleFormData}
      setDisplayGraph={this.setDisplayGraph}/>;

    const databox = <Databox nodeData={this.state.nodeData}/>

    return (
      <div className='App'>
        <div style={appStyle}>
          {databox}
          {form}
          {this.state.displayGraph ? sigma : null}
        </div>
      </div>
    );
  }
}

export default App;
