import React, { Component } from 'react';
import { AuthForm } from '../components';
import { graphql, compose } from 'react-apollo';
import { CurrentUser } from '../queries';
import { Signup } from '../mutations';
import { hashHistory } from 'react-router';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  onSubmit({ email, password }) {
    this.props
      .signup({
        variables: { email, password },
        refetchQueries: [{ query: CurrentUser }]
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message);
        this.setState({ errors });
      });
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  render() {
    return (
      <div>
        <h3>Signup</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default compose(
  graphql(Signup, { name: 'signup' }),
  graphql(CurrentUser)
)(SignupForm);
