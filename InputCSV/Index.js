const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

const data = require("./data.json");
const collectionKey = "DayUnHyouData";　//name of the collection

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ha-dou-uranai-aea55.firebaseio.com"});

const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

if (data && (typeof data === "object")) {
    Object.keys(data).forEach(DayBaiorizumNum => {
        firestore
        .collection(collectionKey)
        .doc()
        .set(data[DayBaiorizumNum])
        .then((res) => {
            console.log("Document " + DayBaiorizumNum + " successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    });
}