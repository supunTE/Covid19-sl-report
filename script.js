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

const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);

var docRef = db.collection("data").doc("lk");

var totalInfected = document.getElementById('totalInfected');
var activeCases = document.getElementById('activeCases');
var recovered = document.getElementById('recovered');
var suspected = document.getElementById('suspected');
var deaths = document.getElementById('deaths');
var deathRate = document.getElementById('deathRate');
var recoveryRate = document.getElementById('recoveryRate');

var activeCases2 = document.getElementById('activeCases-2');
var recovered2 = document.getElementById('recovered-2');
var deaths2 = document.getElementById('deaths-2');

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

docRef.get().then(function (doc) {
  totalInfectedno = doc.data().total_infected;
  recoveredno = doc.data().recovered;
  suspectedno = doc.data().suspected;
  deathsno = doc.data().deaths;

  window.document.title = '(' + totalInfectedno + ') ' + window.document.title ; 

  totalInfected.innerHTML = totalInfectedno;
  activeCases.innerHTML = totalInfectedno - (recoveredno + deathsno);
  recovered.innerHTML = recoveredno;
  suspected.innerHTML = suspectedno;
  deaths.innerHTML = deathsno;

  deathsRateno =  (deathsno/totalInfectedno)*100;
  recoveryRateno = (recoveredno/totalInfectedno)*100;
  
  deathRate.innerHTML = (Math.floor(deathsRateno*100)/100) + '%' ;
  recoveryRate.innerHTML = (Math.floor(recoveryRateno*100)/100) + '%';

  activeCases2.innerHTML = totalInfectedno - (recoveredno + deathsno);
  recovered2.innerHTML = recoveredno;
  deaths2.innerHTML = deathsno;

  document.getElementById('loading-news').style.display = "none";
  document.getElementById('myInput').style.display = "block";
  document.getElementById('see-all').style.display = "block";

});

var news = document.getElementById("news");

function renderNews(doc) {
  let carddiv = document.createElement('div');
  let img = document.createElement('img');
  let bodydiv = document.createElement('div');
  let hidediv = document.createElement('div');
  let title = document.createElement('h2');
  let contentdiv = document.createElement('div');
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

  var dateDb = new Date(doc.time.seconds * 1000);
  var hrsDb = dateDb.getHours();
  if (hrsDb == 00) {
    hrsDb = 12;
  }
  if (hrsDb > 12) {
    hrsDb -= 12;
  }
  if (hrsDb < 10) {
    hrsDb = '0' + hrsDb;
  }
  var minsDb = dateDb.getMinutes();
  if (minsDb < 10) {
    minsDb = '0' + minsDb;
  }
  var hrsUTC = dateDb.getHours();
  if (hrsUTC < 12) {
    tmformat = 'AM';
  } else {
    tmformat = 'PM';
  }

  var timeDb = dateDb.getDate() + ' ' + month[dateDb.getMonth()] + ', ' + dateDb.getFullYear() + ' | ' + hrsDb + ':' + minsDb + ' ' + tmformat;

  if (channelDb == 'News1st') {
    carddiv.setAttribute('class', 'card text-white newsfirst');
  } else if (channelDb == 'AdaDerana') {
    carddiv.setAttribute('class', 'card text-white adaderana');
  } else if (channelDb == 'BBC') {
    carddiv.setAttribute('class', 'card text-white bbc');
  } else {
    carddiv.setAttribute('class', 'card text-white other');
  }

  if (doc.img) {
    img.setAttribute('class', 'card-img-top news-image');
    img.setAttribute('src', imgDb);
    img.setAttribute('alt', 'img');

    carddiv.appendChild(img);
  }

  ///

  bodydiv.setAttribute('class', 'card-body news-body');

  title.setAttribute('class', 'card-title news-title');
  b.textContent = captionDb;
  title.appendChild(b);

  hidediv.setAttribute('class', 'hide-card');
  hidediv.appendChild(title);

  if (doc.description) {
    description.setAttribute('class', 'card-text news-description');
    description.textContent = descriptionDb;
  }

  channel.setAttribute('class', 'card-text');
  i.textContent = 'Source - ' + channelDb;
  channel.appendChild(i);

  if (channelDb == 'News1st') {
    button.setAttribute('class', 'btn btn-sm btn-warning');
  } else if (channelDb == 'AdaDerana') {
    button.setAttribute('class', 'btn btn-sm btn-danger');
  } else if (channelDb == 'BBC') {
    button.setAttribute('class', 'btn btn-sm btn-dark');
  } else {
    button.setAttribute('class', 'btn btn-sm btn-primary');
  }
  button.setAttribute('href', linkDb);
  button.setAttribute('target', '_blank');
  button.textContent = 'Visit...';

  time.setAttribute('class', 'card-text news-time');
  small.textContent = timeDb;
  time.appendChild(small);

  contentdiv.setAttribute('class', 'content-card');
  if (doc.description) {
    contentdiv.appendChild(description);
  }
  contentdiv.appendChild(channel);
  contentdiv.appendChild(button);
  contentdiv.appendChild(time);

  bodydiv.appendChild(hidediv);
  bodydiv.appendChild(contentdiv);
  ///

  carddiv.appendChild(bodydiv);
  ///

  news.appendChild(carddiv);
  
};

newsDb = db.collection("news");

