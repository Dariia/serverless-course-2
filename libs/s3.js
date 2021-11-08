import AWS from "./awsSdk";

const S3 = new AWS.S3();

export default {
  getObject: (params) => S3.getObject(params).promise()
};
