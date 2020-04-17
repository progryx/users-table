import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import { mainReducer } from "./main-reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootSaga } from "./sagas/root-saga";

type RootReducerType = typeof rootReducer
export type RootState = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never

export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  mainPage: mainReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSaga)
