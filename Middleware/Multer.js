const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to ensure directory exists or create it
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userName = req.body.name || 'defaultUser';
    let uploadPath;
     if (file.fieldname.startsWith('image')) {
      uploadPath = path.join(__dirname,'..', '/uploads', userName, 'image');
    } else {
      uploadPath = path.join(__dirname, '..','/uploads', userName, 'document');
    }
    
    // Ensure the directory exists
    ensureDirExists(uploadPath);
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only certain mime types for security reasons
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf',];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, PDF, and DOC files are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB file size limit
});

module.exports = { upload };
