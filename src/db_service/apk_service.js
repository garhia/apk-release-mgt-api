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

const getApks = async () => APK.aggregate([
  {
    $match: { links: { $not: { $size: 0 } } },
  },
  {
    $group: {
      _id: '$tag',
      apks: { $push: '$$ROOT' },
    },
  },
]);

const moveToTest = async (_id) => {
  const apk = await APK.findByIdAndUpdate(_id, { $pop: { links: 1 } });
  if (!apk.links[0]) return null;
  const updateTest = await APK.findOneAndUpdate(
    { tag: 'testing' }, { $push: { links: apk.links[0] } }, { new: true },
  );
  return updateTest;
};

const moveToProduction = async () => {
  const testApk = await APK.findOneAndUpdate({ tag: 'testing' }, { $pop: { links: 1 } });
  const toMove = testApk.links[testApk.links.length - 1];
  if (!toMove) return null;
  const updateTest = await APK.findOneAndUpdate(
    { tag: 'production' }, { $push: { links: toMove } }, { new: true },
  );
  return updateTest;
};

module.exports = {
  addAPK,
  getApks,
  moveToTest,
  moveToProduction,
};