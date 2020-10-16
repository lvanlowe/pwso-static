
module.exports = async function (context, req) {
  try {
    context.log('Program entity: ' + context.bindings.programEntity);
    context.res.status(200).json(context.bindings.programEntity);
  } catch (error) {
    context.res.status(500).send(error);
  }
};