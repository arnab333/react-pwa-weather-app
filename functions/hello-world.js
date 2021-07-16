exports.handler = async (event, context, callback) => {
  // return formattedResponse(200, JSON.stringify({ msg: 'Hello World' }));
  return { statusCode: 200, body: JSON.stringify({ msg: 'Hello World' }) };
};
