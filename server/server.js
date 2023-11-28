const express = require("express");
const https = require("https");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "../.env" });

const app = express();
const API_KEY_FMP = process.env.API_KEY_FMP;
const secretKey = process.env.secretKey;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const options = require("./knexfile");
// const knex = require("knex")(options);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   req.db = knex;
//   next();
// });

// code adapted from practical
// login route
app.post("/login", async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete, email and password required ",
    });
    return;
  }

  // check database for user
  const queryUsers = await req.db
    .from("users")
    .select("*")
    .where("email", "=", email);

  if (queryUsers.length === 0) {
    console.log("User does not exist.");
    res.json({
      error: true,
      message: "User does not exist.",
    });
    return;
  }

  const user = queryUsers[0];
  const match = await bcrypt.compare(password, user.hash);

  if (!match) {
    res.json({ error: true, message: "Password is incorrect." });
    return;
  }

  // const secretKey = "secret key";
  const expires_in = 60 * 60 * 24;

  const exp = Date.now() + expires_in * 1000;

  const token = jwt.sign({ email, exp }, secretKey);
  res.json({ token_type: "Bearer", token, expires_in });
});

// register route
app.post("/register", async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete, email and password required ",
    });
    return;
  }

  // check database for user
  const queryUsers = await req.db
    .from("users")
    .select("*")
    .where("email", "=", email);

  if (queryUsers.length > 0) {
    console.log("User already exists.");
    res.json({
      error: true,
      message: "User already exists.",
    });
    return;
  }

  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);

  await req.db.from("users").insert({ email, hash });

  res.status(201).json({ error: false, message: "Successfully added user." });
});

// get stocklist info
app.get("/api/stocklist", function (req, res) {
  const url = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY_FMP}`;

  https.get(url, function (response) {
    // ensure response is received from API before parsing
    let data = "";
    response.on("data", function (info) {
      data += info;
    });

    // parse data
    response.on("end", function () {
      const stock = JSON.parse(data);
      res.send(data);
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000. ");
});
