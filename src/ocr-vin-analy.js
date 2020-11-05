require("dotenv").config();

const tencentcloud = require("tencentcloud-sdk-nodejs");

exports.main_handler = async (event, context, callback) => {

  const OcrClient = tencentcloud.ocr.v20181119.Client;
  const models = tencentcloud.ocr.v20181119.Models;

  const Credential = tencentcloud.common.Credential;
  const ClientProfile = tencentcloud.common.ClientProfile;
  const HttpProfile = tencentcloud.common.HttpProfile;

  let cred = new Credential(
    process.env.SECRET_ID,
    process.env.APP_KEY
  );

  let httpProfile = new HttpProfile();
  httpProfile.endpoint = "ocr.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;

  let client = new OcrClient(cred, "ap-guangzhou", clientProfile);

  let req = new models.VinOCRRequest();

  let params = {
    ImageUrl: event.url
  };

  req.from_json_string(JSON.stringify(params));

  client.VinOCR(req, callback);
};
