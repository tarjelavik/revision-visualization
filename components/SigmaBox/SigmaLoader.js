import React from 'react';

export default class SigmaLoader extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {loaded: false};
  }

  componentDidMount() {
    this.onLoad(this.props.graph)
  }

  componentDidUpdate(props) {
    if(props.graph !== this.props.sigma.graph) {
      this.setState({loaded:false})
      this.onLoad(props.graph)
    }
  }

  embedProps(elements, extraProps) {
    return React.Children.map(elements, (element) => React.cloneElement(element, extraProps))
  }

  render() {
    if(!this.state.loaded) return null

    return <div>{ this.embedProps(this.props.children, {sigma: this.props.sigma}) }</div>
  }

  onLoad(graph) {
    if( graph && typeof(graph) != 'undefined' &&
        typeof(this.props.sigma) != 'undefined' ) {
      this.props.sigma.graph.clear();
      // console.log(graph)
      this.props.sigma.graph.read(graph);
      this.props.sigma.refresh();
    }
    this.setState({loaded:true})
  }
}
