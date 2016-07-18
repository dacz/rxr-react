import { Component, PropTypes, Children } from 'react';

export default class Provider extends Component {

  static propTypes = {
    state$:   PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    state$: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state$ = props.state$;
  }

  getChildContext() {
    return { state$: this.state$ };
  }

  render() {
    return Children.only(this.props.children);
  }
}
