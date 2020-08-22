import React, { Component } from 'react';
import { AuthForm } from '../components';
import { graphql, compose } from 'react-apollo';
import { CurrentUser } from '../queries';
import { Login } from '../mutations';
import { hashHistory } from 'react-router';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  onSubmit({ email, password }) {
    this.props
      .login({
        variables: { email, password },
        refetchQueries: [{ query: CurrentUser }]
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message);
        this.setState({ errors });
      });
  }

  componentWillUpdate(nextProps) {
    // this.props === the old, current set of props
    // nextProps === the next set of props that will be in place

    if (!this.props.data.user && nextProps.data.user) {
      // redirect to dashboard
      hashHistory.push('/dashboard');
    }
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this) /* pass function as a prop */}
        />
      </div>
    );
  }
}

export default compose(
  graphql(Login, { name: 'login' }),
  graphql(CurrentUser)
)(LoginForm);
