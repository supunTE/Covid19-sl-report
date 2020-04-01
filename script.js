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

var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";

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

var news = document.getElementById("news");

function renderNews(doc) {
  let carddiv = document.createElement('div');
  let img = document.createElement('img');
  let bodydiv = document.createElement('div');
  let title = document.createElement('h2');
  let description = document.createElement('h5');
  let channel = document.createElement('p');
  let button = document.createElement('a');
  let time = document.createElement('p');
  let small = document.createElement('small');
  let i = document.createElement('i');
  let b = document.createElement('b');

  var imgDb = doc.img;
  var captionDb = doc.caption;
  if (doc.description) {
    var descriptionDb = doc.description;
  }
  var channelDb = doc.channel;
  var linkDb = doc.link;

  var dateDb =  new Date(doc.time.seconds*1000);
  var hrsDb = dateDb.getHours();
  if(hrsDb==00){
    hrsDb = 12;
  }
  if(hrsDb>12){
    hrsDb -= 12;
  }  
  if(hrsDb<10){
    hrsDb = '0' + hrsDb;
  }
  var minsDb = dateDb.getMinutes();
  if(minsDb<10){
    minsDb = '0' + minsDb;
  }
  var hrsUTC = dateDb.getHours();
  if(hrsUTC<12){
      tmformat = 'AM';
  }else{
      tmformat = 'PM';
  }

  var timeDb = dateDb.getDate() + ' ' + month[dateDb.getMonth()] + ', ' + dateDb.getFullYear() + ' | ' + hrsDb + ':' + minsDb + ' ' + tmformat;

  if(channelDb == 'News1st'){
    carddiv.setAttribute('class', 'card text-white newsfirst');
  }else if(channelDb == 'AdaDerana'){
    carddiv.setAttribute('class', 'card text-white adaderana');
  }else if(channelDb == 'BBC'){
    carddiv.setAttribute('class', 'card text-white bbc');
  }else{
    carddiv.setAttribute('class', 'card text-white other');
  }
//   carddiv.setAttribute('data-id', idDb);

  img.setAttribute('class', 'card-img-top news-image');
  img.setAttribute('src', imgDb);
  img.setAttribute('alt', 'img');
  ///

  carddiv.appendChild(img);

  bodydiv.setAttribute('class', 'card-body news-body');

  title.setAttribute('class', 'card-title news-title');
  b.textContent = captionDb;
  title.appendChild(b);

  if (doc.description) {
    description.setAttribute('class', 'card-text');
    description.textContent = descriptionDb;
  }

  channel.setAttribute('class', 'card-text');  
  i.textContent = 'Source - ' + channelDb;
  channel.appendChild(i);

  if(channelDb == 'News1st'){
    button.setAttribute('class', 'btn btn-warning');
  }else if(channelDb == 'AdaDerana'){
    button.setAttribute('class', 'btn btn-danger');
  }else if(channelDb == 'BBC'){
    button.setAttribute('class', 'btn btn-dark');
  }else{
    button.setAttribute('class', 'btn btn-primary');
  }
  button.setAttribute('href', linkDb);
  button.setAttribute('target', '_blank');
  button.textContent = 'Visit...';

  time.setAttribute('class', 'card-text news-time');
  small.textContent = timeDb;
  time.appendChild(small);

  bodydiv.appendChild(title);
  if (doc.description) {
    bodydiv.appendChild(description);
  }
  bodydiv.appendChild(channel);
  bodydiv.appendChild(button);
  bodydiv.appendChild(time);
  ///

  carddiv.appendChild(bodydiv);
  ///

  news.appendChild(carddiv);
};

newsDb = db.collection("news");

newsDb.orderBy("time", "desc").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            renderNews(doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

