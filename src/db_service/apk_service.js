const APK = require('../models/apk');

const addAPK = async ({
  title, link, testedLink, bugsLink,
}) => {
  const apk = new APK({
    title,
    tag: 'feature/bug-fix',
    links: [{
      title, link, testedLink, bugsLink,
    }],
  });
  const error = apk.validateSync();
  if (error) {
    return {
      status: false,
      result: Object.keys(error.errors).map(ele => error.errors[ele].message),
    };
  }
  apk.save();
  return { status: true, result: apk };
};


module.exports = {
  addAPK,
};