const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`DB CONNECTION SUCCESSFUL`);
  })
  .catch((e) => {
    console.log(e.message);
  });

app.listen(port, host, () => {
  console.log(`App running on port: ${port}...`);
});
