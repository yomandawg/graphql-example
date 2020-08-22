import gql from 'graphql-tag';

export default gql`
  mutation LogOut {
    logout {
      id
      email
    }
  }
`;
