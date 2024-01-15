import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import { composeWithDevTools } from 'redux-devtools-extension'

export default configureStore({
    reducer: {
        counter: counterReducer
    }
}, composeWithDevTools())