import React from 'react';
import { connect } from 'react-redux';
import Episode from './Episode';
import { fetchImdbData } from '../actions/imdb';

class Episodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonId: this.props.routeParams.seasonId
    };
  }
  componentDidMount() {
    this.props.fetchData(this.state.seasonId);
  }
  shouldComponentUpdate(nextProps) {
    return this.state.seasonId !== this.props.routeParams.seasonId || this.props.imdb !== nextProps.imdb;
  }
  componentWillUpdate() {
    if (this.state.seasonId !== this.props.routeParams.seasonId) {
      this.state.seasonId = this.props.routeParams.seasonId;
      this.props.fetchData(this.props.routeParams.seasonId);
    }
  }
  render() {
    const imdb = this.props.imdb.Episodes ? this.props.imdb : { Episodes: [] };
    return (
      <div>
        <h1>{imdb.Title} Season {imdb.Season}</h1>
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
  fetchData: seasonId => dispatch(fetchImdbData(seasonId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Episodes);
