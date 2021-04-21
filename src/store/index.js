import { routerReducer } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import vignettes from './vignettes'
import user from './user'
import auth from './auth'

const reducers = {
  auth,
  vignettes,
  user,
}

let helpers;
const middlewares = [thunk]

if(window.__REDUX_DEVTOOLS_EXTENSION__)
  helpers = compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
else
  helpers = compose(
    applyMiddleware(...middlewares)
  )

export default createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),  
  helpers
  
)