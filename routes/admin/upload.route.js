// app.js hoặc routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Cấu hình nơi lưu file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, 'public/uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + file.originalname;
    cb(null, unique);
  }
});
const upload = multer({ storage });

// Tạo endpoint POST /uploads
router.post('/uploads', upload.single('file'), (req, res) => {
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ location: filePath }); // 👈 bắt buộc phải có key "location"
});

module.exports = router;
