import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { fetchSong, deleteLyric, likeLyric } from '../queries';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.likeLyric({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }

  onLyricDelete(id) {
    this.props.deleteLyric({
      variables: { id },
      refetchQueries: [
        { query: fetchSong, variables: { id: this.props.songId } }
      ]
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i
              className="material-icons"
              style={{ marginRight: '0.2em' }}
              onClick={() => this.onLike(id, likes)}
            >
              thumb_up
            </i>
            {likes}
            <i
              className="material-icons"
              style={{ marginLeft: '0.4em' }}
              onClick={() => this.onLyricDelete(id)}
            >
              delete
            </i>
          </div>
        </li>
      );
    });
  }

  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

export default compose(
  graphql(likeLyric, { name: 'likeLyric' }),
  graphql(deleteLyric, { name: 'deleteLyric' })
)(LyricList);
