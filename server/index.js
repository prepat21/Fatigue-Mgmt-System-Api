const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema/schema.js");
const connectDB = require("./config/db");
const path = require("path");

const port = process.env.PORT || 5000;

const helmet = require("helmet");

const app = express();

//connect to database
connectDB();

app.use(cors());

app.use(
  "/graphql?",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "production",
  })
);

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__direname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
