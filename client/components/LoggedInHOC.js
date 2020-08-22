import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { CurrentUser } from '../queries';
import { hashHistory } from 'react-router';

export default (WrappedComonent) => {
  class LoggedIn extends Component {
    componentWillMount() {
      if (this.props.data.user) {
        hashHistory.push('/dashboard');
      }
    }

    render() {
      return <WrappedComonent {...this.props} />;
    }
  }

  return graphql(CurrentUser)(LoggedIn);
};
