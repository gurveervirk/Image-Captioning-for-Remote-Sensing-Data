import multer from "multer"; // https://github.com/expressjs/multer

// The disk storage engine gives you full control on storing files to disk.

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb = callback
    cb(null, ".\\public\\temp");
  },
  filename: function (req, file, cb) {
    
      cb(null, file.originalname) 
  },
});
export const upload = multer({ storage: storage });
