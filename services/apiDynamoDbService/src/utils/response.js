export async function responseOnSuccess(body) {
  return buildResponse(200, body);
};

export async function responseOnFailure(body) {
  return buildResponse(500, body);
};

const buildResponse = (statusCode, body) => ({
  statusCode: statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  },
  body: JSON.stringify(body)
});
