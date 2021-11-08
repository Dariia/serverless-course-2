import { responseOnSuccess, responseOnFailure } from '../../utils/response';
import dynamoDb from '../../../../../libs/dynamoDb';

const buildParams = () => ({ TableName: process.env.DYNAMODB_TABLE });

export async function getAllProduct() {
  try {
    const params = buildParams();
    const result = await dynamoDb.scan(params);
    return responseOnSuccess(result.Items);
  } catch (error) {
    console.log("error: ", error.message);
    return responseOnFailure({ status: false });
  }
};

