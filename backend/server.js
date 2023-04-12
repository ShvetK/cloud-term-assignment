const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const secretFun = require("./config/config");
const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/item");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  })
);

app.use("/Images", express.static("Assets/Images"));

app.use("/api", authRoutes);
app.use("/api", itemRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const Db = async () => {
  const sData = await secretFun();
  const dbURI = sData.dbURI;
  const port = process.env.PORT || 7001;
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() =>
      app.listen(port, () =>
        console.log(`Server running on http://localhost:${port}`)
      )
    )
    .catch((err) => console.log(err));
};
Db();
