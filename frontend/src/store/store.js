import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as authreducer } from "./Authreducer/reducer";
// import {reducer as appreducer} from "./Appreducer/reducer"

const rootReducer = combineReducers({
  authreducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };
