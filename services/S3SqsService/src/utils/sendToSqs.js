import { v4 } from 'uuid';
import sqs from '../../../../libs/sqs';

const buildSQSParams = (items, queueUrl) => {
  return {
    MessageBody: JSON.stringify(items),
    QueueUrl: queueUrl
  };
};

export async function sendToSqs (batches, queueUrl) {
  let batchCount = 0; // eslint-disable-line
  console.log('started: ', batches, queueUrl);

  await Promise.all(
    batches.map(async itemData => {
      const items = [];
      console.log('itemData: ', itemData);

      itemData.forEach(item => {
        for (let key of Object.keys(item)) {
          if (item[key] === '')
            delete item[key];
        }
        items.push({
          id: v4(),
          ...item
        });
      });
      console.log('beforeTry: ', items);
      try {
        batchCount++;
        console.log('beforeAwait items, queueUrl: ', items, queueUrl);
        const result = await sqs.sendMessage(buildSQSParams(items, queueUrl));
        console.log('success: ', result);
      } catch (error) {
        console.error('error: ', error.message);
      }
    })
  );
}
