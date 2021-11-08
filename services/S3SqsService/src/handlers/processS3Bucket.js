import s3 from '../../../../libs/s3';
import { sendToSqs } from '../utils/sendToSqs';

const BATCH_SIZE = 25;

const buildS3Params = record => ({
  Bucket: record.s3.bucket.name,
  Key: record.s3.object.key
});

const splitToBatches = data => {
  let batches = [];

  while (data.length > 0) {
    batches.push(data.splice(0, BATCH_SIZE));
  }
  console.log(`total batches: ${batches.length}`);
  return batches;
};

export async function processBucket (event) {
  console.log('event from processBucket', event);
  await Promise.all(
    event.Records.map(async record => {
      try {
        const originalText = await s3.getObject(buildS3Params(record));
        const jsonData = JSON.parse(originalText.Body.toString('utf-8'));
        console.log('jsonData from processBucket', jsonData);
        const batches = splitToBatches(jsonData);

        await sendToSqs(batches, process.env.QUEUE_URL);
      } catch (error) {
        console.error(error.message);
      }
    })
  );
}
