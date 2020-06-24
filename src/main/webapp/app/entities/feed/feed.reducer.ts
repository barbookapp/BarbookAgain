import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBottle, defaultValue } from 'app/shared/model/bottle.model';

export const ACTION_TYPES = {
  SEARCH_BOTTLES: 'bottle/SEARCH_BOTTLES',
  FETCH_BOTTLE_LIST: 'bottle/FETCH_BOTTLE_LIST',
  FETCH_BOTTLE: 'bottle/FETCH_BOTTLE',
  CREATE_BOTTLE: 'bottle/CREATE_BOTTLE',
  UPDATE_BOTTLE: 'bottle/UPDATE_BOTTLE',
  DELETE_BOTTLE: 'bottle/DELETE_BOTTLE',
  SET_BLOB: 'bottle/SET_BLOB',
  RESET: 'bottle/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBottle>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type BottleState = Readonly<typeof initialState>;

// Reducer

export default (state: BottleState = initialState, action): BottleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_BOTTLES):
    case REQUEST(ACTION_TYPES.FETCH_BOTTLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BOTTLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BOTTLE):
    case REQUEST(ACTION_TYPES.UPDATE_BOTTLE):
    case REQUEST(ACTION_TYPES.DELETE_BOTTLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_BOTTLES):
    case FAILURE(ACTION_TYPES.FETCH_BOTTLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BOTTLE):
    case FAILURE(ACTION_TYPES.CREATE_BOTTLE):
    case FAILURE(ACTION_TYPES.UPDATE_BOTTLE):
    case FAILURE(ACTION_TYPES.DELETE_BOTTLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_BOTTLES):
    case SUCCESS(ACTION_TYPES.FETCH_BOTTLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_BOTTLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BOTTLE):
    case SUCCESS(ACTION_TYPES.UPDATE_BOTTLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BOTTLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/bottles';
const apiSearchUrl = 'api/_search/bottles';

// Actions

export const getSearchEntities: ICrudSearchAction<IBottle> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_BOTTLES,
  payload: axios.get<IBottle>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<IBottle> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BOTTLE_LIST,
    payload: axios.get<IBottle>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IBottle> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BOTTLE,
    payload: axios.get<IBottle>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBottle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BOTTLE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBottle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BOTTLE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBottle> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BOTTLE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
