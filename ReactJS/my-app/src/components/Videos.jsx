import React from 'react'

const Videos = ({videoId, title, description, channelTitle}) => {
    const videoUrl = `https://www.youtube.com/embed/${videoId}`
    return (
        <div className='ui grid mb-3'>
            <div>
                <iframe controls
                    width="854"
                    height="480"
                    src={videoUrl}
                >
                    Browser tidak mendukung tag video.
                </iframe>
                <p className='text-xl font-bold mt-5'>{title}</p>
                <p className='text-base mt-3'>{description}</p>
                <p className='text-lg font-bold mt-5'>{channelTitle}</p>
            </div>
        </div>
    )
}

export default Videos