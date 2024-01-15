import React from 'react'

const Images = ({url}) => {
    return (
        <div>
            <img src={url} className="rounded-lg mb-4" />
        </div>
    )
}

export default Images