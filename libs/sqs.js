import AWS from "./awsSdk";

const SQS = new AWS.SQS({ appVersion: '2021-11-08' });

export default {
  sendMessage: (params) => SQS.sendMessage(params).promise()
};
