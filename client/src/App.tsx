import React, { Component } from 'react';

import { getInitialGraphState } from './helpers';
import { config } from './config';

import Header from './Components/Header/Header';
import IllustrationContainer from './Components/IllustrationContainer/IllustrationContainer';
import Form from './Components/Form/Form';
import Spinner from './Components/Spinner/Spinner';
import Sigma from './Components/Sigma/Sigma';
import DataDrawer from './Components/DataDrawer/DataDrawer';
import ControlBox from './Components/ControlBox/ControlBox';

class App extends Component {
  state = {
    resourceTemplates: [{id: String, label: String}] as object[],
    isLoading: false,
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
    formData: [] as string[],
    selectedClasses: [] as string[],
    nodeData: null,
    displayDrawer: false,
    appURL: ''
  };

  async componentDidMount() {
    await this.setURL();
    const rtResponse = await fetch(`${this.state.appURL}api/resource_templates`);
    const rtData = await rtResponse.json();
    this.setState({
      resourceTemplates: rtData
    });
  }

  setURL = async() => {
    let url = this.state.appURL;
    if (process.env.NODE_ENV === 'development') {
      url = config.development_url
    } else {
      url = config.production_url
    }
    this.setState({
      appURL: url
    })
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

  toggleIsLoading = (isLoading: boolean) => {
    let currentStatus = this.state.isLoading;
    currentStatus = isLoading;
    this.setState({
      isLoading: currentStatus
    });
  }

  postFormDataToServer = async() => {
    this.toggleIsLoading(true);
    const data = encodeURIComponent(this.state.formData[0]);
    const url = `${this.state.appURL}api/form/${data}`;

   const response = await fetch(url);
   const responseData = await response.json();

   this.setState({
    graph: responseData
  });
  this.toggleIsLoading(false);
  this.setDisplayGraph(true);
  }

  getClickedNodeData = async(id: any) => {
    const url = `${this.state.appURL}api/graph/node/${id}`;
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

  // Pure helper function - should be refactored out of this class.
  getResourceTemplateId = (selectedClass: string) => {
    switch (selectedClass) {
        case 'Person':
            return 'https://birgitta.test.uib.no/api/resource_templates/13';
        case 'Place':
            return 'https://birgitta.test.uib.no/api/resource_templates/14';
        case 'Location in Time':
          return 'https://birgitta.test.uib.no/api/resource_templates/15';
        case 'Book Object':
            return 'https://birgitta.test.uib.no/api/resource_templates/16';
        case 'Institution':
            return 'https://birgitta.test.uib.no/api/resource_templates/17';
        case 'Work Item':
          return 'https://birgitta.test.uib.no/api/resource_templates/18';
        case 'Work':
          return 'https://birgitta.test.uib.no/api/resource_templates/19';
        case 'Non Book Object':
          return 'https://birgitta.test.uib.no/api/resource_templates/20';
        case 'Action':
          return 'https://birgitta.test.uib.no/api/resource_templates/21';
        case 'Data Source':
          return 'https://birgitta.test.uib.no/api/resource_templates/22';
        default:
          return '0';
    }
};

  addSelectedClass = (selectedClass: string) => {
    const existingClasses = this.state.selectedClasses;
    existingClasses.push(selectedClass);
    this.setState({
      selectedClasses: existingClasses
    });
  }

  removeSelectedClasses = (clickedClass: string) => {
    const clickedClasses = this.state.selectedClasses;
    const indexToRemove = clickedClasses.indexOf(this.getResourceTemplateId(clickedClass));
    clickedClasses.splice(indexToRemove);
    this.setState({
      selectedClasses: clickedClasses
    });
  }

  removeFromDropDownData = (id: any) => {
    const ddData = this.state.resourceTemplates;
    const filteredDD = ddData.filter((element: any) => element.id !== id)
    this.setState({
      resourceTemplates: filteredDD
    });
  }

  addToDropDownData = (id: any) => {
    const ddData = this.state.resourceTemplates;
    ddData.push({id:this.getResourceTemplateId(id), label: id})
    this.setState({
      resourceTemplates: ddData
    });
  }

  resetGraphState = () => {
    const initialState = getInitialGraphState();
    this.setState(initialState);
  }

  render () {

    const header = <Header displayGraph={this.state.displayGraph} isLoading={this.state.isLoading}/>;
    const frontIllustration = <IllustrationContainer displayGraph={this.state.displayGraph} isLoading={this.state.isLoading} src='Build.png' alt="Computer image" heigth="400px" width="400px"/>;
    const spinner = <Spinner isLoading={this.state.isLoading}/>;
    const sigma = <Sigma
      graph={this.state.graph}
      getClickedNodeData={this.getClickedNodeData}
      setDisplayDrawer={this.setDisplayDrawer}/>;

      const form = <Form
      dropDownData={this.state.resourceTemplates}
      displayGraph={this.state.displayGraph}
      formValue={this.state.formData}
      selectedClasses={this.state.selectedClasses}
      isLoading={this.state.isLoading}
      handleFormData={this.handleFormData}
      setDisplayGraph={this.setDisplayGraph}
      addSelectedClass={this.addSelectedClass}
      removeSelectedClass={this.removeSelectedClasses}
      removeFromDropDownData={this.removeFromDropDownData}
      addToDropDownData={this.addToDropDownData}/>;

    const dataDrawer = <DataDrawer
      nodeData={this.state.nodeData}
      displayDrawer={this.state.displayDrawer}
      setDisplayDrawer={this.setDisplayDrawer}/>;

    const controlBox = <ControlBox setDisplayGraph={this.setDisplayGraph} resetGraph={this.resetGraphState} displayGraph={this.state.displayGraph}/>
    console.log(this.state.formData)
    console.log(this.state.selectedClasses)
    console.log(this.state.graph)
    return (
      <div className='App'>
        {header}
        {controlBox}
        {dataDrawer}
        {form}
        {spinner}
        {this.state.displayGraph ? sigma : null}
        {frontIllustration}
      </div>
    );
  }
}

export default App;
