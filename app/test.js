import chai from 'chai';
// import enzyme from 'enzyme';
// import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import store from './store';
import { fetchImdbData } from './actions/imdb';

const window = {};

// chai.use(chaiEnzyme());
sinon.assert.expose(chai.assert, { prefix: '' });

describe('Episodes Componenent', () => {
  xit('dispatches fetchData thunk on componentDidMount', () => { });
  xit('dispatches fetchData thunk when mounted and seasonId react-router changes', () => { });
  xit('dispatches fetchData thunk when mounted and seasonId react-router changes', () => { });
  xit('renders a spinner when Redux store is in loading state', () => { });
  xit('renders an error message when Redux store is in error state', () => { });
  xit('renders a Reactable Table when Redux store received IMDB results', () => { });
});

describe('fetchData Thunk', () => {
  xit('creates a properly formed URL based on a valid Star Trek TNG season', () => { });
  it('uses fetch to dispatch an HTTP get request to the IMDB server', () => {
    window.fetch = (url) => true;
    const fetchStub = sinon.stub(window, 'fetch');
    store.dispatch(fetchImdbData(1));
    fetchStub.should.have.been.calledWith('http://www.omdbapi.com/?i=tt0092455&season=1&ref_=tt_eps_sn_1');
  });
  xit('dispatches imdbIsLoading to set store\'s loading state to true upon HTTP GET', () => { });
  xit('dispatches imdbIsLoading to set store\'s loading state to false upon successful response', () => { });
  xit('dispatches imdbIsLoading to set store\'s loading state to false and dispatches imdbHasErrored to set store\'s error state upon failed response', () => { });
  xit('dispatches receiveImdbData to store response in Redux store on sucess', () => { });
});
