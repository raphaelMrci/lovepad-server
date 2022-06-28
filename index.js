const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const cool = require("cool-ascii-faces");
const path = require("path");

var app = express();
var fire = require("./fire");
var serviceAccount = require("./lovepad-860c7-firebase-adminsdk-wvev3-6ccca651eb.json");
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(express.static(path.join(__dirname, "public")))
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .get("/", (req, res) => res.send(cool()))
    .get("/cool", (req, res) => res.send(cool()))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const db = fire.database();
const phone0 = db.ref("0");
const phone1 = db.ref("1");
const phone2 = db.ref("2");
const phone3 = db.ref("3");

// This registration token comes from the client FCM SDKs.
const registrationToken =
    "dxXsxFEJTGS4z_f8gWkft8:APA91bGbyMdXnYhZkqBFi1-7jGn0y9IXQEpHmqfEpCpI8JhmaZumTkPvqnChoX7crhH9RXgrHsJAzoUF-EP_hOAeKi38L_s6xuwwi5CXojFPUQSWvFE1Y7pPpRNmaBKrWNV12Y_jKs4h";

phone0.on(
    "value",
    (snapshot) => {
        if (snapshot.val().value.state) {
            sendFCM(0);
        }
    },
    (errorObject) => {
        console.log("The read failed: " + errorObject.name);
    }
);

phone1.on(
    "value",
    (snapshot) => {
        if (snapshot.val().value.state) {
            sendFCM(1);
        }
    },
    (errorObject) => {
        console.log("The read failed: " + errorObject.name);
    }
);

phone2.on(
    "value",
    (snapshot) => {
        if (snapshot.val().value.state) {
            sendFCM(2);
        }
    },
    (errorObject) => {
        console.log("The read failed: " + errorObject.name);
    }
);

phone3.on(
    "value",
    (snapshot) => {
        if (snapshot.val().value.state) {
            sendFCM(3);
        }
    },
    (errorObject) => {
        console.log("The read failed: " + errorObject.name);
    }
);

function sendFCM(phoneID) {
    console.log("------------------------------------------");
    console.log(phoneID);
    console.log(phoneID.toString());
    const message = {
        data: {
            phone_id: phoneID.toString(),
        },
        token: registrationToken,
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    fire.messaging()
        .send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log("Successfully sent message:", response);
            setToFalse(phoneID);
        })
        .catch((error) => {
            console.log("Error sending message:", error);
        });
}

function setToFalse(phoneID) {
    let phoneRef;
    switch (phoneID) {
        case 0:
            phoneRef = phone0;
            break;
        case 1:
            phoneRef = phone1;
            break;
        case 2:
            phoneRef = phone2;
            break;
        case 3:
            phoneRef = phone3;

        default:
            break;
    }

    phoneRef.set({
        value: {
            state: false,
        },
    });
}
