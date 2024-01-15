import React from 'react'

const Thumbnail = ({data, handleThumbnailClick}) => {
    return (
        <div className='mb-2 ui'>
            <div onClick={() => handleThumbnailClick(data)} className='hover:bg-red-200 hover:cursor-pointer'>
                <img src={data.snippet.thumbnails.medium.url} className='p-2 hover:cursor-pointer' />
            </div>
        </div>
    )
}

export default Thumbnail