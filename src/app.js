const express = require('express');
const connectDb = require('./db_service/connect_db');
const fileUploadMiddlewear = require('./middlewares/file_middlewear');
const fileUploader = require('./file_upload/file_uploader');

const startApplication = async () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  const {
    apkService,
  } = await connectDb(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/apk-mgt');

  app.post('/apk', fileUploadMiddlewear.single('apk_file'), async (req, res) => {
    if (!req.file) res.status(400).json('You must upload an APK file.');
    const link = await fileUploader.uploadFile(req.file);
    req.body.link = link;
    const { status, result } = await apkService.addAPK(req.body);
    const statusCode = status ? 200 : 400;
    res.status(statusCode).json(result);
  });

  app.post('/apk/transfer-to-test', async (req, res) => {

  });

  app.post('/apk/transfer-to-production', async (req, res) => {

  });

  app.get('/apk', async (req, res) => {

  });

  app.get('/', (req, res) => {
    res.status(200).json('Welcome to garhia APK manager');
  });
  return app;
};

module.exports = startApplication;
