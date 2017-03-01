import React from 'react';
import { connect } from 'react-redux';
import { Table, Thead, Th } from 'reactable';
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
    return this.state.seasonId !== this.props.routeParams.seasonId || this.props !== nextProps;
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
      <div >
        {
          this.props.hasErrored ?
            <div>
              <h1 style={{ textAlign: 'center', color: 'red' }}>RED ALERT</h1>
              <h4 style={{ textAlign: 'center', color: 'red' }}>ERROR DETECTED</h4>
            </div>
            :
            <div>
              <h3>Season {imdb.Season}</h3>
              <Table className="table" data={imdb.Episodes} sortable filterable={['Title']} style={{ width: '100%', marginLeft: '10px' }} >
                <Thead>
                  <Th column="Title" style={{ width: '75%' }} ><h4>Title</h4></Th>
                  <Th column="imdbRating" style={{ width: '25%', textAlign: 'center' }} ><h4>Rating</h4></Th>
                </Thead>
              </Table>
            </div >
        }
      </div >
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
