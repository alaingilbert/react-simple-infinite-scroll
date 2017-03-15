import React, { Component } from 'react';

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkWhenEnabled: false,
      scrollEnabled: true,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    if (this.props.immediateCheck) {
      this.handler();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({scrollEnabled: !nextProps.scrollDisabled}, () => {
      if (this.state.scrollEnabled && this.state.checkWhenEnabled) {
        this.setState({checkWhenEnabled: false}, () => {
          this.handler();
        })
      }
    });
  }

  handleScroll() {
    this.handler();
  }

  shouldScroll() {
    const windowBottom = window.innerHeight + window.scrollY;
    const elementBottom = this._elem.offsetTop + this._elem.offsetHeight;
    const remaining = elementBottom - windowBottom;
    const shouldScroll = remaining <= window.innerHeight * this.props.scrollDistance;
    return shouldScroll;
  }

  handler() {
    if (this.shouldScroll() && this.state.scrollEnabled) {
      this.props.callback().then(() => {
        this.handler();
      });
    } else if (this.shouldScroll()) {
      this.setState({checkWhenEnabled: true});
    }
  }

  render() {
    const { children } = this.props;
    const CustomTag = this.props.containerType;
    return <CustomTag ref={(elem) => { this._elem = elem; }}>{children}</CustomTag>;
  }
}

InfiniteScroll.defaultProps = {
  containerType: 'div',
  immediateCheck: true,
  scrollDistance: 0,
  scrollDisabled: false,
};