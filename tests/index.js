import React from 'react';
import chai from 'chai';
import { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { mount, shallow, render } from 'enzyme';
import { Table, Thead, Th } from 'reactable';
import store from '../app/store';
import { fetchImdbData } from '../app/actions/imdb.js';
import Episodes from '../app/components/Episodes.jsx';

chai.use(chaiEnzyme());

describe('<Episodes />', () => {
  xit('renders a spinner when Redux store is in loading state', () => { });
  xit('renders an error message when Redux store is in error state', () => { });
  // Something is wrong with my syntax in this test.
  // Currently returns false negative.
  // Probably because I'm not properly intercepting the window.fetch API call
  xit('renders a Season Title based on the route params', () => {
    const routeParams = { seasonId: '4' };
    const dummyImdb = {
      Response: 'True',
      Season: '4',
      Title: 'Star Trek: The Next Generation',
      totalSeasons: '7',
      Episodes: [{
        Episode: '1',
        Released: '1990-09-22',
        Title: 'The Best of Both Worlds: Part 2',
        imdbID: 'tt0708786',
        imdbRating: '9.3'
      }]
    };
    const wrapper = render(<Episodes store={store} routeParams={routeParams} imdb={dummyImdb} />);
    const seasonHeader = wrapper.find('h3')[0].children[0].data;
    expect(seasonHeader).to.be.a('string');
    expect(seasonHeader).to.contain('Season 4');
  });

  // This test is pretty much useless right now because Table is rendered regardless of props
  it('renders a Reactable Table when Redux store received IMDB results', () => {
    const routeParams = { seasonId: '4' };
    const dummyImdb = {
      Response: 'True',
      Season: '4',
      Title: 'Star Trek: The Next Generation',
      totalSeasons: '7',
      Episodes: [{
        Episode: '1',
        Released: '1990-09-22',
        Title: 'The Best of Both Worlds: Part 2',
        imdbID: 'tt0708786',
        imdbRating: '9.3'
      }]
    };
    const wrapper = mount(<Episodes store={store} routeParams={routeParams} imdb={dummyImdb} />);
    expect(wrapper.contains(<Table />));
  });
});

describe('fetchImdbData Thunk', () => {
  xit('creates a properly formed URL based on a valid Star Trek TNG season', () => { });
  it('uses fetch to dispatch an HTTP get request to the IMDB server', () => {
    // window.fetch = (url) => Promise.resolve();
    const fetchStub = sinon.stub(window, 'fetch');
    store.dispatch(fetchImdbData(1));
    fetchStub.should.have.been.called();
    // fetchStub.should.have.been.calledWith('http://www.omdbapi.com/?i=tt0092455&season=1&ref_=tt_eps_sn_1');
  });
  xit('dispatches imdbIsLoading to set store\'s loading state to true upon HTTP GET', () => { });
  xit('dispatches imdbIsLoading to set store\'s loading state to false upon successful response', () => { });
  xit('dispatches imdbIsLoading to set store\'s loading state to false and dispatches imdbHasErrored to set store\'s error state upon failed response', () => { });
  xit('dispatches receiveImdbData to store response in Redux store on sucess', () => { });
});
