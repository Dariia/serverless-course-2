import { saveToDB } from '../utils/saveToDb';

export async function processMessage (event) {
  console.log('processSqsMessage', event);

  await Promise.all(
    event.Records.map(async event => {
      const items = JSON.parse(event.body);
      await saveToDB(items, process.env.DYNAMODB_TABLE);
    })
  );
};
