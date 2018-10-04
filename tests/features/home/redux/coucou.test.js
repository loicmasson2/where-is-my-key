import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_COUCOU_BEGIN,
  HOME_COUCOU_SUCCESS,
  HOME_COUCOU_FAILURE,
  HOME_COUCOU_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  coucou,
  dismissCoucouError,
  doCoucou,
  reducer,
} from 'src/features/home/redux/coucou';

describe('home/redux/coucou', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by coucou', () => {
    expect(coucou()).to.have.property('type', HOME_COUCOU_BEGIN);
  });

  it('returns correct action by dismissCoucouError', () => {
    expect(dismissCoucouError()).to.have.property('type', HOME_COUCOU_DISMISS_ERROR);
  });

  // saga tests
  const generator = doCoucou();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches HOME_COUCOU_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: HOME_COUCOU_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches HOME_COUCOU_FAILURE action when failed', () => {
    const generatorForError = doCoucou();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: HOME_COUCOU_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type HOME_COUCOU_BEGIN correctly', () => {
    const prevState = { coucouPending: false };
    const state = reducer(
      prevState,
      { type: HOME_COUCOU_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.coucouPending).to.be.true;
  });

  it('handles action type HOME_COUCOU_SUCCESS correctly', () => {
    const prevState = { coucouPending: true };
    const state = reducer(
      prevState,
      { type: HOME_COUCOU_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.coucouPending).to.be.false;
  });

  it('handles action type HOME_COUCOU_FAILURE correctly', () => {
    const prevState = { coucouPending: true };
    const state = reducer(
      prevState,
      { type: HOME_COUCOU_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.coucouPending).to.be.false;
    expect(state.coucouError).to.exist;
  });

  it('handles action type HOME_COUCOU_DISMISS_ERROR correctly', () => {
    const prevState = { coucouError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_COUCOU_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.coucouError).to.be.null;
  });
});