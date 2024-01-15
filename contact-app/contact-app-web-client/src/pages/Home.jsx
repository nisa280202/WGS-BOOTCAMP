import axios from 'axios'
import React, { useState } from 'react'
import AddModal from '../components/AddModal'
import ContactTable from '../components/ContactTable'
import swal from 'sweetalert'

const Home = () => {
    // State untuk mengontrol keadaan modal penambahan kontak
    const [openAdd, setOpenAdd] = useState(false);

    // Fungsi untuk menangani penambahan kontak
    const handleAdd = async (contact) => { 
        try {
            // Mengirim permintaan POST ke server untuk menambahkan kontak
            await axios.post('http://localhost:3030/contact', contact);
            // Menampilkan notifikasi jika penambahan kontak berhasil
            swal('Contact Berhasil Ditambahkan!');
        } catch (error) {
            console.log(error);
        }
    }

    // Render komponen
    return (
        <div className='px-20 pt-7 pb-10'>
            {/* Tombol untuk membuka modal penambahan kontak */}
            <button 
                type="button" 
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-7" 
                onClick={() => setOpenAdd(true)}
            >
                Add Contact
            </button>

            {/* Tabel untuk menampilkan daftar kontak */}
            <ContactTable />

            {/* Komponen modal penambahan kontak */}
            <AddModal open={openAdd} onAddContact={handleAdd} onClose={() => setOpenAdd(false)} />
        </div>
    );
}

export default Home