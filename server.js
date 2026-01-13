// TODO: fill in your test secret API key.
const stripe = require("stripe")("sk_test_xxx");
const express = require("express");
const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/create-checkout-session", async (req, res) => {
  // TODO: fill me in...
});

app.listen(4242, () => console.log("Running on port 4242"));
