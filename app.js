const express = require('express');
const path = require('path');
const { initializeApp, cert } = require("firebase-admin/app");
const serviceAccount = require("./service_account.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`);
    initializeApp({
        credential: cert(serviceAccount)
    });
});