newsDb.orderBy("time", "desc").limit(15).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      renderNews(doc.data());
    });
    // var coll = document.getElementsByClassName("hide-card");
    // var i;
  
    // for (i = 0; i < coll.length; i++) {
    //   coll[i].addEventListener("click", function () {
    //     this.classList.toggle("active");
    //     var content = this.nextElementSibling;
    //     if (content.style.maxHeight) {
    //       content.style.maxHeight = null;
    //     } else {
    //       content.style.maxHeight = content.scrollHeight + "px";
    //     }
    //   });
    // }
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });

//search function
function searchFunction() {
  var input, filter, news, card, a, i, txtValue, searchNone, noNews;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  news = document.getElementById("news");
  card = news.getElementsByClassName("card");
  noNews = document.getElementById("noNews");
  searchNone = true;
  noNews.style.display = "none";
  for (i = 0; i < card.length; i++) {
    a = card[i].getElementsByTagName("h2")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      card[i].style.display = "";
      searchNone = false;
    } else {
      card[i].style.display = "none";
    }
  }
  if (searchNone == true) {
    noNews.style.display = "block";
  }
}

//hide cards | hide animation

var tableDetails, statusAnimation;
tableDetails = document.getElementById('table-sl-details');
statusAnimation = document.getElementById('status-animation');

function hidestatuscard() {
  tableDetails.style.display = "block";
  tableDetails.style.opacity = "1";
  statusAnimation.style.display = "none";
  statusAnimation.style.opacity = "0";
}

function hidetabledetails() {
  tableDetails.style.display = "none";
  tableDetails.style.opacity = "0";
  statusAnimation.style.display = "block";
  statusAnimation.style.opacity = "1";
}

// //formatdata
// function formatNumber(num) {
//   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
// }

//api global data
// const api_url = "https://www.hpb.health.gov.lk/api/get-current-statistical";
// var globalTotalAPI, globalDeathsAPI, globalRecoveredAPI, globalCasesTodayAPI, globalDeathsTodayAPI;

// globalTotal = document.getElementById('global_total');
// globalDeaths = document.getElementById('global_deaths');
// globalRecovered = document.getElementById('global_recovered');
// globalCasesToday = document.getElementById('global_cases_today');
// globalDeathsToday = document.getElementById('global_deaths_today');
// LastUpdated = document.getElementById('API_lastUpdated');

// async function getData() {
//   const response = await fetch(api_url);
//   const all_data = await response.json();
//   const data = all_data.data;

//   globalTotalAPI = data.global_total_cases;
//   globalDeathsAPI = data.global_deaths;
//   globalRecoveredAPI = data.global_recovered;
//   globalCasesTodayAPI = data.global_new_cases;
//   globalDeathsTodayAPI = data.global_new_deaths;
//   LastUpdatedAPI = data.update_date_time;

//   globalTotal.innerHTML = formatNumber(globalTotalAPI);
//   globalDeaths.innerHTML = formatNumber(globalDeathsAPI);
//   globalRecovered.innerHTML = formatNumber(globalRecoveredAPI);
//   globalCasesToday.innerHTML = formatNumber(globalCasesTodayAPI);
//   globalDeathsToday.innerHTML = formatNumber(globalDeathsTodayAPI);
//   LastUpdated.innerHTML = LastUpdatedAPI;

// }

// Hospital Data
const api_url = "https://www.hpb.health.gov.lk/api/get-current-statistical";

tableHospitals = document.getElementById('sl-hospitals-details');

function getData(){
  fetch(api_url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
  
    .then(function(json) {
      hospitals = json.data.hospital_data;
      hospitals.forEach(function(hospital){

        let tr = document.createElement('tr');
        let hospitalName = document.createElement('td');
        let SLpatientsnum = document.createElement('td');
        let Foreignpatientsnum = document.createElement('td');
        let Totalpatientsnum = document.createElement('td');

        var hospitalNameAPI = hospital.hospital.name;
        var SLpatientsnumAPI = hospital.treatment_local;
        var ForeignpatientsnumAPI = hospital.treatment_foreign;
        var Totalpatientsnumdata = SLpatientsnumAPI + ForeignpatientsnumAPI;

        hospitalName.setAttribute('class', 'hospital-name');
        hospitalName.textContent = hospitalNameAPI;
        SLpatientsnum.setAttribute('class', 'sl-patients');
        SLpatientsnum.textContent = SLpatientsnumAPI;  
        Foreignpatientsnum.setAttribute('class', 'foreign-patients');
        Foreignpatientsnum.textContent = ForeignpatientsnumAPI;
        Totalpatientsnum.setAttribute('class', 'total-patients');
        Totalpatientsnum.textContent = Totalpatientsnumdata;

        tr.appendChild(hospitalName);
        tr.appendChild(SLpatientsnum);
        tr.appendChild(Foreignpatientsnum);
        tr.appendChild(Totalpatientsnum);

        tableHospitals.appendChild(tr); 
      });
    })
  
  }
  
  getData();

// getData();

function detectBrowser() {
  if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
    // alert('Opera');
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    // if (window.confirm('We found that you have a browser that does not support our website! You may encounter several problems when data appears. If you click OK You can try our minified version, or you can cancel this and visit the original site.')) {
    //   window.location.href = '/minified.html';
    // };
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    // alert('Safari');
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    // alert('Firefox');
  } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
  {
    tableDetails.style.display = "block";
    tableDetails.style.opacity = "1";
    statusAnimation.style.display = "none";
    statusAnimation.style.opacity = "0";
  } else {
    // alert('unknown');
  }
}