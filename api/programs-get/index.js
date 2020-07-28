const data = require('../shared/program-data');

module.exports = async function (context, req) {
  try {
    const programs = data.getPrograms();        
    context.res.status(200).json(programs);
  } catch (error) {
    context.res.status(500).send(error);
  }
};