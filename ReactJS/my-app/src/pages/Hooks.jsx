import React, { useEffect, useState } from 'react'

const Hooks = () => {
    const [count, setCount] = useState(0)
    const [color, setColor] = useState('Black')

    useEffect(() => {
        document.title = `You clicked ${count} times`
    })

    return (
        <div className='ui container py-7'>
            <p className='mb-5 font-bold text-lg'>You clicked {count} times</p>
            <button class="tiny ui pink button" onClick={() => setCount(count + 1)}>
                Click Me
            </button>

            <p style={{ color: color }} className='mb-7 text-center font-bold text-xl'>My Favorite Color is {color}</p>
            <div className='text-center'>
                <button class="sm ui orange button" onClick={() => setColor('Orange')}>
                    Orange
                </button>
                <button class="sm ui pink button" onClick={() => setColor('Pink')}>
                    Pink
                </button>
                <button class="sm ui teal button" onClick={() => setColor('Teal')}>
                    Teal
                </button>
                <button class="sm ui purple button" onClick={() => setColor('Purple')}>
                    Purple
                </button>
                <button class="sm ui grey button" onClick={() => setColor('Grey')}>
                    Grey
                </button>
            </div>
        </div>
    )
}

export default Hooks