import dynamoDb from '../../../../libs/dynamoDb';

export async function saveToDB (itemData, tableName) {
  console.log('processSqsMessage saveToDB', itemData, tableName);

  try {
    const dynamoDbParams = buildDynamoDbParams(itemData, tableName);
    const result = await dynamoDb.batchWrite(dynamoDbParams);
    console.log('Success: ', result);
  } catch (error) {
    console.error('Error: ', error);
  }
};

const buildDynamoDbParams = (itemData, tableName) => {
  const dynamoDbParams = {
    RequestItems: {}
  };

  dynamoDbParams.RequestItems[tableName] = [];

  itemData.forEach(item => {
    for (let key of Object.keys(item)) {
      if (item[key] === '')
        delete item[key];
    }
    dynamoDbParams.RequestItems[tableName].push({
      PutRequest: {
        Item: {
          ...item
        }
      }
    });
  });

  return dynamoDbParams;
};
