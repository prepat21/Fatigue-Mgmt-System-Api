const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema/schema.js");
const path = require("path");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

const helmet = require("helmet");

const app = express();

//connect to database
mongoose.set("strictQuery", true).connect(process.env.MONGO_URI);

app.use(cors());

app.use(
  "/graphql?",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "production",
  })
);

app.get("/", (req, res) => {
  res.send("404 URL WAS NOT FOUND");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
