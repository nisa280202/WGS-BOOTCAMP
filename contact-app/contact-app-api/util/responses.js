// Fungsi untuk memberikan respons sukses dengan data pada permintaan GET
const successGetResponse = (res, data) => { 
    res.status(200).json({
        'Status': 200,
        'Message': 'Success',
        'Data': data
    });
}

// Fungsi untuk memberikan respons gagal pada permintaan GET
const failedGetResponse = (res) => { 
    res.status(400).json({
        'Status': 400,
        'Message': 'Failed',
    });
}

// Fungsi untuk memberikan respons sukses pada permintaan selain GET
const successResponse = (res) => { 
    res.status(200).json({
        'Status': 200,
        'Message': 'Success'
    });
}

// Fungsi untuk memberikan respons gagal pada permintaan selain GET
const failedResponse = (res) => { 
    res.status(400).json({
        'Status': 400,
        'Message': 'Failed',
    });
}

// Mengekspor fungsi-fungsi respons agar dapat digunakan di tempat lain
module.exports = {
    successGetResponse,
    failedGetResponse,
    successResponse,
    failedResponse
}