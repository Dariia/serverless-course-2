import { v4 } from 'uuid';
import { responseOnSuccess, responseOnFailure } from '../../utils/response';
import dynamoDb from '../../../../../libs/dynamoDb';

const buildParams = event => {
  const data = JSON.parse(event.body);

  return {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: v4(),
      name: data.name,
      price: data.price,
      image: data.image,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    }
  };
};

export async function createProduct(event) {
  try {
    const dbParams = buildParams(event);
    await dynamoDb.put(dbParams);
    return responseOnSuccess(dbParams.Item);
  } catch(error){
    console.log("error: ", error.message);
    return responseOnFailure({ status: false });
  }
};

