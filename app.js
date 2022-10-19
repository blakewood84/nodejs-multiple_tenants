const express = require("express");
const path = require("path");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFunctions, connectFunctionsEmulator } = require('firebase-admin/functions')
const serviceAccount = require("./service_account.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
  initializeApp({
    credential: cert(serviceAccount),
  });
});

app.get("/", (req, res) => {
  console.log("PING!");

  res.send({
    message: "ping!",
  });
});
