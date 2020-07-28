const data = require('../shared/sport-data');

module.exports = async function (context, req) {
  try {
    const sports = data.getSports();
    context.res.status(200).json(sports);
  } catch (error) {
    context.res.status(500).send(error);
  }
};