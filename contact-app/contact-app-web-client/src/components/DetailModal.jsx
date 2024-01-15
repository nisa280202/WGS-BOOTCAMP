import React from 'react';

const DetailModal = ({ open, onClose, contact }) => {
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
            <h1 className="text-2xl text-white font-bold mb-5">{contact?.name}</h1>
            <h1 className="text-lg text-white mb-3">{contact?.phone}</h1>
            <h1 className="text-lg text-white mb-3">{contact?.email}</h1>
            <h1 className="text-lg text-white mb-7">{contact?.address}</h1>
            
            <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            >
            Close
            </button>
        </div>
        </div>
    );
};

export default DetailModal;