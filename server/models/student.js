const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
    { 
        hoten: String,
        lop: String,
        khoa: String,
        ngaysinh: String,
        quequan: String,
        anhdaidien: String 
    }
)

module.exports = mongoose.model('students', StudentSchema);