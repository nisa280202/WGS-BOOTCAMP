import axios from 'axios'
import React, { useState, useEffect } from 'react'
import DetailModal from './DetailModal'
import UpdateModal from './UpdateModal'

const ContactTable = () => {
    // Mendefinisikan state untuk menyimpan data kontak
    const [contacts, setContacs] = useState([]);
    // State untuk menyimpan kontak yang dipilih untuk di-update atau dilihat detail
    const [selectedContact, setSelectedContact] = useState(null);
    // State untuk mengontrol keadaan modal update
    const [openUpdate, setOpenUpdate] = useState(false)
    // State untuk mengontrol keadaan modal detail
    const [openDetail, setOpenDetail] = useState(false);

    // Fungsi untuk menangani update kontak
    const handleUpdate = (contact) => { 
        // Mengatur kontak yang dipilih dan membuka modal update
        setSelectedContact(contact);
        setOpenUpdate(true);
    }

    // Fungsi untuk menangani tampilkan detail kontak
    const handleDetail = (contact) => {
        // Mengatur kontak yang dipilih dan membuka modal detail
        setSelectedContact(contact);
        setOpenDetail(true);
    }

    // Menggunakan useEffect untuk mendapatkan data kontak saat komponen pertama kali dirender atau kontak berubah
    useEffect(() => {
        // Fungsi async untuk mengambil data kontak dari server
        async function fetchData() {
            try {
                const res = await axios.get('http://localhost:3030/contact');
                // Menyimpan data kontak ke dalam state contacts
                setContacs(res.data.Data);
            } catch (error) {
                console.log(error);
            }
        }

        // Memanggil fungsi fetchData
        fetchData();
    }, [contacts]);

    // Fungsi untuk melakukan update kontak ke server
    const onUpdateContact = async (contact) => { 
        try {
            // Mengirim permintaan PUT ke server untuk melakukan update kontak
            await axios.put(`http://localhost:3030/contact/${contact.id}`, contact);
        } catch (error) {
            console.log(error);
        }
    }

    // Fungsi untuk menghapus kontak dari server
    const handleDelete = async (id) => {
        try {
            // Mengirim permintaan DELETE ke server untuk menghapus kontak
            await axios.delete(`http://localhost:3030/contact/${id}`);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, i) => (
                        <tr key={contact.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">
                                {i+1}
                            </td>
                            <td className="px-6 py-4">
                                {contact.name}
                            </td>
                            <td className="px-6 py-4">
                                {contact.phone}
                            </td>
                            <td className="px-6 py-4">
                                <div className='flex flex-row'>
                                    <svg className="h-5 w-5 text-blue-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" onClick={() => handleDetail(contact)}>  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />  <circle cx="12" cy="12" r="3" /></svg>
                                    <svg className="h-5 w-5 text-yellow-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => handleUpdate(contact)}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                    <svg className="h-5 w-5 text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => handleDelete(contact.id)}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <UpdateModal open={openUpdate} contact={selectedContact} onClose={() => setOpenUpdate(false)} onUpdateContact={onUpdateContact} />

            <DetailModal contact={selectedContact} open={openDetail} onClose={() => setOpenDetail(false)} />
        </div>
    )
}

export default ContactTable