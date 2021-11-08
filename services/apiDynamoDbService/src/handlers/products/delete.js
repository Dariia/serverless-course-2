import { responseOnSuccess, responseOnFailure } from '../../utils/response';
import dynamoDb from '../../../../../libs/dynamoDb';

const buildParams = event => ({
  TableName: process.env.DYNAMODB_TABLE,
  Key: {
    id: event.pathParameters.id
  }
});

export async function deleteProduct(event) {
  try {
    const params = buildParams(event);
    await dynamoDb.delete(params);
    return responseOnSuccess({ status: true });
  } catch (error) {
    console.log("error: ", error.message);
    return responseOnFailure({ status: false });
  }
};

