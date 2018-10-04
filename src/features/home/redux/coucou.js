import { delay, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  HOME_COUCOU_BEGIN,
  HOME_COUCOU_SUCCESS,
  HOME_COUCOU_FAILURE,
  HOME_COUCOU_DISMISS_ERROR,
} from './constants';

export function coucou() {
  // If need to pass args to saga, pass it with the begin action.
  return {
    type: HOME_COUCOU_BEGIN,
  };
}

export function dismissCoucouError() {
  return {
    type: HOME_COUCOU_DISMISS_ERROR,
  };
}

// worker Saga: will be fired on HOME_COUCOU_BEGIN actions
export function* doCoucou() {
  // If necessary, use argument to receive the begin action with parameters.
  let res;
  try {
    // Do Ajax call or other async request here. delay(20) is just a placeholder.
    res = yield call(delay, 20);
  } catch (err) {
    yield put({
      type: HOME_COUCOU_FAILURE,
      data: { error: err },
    });
    return;
  }
  // Dispatch success action out of try/catch so that render errors are not catched.
  yield put({
    type: HOME_COUCOU_SUCCESS,
    data: res,
  });
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchCoucou() {
  yield takeLatest(HOME_COUCOU_BEGIN, doCoucou);
}

// Redux reducer
export function reducer(state, action) {
  switch (action.type) {
    case HOME_COUCOU_BEGIN:
      return {
        ...state,
        coucouPending: true,
        coucouError: null,
      };

    case HOME_COUCOU_SUCCESS:
      return {
        ...state,
        coucouPending: false,
        coucouError: null,
      };

    case HOME_COUCOU_FAILURE:
      return {
        ...state,
        coucouPending: false,
        coucouError: action.data.error,
      };

    case HOME_COUCOU_DISMISS_ERROR:
      return {
        ...state,
        coucouError: null,
      };

    default:
      return state;
  }
}
