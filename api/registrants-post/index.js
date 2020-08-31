const data = require('../shared/registrant-data');

module.exports = async function (context, req) {
  const registrant = {
    id: undefined,
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const newRegistrant = data.addRegistrant(req.body);
    context.bindings.queueItem = newRegistrant;
    context.res.status(201).json(newRegistrant);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
