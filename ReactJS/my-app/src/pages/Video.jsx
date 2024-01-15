import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Thumbnail from '../components/Thumbnail'
import Videos from '../components/Videos'

const Video = () => {
    // Membuat state untuk menyimpan kata kunci pencarian
    const [keyword, setKeyword] = useState('')
    // Membuat state untuk menyimpan daftar thumbnail video hasil pencarian
    const [thumbnail, setThumbnail] = useState([])
    // Membuat state untuk menyimpan video yang dipilih dari hasil pencarian
    const [selectedVideo, setSelectedVideo] = useState(null)

    // Fungsi untuk menangani pencarian video menggunakan YouTube API
    const handleSearch = async () => {
        try {
            const res = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                params: {
                    key: 'AIzaSyBRq2g1nb62Y7w5nsnQVjhJFCvb-9sUWpY',
                    part: 'snippet',
                    type: 'video',
                    q: keyword
                }
            })

            // Mengatur video pertama sebagai video yang dipilih
            setSelectedVideo(res.data.items[0])

            // Menyimpan daftar thumbnail dari video selain yang dipilih
            setThumbnail(res.data.items.slice(1))
        } catch (error) {
            console.log(error);
        }
    }

    // Efek samping untuk menjalankan fungsi pencarian ketika nilai kata kunci berubah
    useEffect(() => {
        handleSearch()
    }, [keyword])

    // Fungsi untuk menangani klik pada thumbnail video
    const handleThumbnailClick = (data) => {
        // Menggabungkan video yang dipilih dengan thumbnail lainnya dan menghapus video yang diklik
        let newVideos = [selectedVideo, ...thumbnail]
        newVideos = newVideos.filter(video => video.id.videoId !== data.id.videoId)

        // Memperbarui state thumbnail dan video yang dipilih
        setThumbnail(newVideos)
        setSelectedVideo(data)
    }

    // Render tampilan komponen
    return (
        <div className='px-10'>
            {/* Input untuk memasukkan kata kunci pencarian */}
            <label className="ui icon input mr-3 ml-8">
                <input type="text" className='w-96' value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search Video" />
                <i class="search icon"></i>
            </label>
            
            {/* Tombol untuk memicu pencarian video */}
            <button onClick={handleSearch} className="ui button">Search</button>

            {/* Kontainer untuk menampilkan video yang dipilih dan thumbnail */}
            <div className='flex'>
                <div className='p-8'>
                    {/* Menampilkan komponen Videos jika ada video yang dipilih */}
                    {selectedVideo && <Videos key={selectedVideo.id.videoId} videoId={selectedVideo.id.videoId} title={selectedVideo.snippet.title} description={selectedVideo.snippet.description} channelTitle={selectedVideo.snippet.channelTitle} />}
                </div>
                
                {/* Menampilkan thumbnail video hasil pencarian */}
                <div className='pt-4' style={{ marginTop: '-7px' }}>
                    {thumbnail.map((thumbnailUrl, index) => (
                        <Thumbnail key={index} data={thumbnailUrl} handleThumbnailClick={handleThumbnailClick} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Video