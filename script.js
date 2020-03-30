// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyDQJ5gZ5boj0LV__nyBMcIfCyWNTJKugx8",
    authDomain: "covidsl-59df9.firebaseapp.com",
    databaseURL: "https://covidsl-59df9.firebaseio.com",
    projectId: "covidsl-59df9",
    storageBucket: "covidsl-59df9.appspot.com",
    messagingSenderId: "816288189009",
    appId: "1:816288189009:web:7edaff32bfddf44e0d0670",
    measurementId: "G-SKWZ49LYVV"
};
// Initialize Firebase
firebase.initializeApp(config);
const db = firebase.firestore();

const settings = {timestampsInSnapshots: true};
db.settings(settings);

var docRef = db.collection("data").doc("lk");

var totalInfected = document.getElementById('totalInfected');
var activeCases = document.getElementById('activeCases');
var recovered = document.getElementById('recovered');
var suspected = document.getElementById('suspected');
var deaths = document.getElementById('deaths');

docRef.get().then(function(doc) {
    var totalInfectedno = doc.data().total_infected;
    var recoveredno = doc.data().recovered;
    var suspectedno = doc.data().suspected;
    var deathsno = doc.data().deaths;

    totalInfected.innerHTML = totalInfectedno;
    activeCases.innerHTML = totalInfectedno-(recoveredno+deathsno);
    recovered.innerHTML = recoveredno;
    suspected.innerHTML = suspectedno;
    deaths.innerHTML = deathsno;
});

    

// index.esm.js:77 [2020-03-29T22:20:06.227Z]  @firebase/firestore: Firestore (5.0.3): 
// The behavior for Date objects stored in Firestore is going to change
// AND YOUR APP MAY BREAK.
// To hide this warning and ensure your app does not break, you need to add the
// following code to your app before calling any other Cloud Firestore methods:

//   const firestore = firebase.firestore();
//   const settings = {/* your settings... */ timestampsInSnapshots: true};
//   firestore.settings(settings);

// With this change, timestamps stored in Cloud Firestore will be read back as
// Firebase Timestamp objects instead of as system Date objects. So you will also
// need to update code expecting a Date to instead expect a Timestamp. For example:

//   // Old:
//   const date = snapshot.get('created_at');
//   // New:
//   const timestamp = snapshot.get('created_at');
//   const date = timestamp.toDate();

// Please audit all existing usages of Date when you enable the new behavior. In a
// future release, the behavior will change to the new behavior, so if you do not
// follow these steps, YOUR APP MAY BREAK.