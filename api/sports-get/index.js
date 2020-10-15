
module.exports = async function (context, req) {
  try {
    context.log('Sport entity: ' + context.bindings.sportEntity);
    context.res.status(200).json(context.bindings.sportEntity);
  } catch (error) {
    context.res.status(500).send(error);
  }

};