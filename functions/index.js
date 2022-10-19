const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebase = require("firebase");
require('firebase/auth');
const serviceAccount = require("../service_account.json");
const { config } = require('./config')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // serviceAccountId: '334013474211-v6drqrad3vrj0l0qa8v8rnrhcbf4t53t.apps.googleusercontent.com@tenancy-test-a49bb.iam.gserviceaccount.com'
});

firebase.initializeApp(config);


const email = "blakewoodjr84@gmail.com";
const password = "qwerty";
const tenantId = "first-tenant-95cpf";

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  let list = [];
  const tenantManager = admin
    .auth()
    .tenantManager()
    .listTenants(100)
    .then((result) => {
      result.tenants.forEach((tenant) => {
        list.push(tenant.toJSON());
        console.log(tenant.toJSON());
      });
    });

  response.send("BOOM SHAKA!");
});

exports.authenticateUser = functions.https.onRequest((request, response) => {
  const auth = firebase.auth();
  auth.tenantId = tenantId;
  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    console.log('success!');
    console.log(userCredential.user.uid);
    const uid = userCredential.user.uid;
    admin.auth().createCustomToken(uid).then((customToken) => {
      console.log('CUSTOM TOKEN: ', customToken);
      response.send(customToken);
    })
  });
  
});
