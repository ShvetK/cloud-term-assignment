const Item = require("../models/Item");
require("dotenv").config();
const AWS = require("aws-sdk");
const axios = require("axios");

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  sessionToken: process.env.SESSIONTOKEN,
});

const s3 = new AWS.S3();

module.exports.get_items = (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
};

module.exports.post_item = (req, res) => {
  console.log("Hiiiii this is working...........................");
  const { title, description, category, price } = req.body;

  const image = String(Date.now() + req.file.originalname);
  var bucketName = "shvet-images-1";
  const fileContent = req.file.buffer;
  const params = { Bucket: bucketName, Key: image, Body: fileContent };

  s3.upload(params, function (err, data) {
    if (err) {
      console.log("error is: " + err);
    } else {
      console.log("File uploaded Successfully & URL: " + data.Location);
      const S3image = data.Location;
      const newItem = new Item({
        title,
        description,
        category,
        price,
        S3image,
      });
      newItem
        .save()
        .then((item) => res.json(item))
        .catch((error) => console.log(error));

      const apiUrl =
        "https://eawleioq74.execute-api.us-east-1.amazonaws.com/deployment/mailsend";

      axios
        .post(apiUrl, {
          userEmail: "shvetanghan@gmail.com",
          subject: `The new Item is Added Succesfull and Item id is ${newItem._id}`,
          text: `  
    you added a new Item.
    item title: ${newItem.title}
    item price: ${newItem.price}`,
        })
        .then((response) => {
          // handle success
          console.log(response.data);
        })
        .catch((error) => {
          // handle error
          console.log("Email successfully sent");
        });
    }
  });
};

module.exports.update_item = (req, res) => {
  Item.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (
    item
  ) {
    Item.findOne({ _id: req.params.id }).then(function (item) {
      res.json(item);
    });
  });
};

module.exports.delete_item = (req, res) => {
  Item.findByIdAndDelete({ _id: req.params.id }).then(function (item) {
    res.json({ success: true });
  });
};
