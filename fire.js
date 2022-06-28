var firebase = require("firebase-admin");
// change lines below with your own Firebase snippets!

var serviceAccount = require("./lovepad-860c7-firebase-adminsdk-wvev3-6ccca651eb.json");

const fire = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL:
        "https://lovepad-860c7-default-rtdb.europe-west1.firebasedatabase.app/",
});
module.exports = fire;
