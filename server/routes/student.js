const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/student');

mongoose.connect('mongodb://solitary:123456@ds133816.mlab.com:33816/lykhanhduy2008');


router.get('/students', (req, res) => {
    Student.find((err,data) => {
        if(err) res.send(err);
        res.json(data);
    });
});


router.get('/student/:id', (req, res) => {
    //store the id from the url in a variable
    var id = req.params.id;
   
    Student.findById(id, (err, data) => {
        if (err) {
            res.send('Student ' + id + ' not found');
        }
        else {
            res.json(data);
        }
    });
});

//PUT update student
router.post('/student/:id', (req, res) => {
    var id = req.params.id;

    var student = {
        _id: id,
        hoten: req.body.hoten,
        lop: req.body.lop,
        khoa: req.body.khoa,
        ngaysinh: req.body.ngaysinh,
        quequan: req.body.quequan,
        anhdaidien: req.body.anhdaidien 
    };
    console.log(student);
    Student.update({ _id: id}, student, (err, doc) => {
        if (err) {
            res.send('student ' + req.body.id + ' not updated. Error: ' + err);
        }
        res.send(doc);
    });
});

// POST add new student
router.post('/student', (req, res) => {

    // use the student model to insert a new student
    Student.create({
        hoten: req.body.hoten,
        lop: req.body.lop,
        khoa: req.body.khoa,
        ngaysinh: req.body.ngaysinh,
        quequan: req.body.quequan,
        anhdaidien: req.body.anhdaidien,
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err) ;
        }
        else {
            res.send(data);
        }
    });
});

router.delete('/student/:id', function (req, res, next) {
    //store the id from the url into a variable
    var id = req.params.id;

    //use our student model to delete
    Student.remove({ _id: id }, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
});

module.exports = router;