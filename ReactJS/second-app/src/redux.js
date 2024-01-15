const redux = require('redux')

// 1. Create a basic Reducer
const rootReducer = (currentState = 0, action) => {
    // return currentState
    switch (action.type) {
        case "INCREMENT":
            return currentState + 1
        case "DECREMENT":
            return currentState - 1
        default:
            return currentState
    }
}

// 2. Create a store
const store = redux.createStore(rootReducer)
console.log("Initial State = ", store.getState());

// 3. Dispatch action
store.dispatch({ type: "INCREMENT" })
console.log("State after Increment = ", store.getState());