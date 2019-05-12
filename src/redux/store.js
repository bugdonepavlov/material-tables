import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const initialState = {};

export const store = createStore(
  rootReducer(),
  initialState,
  applyMiddleware(createLogger(), thunk),
);

// export default store;
