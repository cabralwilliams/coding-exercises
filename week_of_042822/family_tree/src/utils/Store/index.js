import { configureStore } from '@reduxjs/toolkit';
//Import the reducer from ./reducer.js
import { reducer } from './reducer';

const initialState = {
    currentPerson: null,
    createdPeople: []
}

const store = configureStore({
    reducer: reducer,
    preloadedState: initialState
});

export default store;