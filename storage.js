var multer = require('multer');
var crypto = require('crypto');
var path = require('path');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './level_data');
   },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return callback(err);
      cb(null, raw.toString('hex') + path.extname(file.originalname));
      });
  }
});
var upload = multer({ storage: storage })

module.exports = upload;
