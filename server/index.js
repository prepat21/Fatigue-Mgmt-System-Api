const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const connectDB = require("./config/db.js");
const schema = require("./schema/schema.js");

const port = process.env.PORT || 5000;

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

app.get("/", (req, res) => {
  res.send("404 URL WAS NOT FOUND");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
