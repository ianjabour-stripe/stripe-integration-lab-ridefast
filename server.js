require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/create-checkout-session", async (req, res) => {
  // TODO: fill me in...
});

app.listen(4242, () => console.log("Running on port 4242"));
