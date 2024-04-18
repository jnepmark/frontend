const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/images', express.static('public/Images'));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/Images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.array('cat_pics', 10), (req,res) => {
  
  console.log("Received files:", req.files);
  
   // Handle successful upload and send back relevant data 
   const imageURLs = req.files.map(file => `/images/${file.filename}`);
   res.status(200).json({ status: 'success', imageURLs });
});

// Error handler for Multer
app.use((err, req,res,next) => {
 if(err instanceof multer.MulterError){
    res.status(400).json({status:'error', message:'File Upload Error'});
 }else{
    res.status(500).json({status:'error', message:'Server Error'});
 }
});

app.listen(4000);