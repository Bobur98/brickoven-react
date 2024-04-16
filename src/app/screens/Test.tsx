// @ts-nocheck
import React, { Component } from 'react';

class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: 'Ford',
      model: 'Mustang',
      color: 'red',
      year: 1964,
    };
  }

  changeDetail = () => {
    this.setState = {
      brand: 'blue',
      model: 'Tesla',
      color: 'Model S',
      year: '2024',
    };
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log('ComponentDidMount');
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    console.log('ComponentDidUpdate');
  }

  componentWillUnmount(): void {
    console.log('ComponentWillUnmount');
  }

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Color: {this.state.color} - Model: {this.state.model}
          from {this.state.year}.
        </p>
      </div>
    );
  }
}
