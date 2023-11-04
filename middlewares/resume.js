const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'resumes/'); // Destination directory for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // File naming strategy
    },
});


const upload = multer({ storage: storage,limits: { fileSize: 5000000 ,files:1},});
const errorMulter = (error,eeq,res,next)=>{
    if(error instanceof multer.MulterError){
        if(error.code == "LIMIT_FILE_SIZE"){
            return res.status(400).json({
                message:"File Should be lessthan 5mb"
            })
        }
    }
    if(error instanceof multer.MulterError){
        if(error.code == "LIMIT_FILE_COUNT"){
            return res.status(400).json({
                message:"Select only 1 File"
            })
        }
    }


}

module.exports = upload;
