import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, reset } from '../redux/counterSlice'

export function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <div style={{ textAlign : "center", marginTop : "50px"  }}>
                <h1>{count}</h1>
                <button aria-label="Increment Value" onClick={() => dispatch(increment())} className="btn-counter">
                    Increment (+)
                </button>
                <button aria-label="Decrement Value" onClick={() => dispatch(decrement())} className="btn-counter">
                    Decrement (-)
                </button>
                <button aria-label="Reset Value" onClick={() => dispatch(reset())} className="btn-counter">
                    Reset
                </button>
            </div>
        </div>
    )
}
