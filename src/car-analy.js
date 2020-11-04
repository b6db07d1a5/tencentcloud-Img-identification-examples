require("dotenv").config();

const tencentcloud = require("tencentcloud-sdk-nodejs");

exports.main_handler = async (event, context, callback) => {

  const TiiaClient = tencentcloud.tiia.v20190529.Client;
  const models = tencentcloud.tiia.v20190529.Models;

  const Credential = tencentcloud.common.Credential;
  const ClientProfile = tencentcloud.common.ClientProfile;
  const HttpProfile = tencentcloud.common.HttpProfile;

  let cred = new Credential(
    process.env.SECRET_ID,
    process.env.APP_KEY
  );

  let httpProfile = new HttpProfile();
  httpProfile.endpoint = "tiia.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;

  let client = new TiiaClient(cred, "ap-guangzhou", clientProfile);

  let req = new models.RecognizeCarRequest();

  let params = {
    ImageUrl: event.url
  };

  req.from_json_string(JSON.stringify(params));

  client.RecognizeCar(req, callback);
};
