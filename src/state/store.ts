import { createStore } from "redux";
import reducers from "./reducers";
import reducer from "./reducers/trainingReducer";

export const store = createStore(reducer);
