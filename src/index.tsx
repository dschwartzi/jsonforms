import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { combineReducers, createStore, Reducer, AnyAction } from "redux";
import { Provider } from "react-redux";
import schema from "./schema.json";
import uischema from "./uischema.json";
import {
  getData,
  Actions,
  jsonformsReducer,
  JsonFormsState
} from "@jsonforms/core";
import {
  materialCells,
  materialRenderers
} from "@jsonforms/material-renderers";
import RatingControl from "./RatingControl";
import ratingControlTester from "./ratingControlTester";
import RadioControl from "./RadioControl";
import radioControlTester from "./radioControlTester";

import data from "./BoundedData.json";
import MyGroupRenderer, { myGroupTester } from "./MyBand";
import AJV from "ajv";
const initState: JsonFormsState = {
  jsonforms: {
    cells: materialCells,
    renderers: materialRenderers
  }
};

const rootReducer: Reducer<JsonFormsState, AnyAction> = combineReducers({
  jsonforms: jsonformsReducer()
});
const store = createStore(rootReducer, initState);

const ajv = new AJV({
  schemaId: "auto",
  allErrors: true,
  jsonPointers: true,
  errorDataPath: "property",
  verbose: true
});
ajv.addFormat("date", "^[0-3]\\d\\s[a-zA-Z]{3}\\s\\d{4}$");
ajv.addMetaSchema(schema);
store.dispatch(Actions.update("dob", () => {}));
store.dispatch(Actions.init(data, schema, uischema, ajv));
store.dispatch(Actions.registerRenderer(ratingControlTester, RatingControl));
store.dispatch(Actions.registerRenderer(radioControlTester, RadioControl));
console.log(store.getState().jsonforms.core.data);

store.dispatch(Actions.registerRenderer(myGroupTester, MyGroupRenderer));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
