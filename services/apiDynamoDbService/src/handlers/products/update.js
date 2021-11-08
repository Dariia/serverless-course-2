import { responseOnSuccess, responseOnFailure } from '../../utils/response';
import dynamoDb from '../../../../../libs/dynamoDb';

const buildParams = event => {
  const data = JSON.parse(event.body);

  return {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id
    },
    ExpressionAttributeValues: {
      ":name": data.email,
      ":price": data.price,
      ":image": data.image,
      ":checked": data.checked,
      ":updatedAt": new Date().getTime()
    },
    UpdateExpression:
      "SET name = :name, price = :price, image = :image, updatedAt = :updatedAt",
    ReturnValues: "ALL_NEW"
  };
};

export async function updateProduct(event) {
  try {
    const params = buildParams(event);
    await dynamoDb.update(params);
    return responseOnSuccess({ status: true });
  } catch (error) {
    console.log("error: ", error.message);
    return responseOnFailure({ status: false });
  }
};
