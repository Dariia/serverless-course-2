import { responseOnSuccess, responseOnFailure } from '../../utils/response';
import dynamoDb from '../../../../../libs/dynamoDb';

const buildParams = event => ({
  TableName: process.env.DYNAMODB_TABLE,
  Key: {
    id: event.pathParameters.id
  }
});

export async function getProduct(event) {
  try {
    const params = buildParams(event);
    const result = await dynamoDb.get(params);

    if (result.Item) {
      return responseOnSuccess(result.Item);
    } else {
      return responseOnFailure({ status: false, error: "Item not found." });
    }
  } catch (error) {
    console.log("error: ", error.message);
    return responseOnFailure({ status: false });
  }
};


