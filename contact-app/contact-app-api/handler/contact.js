// Mengimpor fungsi-fungsi terkait database dari file contact.js pada repository
const { getAllContactRepo, getContactRepo, addContactRepo, updateContactRepo, deleteContactRepo } = require("../repository/contact");
// Mengimpor utilitas respons untuk menanggapi permintaan HTTP
const { failedGetResponse, successGetResponse, successResponse, failedResponse } = require("../util/responses");

// Fungsi untuk mendapatkan semua kontak
const getContacts = async (req, res) => { 
    // Memanggil fungsi getAllContactRepo untuk mendapatkan semua kontak dari database
    const contacts = await getAllContactRepo();
    // Memeriksa apakah kontak berhasil diperoleh
    if (!contacts) return failedGetResponse(res);

    // Menanggapi permintaan HTTP dengan data kontak yang berhasil diperoleh
    return successGetResponse(res, contacts);
}

// Fungsi untuk mendapatkan detail kontak berdasarkan ID
const getContact = async (req, res) => { 
    // Mengambil nilai ID dari parameter yang ada dalam URL
    const id = req.params.id;
    // Memanggil fungsi getContactRepo untuk mendapatkan detail kontak berdasarkan ID dari database
    const contact = await getContactRepo(id);
    // Memeriksa apakah kontak berhasil diperoleh
    if (!contact) return failedGetResponse(res);

    // Menanggapi permintaan HTTP dengan data kontak yang berhasil diperoleh
    return successGetResponse(res, contact);
}

// Fungsi untuk menambahkan kontak baru
const insertContact = async (req, res) => { 
    // Mendapatkan data kontak dari body request yang dikirim melalui formulir
    const { name, phone, email, address } = req.body;
    // Membuat objek contact dengan data yang diterima dari formulir
    const contact = {
        name: name,
        phone: phone,
        email: email,
        address: address
    };

    // Memanggil fungsi addContactRepo untuk menambahkan kontak baru ke dalam database
    const data = await addContactRepo(contact);
    // Memeriksa apakah penambahan kontak berhasil
    if (!data) return failedResponse(res);

    // Menanggapi permintaan HTTP dengan sukses
    return successResponse(res);
}

// Fungsi untuk memperbarui kontak berdasarkan ID
const updateContact = async (req, res) => { 
    // Mengambil nilai ID dari parameter yang ada dalam URL
    const id = req.params.id;
    // Mendapatkan data kontak dari body request yang dikirim melalui formulir
    const { name, phone, email, address } = req.body;
    // Membuat objek contact dengan data yang diterima dari formulir dan ID yang sesuai
    const contact = {
        id: id,
        name: name, 
        phone: phone, 
        email: email,
        address: address
    };

    // Memanggil fungsi updateContactRepo untuk memperbarui kontak di dalam database
    const data = await updateContactRepo(contact);
    // Memeriksa apakah pembaruan kontak berhasil
    if (!data) return failedResponse(res);

    // Menanggapi permintaan HTTP dengan sukses
    return successResponse(res);
}

// Fungsi untuk menghapus kontak berdasarkan ID
const deleteContact = async (req, res) => { 
    // Mengambil nilai ID dari parameter yang ada dalam URL
    const id = req.params.id;
    // Memanggil fungsi deleteContactRepo untuk menghapus kontak dari database
    await deleteContactRepo(id);

    // Menanggapi permintaan HTTP dengan sukses
    return successResponse(res);
}

// Mengekspor fungsi-fungsi tersebut agar dapat digunakan di tempat lain
module.exports = {
    getContacts,
    getContact,
    insertContact,
    updateContact,
    deleteContact
}