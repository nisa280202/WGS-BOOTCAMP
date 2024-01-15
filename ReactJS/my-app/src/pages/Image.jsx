import React, { useState } from 'react'
import axios from 'axios'
import Images from '../components/Images'           

const Image = () => {
    // State untuk menyimpan daftar gambar
    const [images, setImages] = useState([]);
    // State untuk menyimpan kata kunci pencarian
    const [keyword, setKeyword] = useState('');

    // Fungsi untuk menangani pencarian gambar
    const handleSearch = async () => {
        try {
            // Mengirim permintaan GET ke API Unsplash untuk mencari gambar berdasarkan kata kunci
            const res = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${keyword}`, {
                headers: {
                    Authorization: 'Client-ID 6I-Y7_ke4Bcug9ST6o_U1M__rsegMPVoy-wNQHsthUQ'
                }
            });

            // Mengatur state images dengan hasil pencarian gambar
            setImages(res.data.results);
        } catch (error) {
            console.log(error);
        }
    }

    // Render komponen
    return (
        <div className='px-10'>
            {/* Input dan tombol untuk melakukan pencarian gambar */}
            <label className="ui icon input mr-3 ml-8">
                <input 
                    type="text" 
                    className='w-96' 
                    value={keyword} 
                    onChange={(e) => setKeyword(e.target.value)} 
                    placeholder="Search Image" 
                />
                <i className="search icon"></i>
            </label>
            <button onClick={handleSearch} className="ui button">Search</button>

            {/* Container untuk menampilkan hasil pencarian gambar */}
            <div className='masonry p-8 gap-x-4'>
                {images.map((image) => (
                    // Komponen Images untuk menampilkan gambar
                    <Images key={image.id} url={image.urls.full} />
                ))}
            </div>
        </div>
    )
}

export default Image