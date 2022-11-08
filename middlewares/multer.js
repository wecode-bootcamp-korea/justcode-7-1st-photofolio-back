const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

// merge이후 오류로 인한 우선 주석처리
// aws.config.loadFromPath(__dirname + '/../config/s3.json');

// const s3 = new aws.S3();
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'photofolio',
//     acl: 'public-read',
//     key: function (req, file, cb) {
//       cb(null, Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정
//     }
//   })
// });

module.exports = upload;
