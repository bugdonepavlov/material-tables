import { handleActions, createActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { sleep } from 'utils';
import data from 'lib/mock.json';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const actions = createActions(
  'FETCH_DATA_TABLE_REQUEST',
  'FETCH_DATA_TABLE_SUCCESS',
  'FETCH_DATA_TABLE_FAILURE',

  'CREATE_USER_REQUEST',
  'CREATE_USER_SUCCESS',
  'CREATE_USER_FAILURE',
);

const effects = {
  fetchDataTable: () => async dispatch => {
    try {
      dispatch(actions.fetchDataTableRequest());
      await sleep(300);
      dispatch(actions.fetchDataTableSuccess(data));
    } catch (error) {
      dispatch(actions.fetchDataTableFailure(error.message));
    }
  },
  createUser: (payload, actionsForm, handleClose) => async dispatch => {
    try {
      dispatch(actions.createUserRequest());
      await sleep(300);

      handleClose(false);
      actionsForm.setSubmitting(false);
      dispatch(actions.createUserSuccess(payload));
    } catch (error) {
      const errors = {
        name: 'Error',
        lastname: 'Error',
      };

      dispatch(actions.createUserFailure());
      actionsForm.setErrors({ ...errors });
      actionsForm.setSubmitting(false);
    }
  },
};

const reducer = handleActions(
  {
    [actions.fetchDataTableRequest]: state => ({
      ...state,
      loading: true,
    }),
    [actions.fetchDataTableSuccess]: (state, { payload }) => ({
      ...state,
      data: payload,
      loading: false,
    }),
    [actions.fetchDataTableFailure]: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false,
    }),

    [actions.createUserRequest]: state => ({
      ...state,
      loading: true,
    }),
    [actions.createUserSuccess]: (state, { payload }) => ({
      ...state,
      data: [...state.data, payload],
      loading: false,
    }),
    [actions.createUserFailure]: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false,
    }),
  },
  initialState,
);

const getState = state => state.main;

const cs = cb =>
  createSelector(
    [getState],
    cb,
  );

const selectors = {
  getMainData: cs(s => s.data),
  getManagementData: cs(s => s.data.filter(e => e.category === 'management')),
  getHumanData: cs(s => s.data.filter(e => e.category === 'human resources')),
  getAccountingData: cs(s => s.data.filter(e => e.category === 'accounting')),
  getNavigation: cs(s => {
    const nav = s.data.reduce((acc, current) => {
      return acc.indexOf(current.category) === -1 && !!current.category.length
        ? [...acc, current.category]
        : acc;
    }, []);

    return ['all', ...nav.sort(), ''];
  }),
  getEmptyCategoryData: cs(s => s.data.filter(e => !e.category)),
  getLoading: cs(s => s.loading),
  getErrors: cs(s => s.error),
};

export { initialState as state, actions, effects, reducer, selectors };
