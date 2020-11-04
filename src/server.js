const express = require("express");
const bodyParser = require("body-parser");
const { main_handler } = require("./car-analy");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.set("view engine", "pug");

app.get("/:url?*", async (req, res) => {
  const imgSrc = req.query.url;

  const defaultRender = {
    title: "Tencent Cloud",
    message: "Car Identification",
    result: "No Image"
  };

  if(!imgSrc) {
    res.render("index", defaultRender)
    return
  }

  await main_handler({ url: imgSrc}, null, (error, response) => {
    res.render("index", {
      ...defaultRender,
      img_path_var: imgSrc,
      result: JSON.stringify(JSON.parse(response.to_json_string()), null, 2),
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
