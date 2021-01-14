const { Schema, model } = require('mongoose');

const APK = new Schema({
  title: { type: String, required: true },
  tag: { type: String, required: true },
  links: [{
    title: { type: String, required: true },
    link: { type: String, required: true },
    bugsLink: { type: String, required: true },
    testedLink: { type: String, required: true },
  }],
});

module.exports = model('apks', APK);
