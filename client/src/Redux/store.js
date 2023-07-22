import { createStore } from "redux";
import rootReducer from "./rootreducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistreducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistreducer);

const persistor = persistStore(store);

export default store;

export { persistor };


