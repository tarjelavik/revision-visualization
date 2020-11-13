import React, { Component } from 'react';
import {
  ThemeProvider,
  theme,
  CSSReset
} from '@chakra-ui/core';
import './App.css';

import Form from './Components/Form/Form';
import Sigma from './Components/Sigma/Sigma';
import Databox from './Components/DataBox/DataBox';

class App extends Component {
  state = {
    resourceTemplates: [{id: String, label: String}] as object[],
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
/*     formData: {
      value: ''
    }, */
    formData: [] as string[],
    nodeData: null,
    displayDrawer: false,
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

  setDisplayDrawer = (bool: boolean) => {
    this.setState({
      displayDrawer: bool
    });
  }

  handleFormData = async(data: any) => {
    const formValue = this.state.formData;
    formValue.push(data);
    this.setState({
      formData: {
        value: formValue
      }
    });
    this.postFormDataToServer();
  }

  postFormDataToServer = async() => {
    const data = encodeURIComponent(this.state.formData[0]);
    const url = `http://localhost:3000/api/form/${data}`;

   const response = await fetch(url);
   const responseData = await response.json();

   this.setState({
    graph: responseData
  });
  this.setDisplayGraph(true);
  console.log(this.state.graph);
  }

  getClickedNodeData = async(id: any) => {
    const url = `http://localhost:3000/api/graph/node/${id}`;
    const response = await fetch(url);
    try {
      const nodeData = await response.json();
      this.setState({
        nodeData: nodeData
      });
    } catch (error) {
      // TODO: Handle this is a more elegant manner which lets end user know that something is wrong.
      console.log(error);
    }
  }

  updateDropDownData = (id: any) => {
    const ddData = this.state.resourceTemplates;
    const filteredDD = ddData.filter((element: any) => element.id !== id)
    this.setState({
      resourceTemplates: filteredDD
    });
  }

  render () {

    const sigma = <Sigma
      graph={this.state.graph}
      getClickedNodeData={this.getClickedNodeData}
      setDisplayDrawer={this.setDisplayDrawer}/>;

      const form = <Form
      dropDownData={this.state.resourceTemplates}
      displayGraph={this.state.displayGraph}
      formValue={this.state.formData}
      handleFormData={this.handleFormData}
      setDisplayGraph={this.setDisplayGraph}
      updateDropDownData={this.updateDropDownData}/>;

    const databox = <Databox
      nodeData={this.state.nodeData}
      displayDrawer={this.state.displayDrawer}
      setDisplayDrawer={this.setDisplayDrawer}/>;

    return (

      <div className='App'>
        <ThemeProvider theme={theme}>
            <CSSReset />
            <div>
              {databox}
              {form}
              {this.state.displayGraph ? sigma : null}
            </div>
        </ThemeProvider>
      </div>

    );
  }
}

export default App;
