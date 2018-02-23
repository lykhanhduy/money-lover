const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const port = 3000;
const student = require('./routes/student');
//Access all request from client
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  next();
});

//upload image student
const storage = multer.diskStorage({ //multers disk storage settings
    destination: (req, file, cb) => {
        cb(null, './../src/assets/img/');
    },
    filename: (req, file, cb) => {
        var datetimestamp = Date.now();
        cb(null, file.originalname);
    }
  });
  const upload = multer({ //multer settings
    storage: storage
  }).single('file');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', student);
app.post('/uploadimage', (req, res) => {
  upload(req, res, (err) => {
    if(err) console.log(err);
    res.json({error_code:0,err_desc:null});
  })
})

app.listen(port, () => console.log('Server is running on port ' + port));