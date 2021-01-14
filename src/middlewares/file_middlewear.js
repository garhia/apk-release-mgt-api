const multer = require('multer');

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 1024 * 1024 * 12 },
});

module.exports = upload;
