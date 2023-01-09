const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const colors = require("colors");
const cors = require("cors");
const schema = require("./schema/schema.js");
const helmet = require("helmet");
const connectDB = require("./config/db");

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


app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "production",
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
