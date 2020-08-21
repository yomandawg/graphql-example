import gql from 'graphql-tag';

export default gql`
  mutation DeleteLyric($id: ID!) {
    deleteLyric(id: $id) {
      id
    }
  }
`;
