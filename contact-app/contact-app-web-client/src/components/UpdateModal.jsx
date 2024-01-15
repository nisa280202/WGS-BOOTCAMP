import React, { useEffect, useState } from 'react';
import validator from 'validator'

const UpdateModal = ({ open, onClose, onUpdateContact, contact }) => {
    // State untuk menyimpan data kontak yang akan di-update
    const [updateContact, setUpdateContact] = useState({
        'id': '',
        'name': '',
        'phone': '',
        'email': '',
        'address': ''
    });

    // Menggunakan useEffect untuk memperbarui state updateContact saat kontak yang dipilih berubah
    useEffect(() => {
        // Memeriksa apakah ada kontak yang dipilih
        if (contact) {
            // Jika ada, mengatur nilai state updateContact dengan nilai kontak yang dipilih
            setUpdateContact({
                'id': contact.id || '',
                'name': contact.name || '',
                'phone': contact.phone || '',
                'email': contact.email || '',
                'address': contact.address || ''
            });
        }
    }, [contact]);

    // State untuk menyimpan status validitas email
    const [emailValid, setEmailValid] = useState(true);
    // State untuk menyimpan status validitas nomor telepon
    const [phoneValid, setPhoneValid] = useState(true);

    // Fungsi untuk meng-handle perubahan nilai pada input form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Meng-update state updateContact sesuai dengan input yang berubah
        setUpdateContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };

    // Fungsi untuk meng-handle update kontak
    const handleUpdateContact = () => {
        // Memeriksa validitas email
        if (validator.isEmail(updateContact.email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }

        // Memeriksa validitas nomor telepon
        if (validator.isMobilePhone(updateContact.phone, 'id-ID')) {
            setPhoneValid(true);
        } else {
            setPhoneValid(false);
        }

        // Jika email dan nomor telepon valid, melakukan update kontak
        if (validator.isEmail(updateContact.email) && validator.isMobilePhone(updateContact.phone, 'id-ID')) {
            onUpdateContact(updateContact);
            onClose();
            // Mengatur state updateContact kembali ke nilai awal
            setUpdateContact({
                id: '',
                name: '',
                phone: '',
                email: '',
                address: ''
            });
        }
        console.log(updateContact);
    };

    // Jika modal tidak terbuka, kembalikan nilai null
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
            <h1 className="text-xl text-white font-semibold mb-5">Update Contact</h1>
            {emailValid ? '' :  <h1 className='bg-red-500 text-white rounded-md my-4 py-3'>Invalid Email Format!</h1>}
            {phoneValid ? '' :  <h1 className='bg-red-500 text-white rounded-md my-4 py-3'>Invalid Phone Number!</h1>}

            <div className="mb-4">
                <input
                    type="name"
                    name="name"
                    placeholder="Name"
                    value={updateContact.name}
                    onChange={handleInputChange}
                    className="w-full border rounded-md py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <input
                    type="phone"
                    name="phone"
                    placeholder="Phone"
                    value={updateContact.phone}
                    onChange={handleInputChange}
                    className="w-full border rounded-md py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={updateContact.email}
                    onChange={handleInputChange}
                    className="w-full border rounded-md py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <input
                    type="address"
                    name="address"
                    placeholder="Address"
                    value={updateContact.address}
                    onChange={handleInputChange}
                    className="w-full border rounded-md py-2 px-3"
                />
            </div>
            <button
            onClick={handleUpdateContact}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md mr-2"
            >
                Update Contact
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

export default UpdateModal;