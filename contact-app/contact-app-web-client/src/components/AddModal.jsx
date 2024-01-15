import React, { useState } from 'react';
import validator from 'validator'

const AddModal = ({ open, onClose, onAddContact }) => {
    // Mendeklarasikan state untuk menyimpan data kontak baru
    const [newContact, setNewContact] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    });

    // Mendeklarasikan state untuk validasi email dan nomor telepon
    const [emailValid, setEmailValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);

    // Fungsi untuk meng-handle perubahan pada input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };

    // Fungsi untuk menambahkan kontak baru
    const handleAddContact = () => {
        // Validasi email menggunakan library validator
        if (validator.isEmail(newContact.email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }

        // Validasi nomor telepon menggunakan library validator
        if (validator.isMobilePhone(newContact.phone, 'id-ID')) {
            setPhoneValid(true);
        } else {
            setPhoneValid(false);
        }

        // Jika email dan nomor telepon valid, tambahkan kontak baru
        if (validator.isEmail(newContact.email) && validator.isMobilePhone(newContact.phone, 'id-ID')) {
            // Memanggil fungsi onAddContact yang diterima sebagai prop dari parent component
            onAddContact(newContact);

            // Menutup modal
            onClose();

            // Mengosongkan data kontak baru
            setNewContact({
                name: '',
                phone: '',
                email: '',
                address: ''
            });
        }
    };

    // Jika modal tidak terbuka, return null (tidak merender apa-apa)
    if (!open) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 flex justify-center items-center transition-opacity ${
                open ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
        >
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-8 shadow-md w-96 text-center">
            <h1 className="text-xl text-white font-semibold mb-5">Add New Contact</h1>
            {emailValid ? '' :  <h1 className='bg-red-500 text-white rounded-md my-4 py-3'>Invalid Email Format!</h1>}
            {phoneValid ? '' :  <h1 className='bg-red-500 text-white rounded-md my-4 py-3'>Invalid Phone Number!</h1>}

            <div className="mb-4">
                <input
                    type="name"
                    name="name"
                    placeholder="Name"
                    value={newContact.name}
                    onChange={handleInputChange}
                    className="w-full border rounded-md py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <input
                    type="phone"
                    name="phone"
                    placeholder="Phone"
                    value={newContact.phone}
                    onChange={handleInputChange}
                    className="w-full border rounded-md py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newContact.email}
                    onChange={handleInputChange}
                    className="w-full border rounded-md py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <input
                    type="address"
                    name="address"
                    placeholder="Address"
                    value={newContact.address}
                    onChange={handleInputChange}
                    className="w-full border rounded-md py-2 px-3"
                />
            </div>
            <button
            onClick={handleAddContact}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md mr-2"
            >
            Add Contact
            </button>

            <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            >
            Cancel
            </button>
        </div>
        </div>
    );
};

export default AddModal;