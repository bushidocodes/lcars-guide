import React from 'react';
import { connect } from 'react-redux';
import Episode from './Episode';
import { fetchImdbData } from '../actions/imdb';

class Episodes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    let imdb = this.props.imdb.Episodes ? this.props.imdb : { Episodes: [] };
    console.log('Episode state is: ', this.state);
    return (
      <div>
        <h1>{imdb.Title}</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date Released</th>
              <th>Episode</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {imdb.Episodes.map(episode => <Episode key={episode.imdbID} data={episode} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  imdb: state.imdb,
  hasErrored: state.imdbHasErrored,
  isLoading: state.imdbIsLoading
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchImdbData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Episodes);
