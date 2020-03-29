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

var docRef = db.collection("data").doc("lk");

var totalInfected = document.getElementById('totalInfected');
var activeCases = document.getElementById('activeCases');
var recovered = document.getElementById('recovered');
var suspected = document.getElementById('suspected');
var deaths = document.getElementById('deaths');

docRef.get().then(function(doc) {
    totalInfected.innerHTML = doc.data().total_infected;
    activeCases.innerHTML = doc.data().active_cases;
    recovered.innerHTML = doc.data().recovered;
    suspected.innerHTML = doc.data().suspected;
    deaths.innerHTML = doc.data().deaths;
});
