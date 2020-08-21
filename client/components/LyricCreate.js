import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { createLyric, fetchSong } from '../queries';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.createLyric({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    });

    this.setState({ content: '' });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

export default compose(
  graphql(createLyric, { name: 'createLyric' }),
  graphql(fetchSong, {
    options: (props) => {
      return {
        variables: {
          id: props.songId
        }
      };
    }
  })
)(LyricCreate);
