//formatdata
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

//api
const api_url = "https://corona.lmao.ninja/v2/all";
var globalTotalAPI, globalDeathsAPI, globalRecoveredAPI, globalCasesTodayAPI, globalDeathsTodayAPI;

globalTotal = document.getElementById('global_total');
globalDeaths = document.getElementById('global_deaths');
globalRecovered = document.getElementById('global_recovered');
globalActive = document.getElementById('global_active');
globalCritical= document.getElementById('global_critical');
globalTests = document.getElementById('global_tests');
globalCasesToday = document.getElementById('global_cases_today');
globalDeathsToday = document.getElementById('global_deaths_today');
LastUpdated = document.getElementById('API_lastUpdated');

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

// function setup(){
//   loadJSON('https://www.hpb.health.gov.lk/api/get-current-statistical', gotData);
// }
// setup();
// function gotData(data){
//   console.log(data);
// }

function getDatefromStamp(timeStamp){
  var a = new Date(timeStamp); 
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getUTCFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  if(hour>12){
    var ap = "PM";
  }else{
    var ap = "AM";
  }
  if(hour>12){
    hour -= 12;
  }
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var sec = a.getSeconds();

  var time = date + ' ' + month + ' ' + year + ' | ' + hour + ':' + min + ':' + sec + ' ' + ap ;
  return time;
}

function getData(){
fetch(api_url)
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })

  .then(function(json) {
    globalTotalAPI = json.cases;
    globalDeathsAPI = json.deaths;
    globalRecoveredAPI = json.recovered;
    globalActiveAPI = json.active;
    globalCriticalAPI = json.critical;
    globalTestsAPI = json.tests;
    globalCasesTodayAPI = json.todayCases;
    globalDeathsTodayAPI = json.todayDeaths;
    // casesPerOneMillionAPI = json.casesPerOneMillion;
    // deathsPerOneMillionAPI = json.deathsPerOneMillion;
    // testsPerOneMillionAPI = json.testsPerOneMillion;
    // affectedCountriesAPI = json.affectedCountries;
    LastUpdatedAPI = getDatefromStamp(json.updated);

    globalTotal.innerHTML = formatNumber(globalTotalAPI);
    globalDeaths.innerHTML = formatNumber(globalDeathsAPI);
    globalRecovered.innerHTML = formatNumber(globalRecoveredAPI);
    globalActive.innerHTML = formatNumber(globalActiveAPI)
    globalCritical.innerHTML = formatNumber(globalCriticalAPI)
    globalTests.innerHTML = formatNumber(globalTestsAPI)
    globalCasesToday.innerHTML = 'Today: +' + formatNumber(globalCasesTodayAPI);
    globalDeathsToday.innerHTML = 'Today: +' + formatNumber(globalDeathsTodayAPI);
    LastUpdated.innerHTML = LastUpdatedAPI;
  })
}

getData();

//  https://newsapi.org/docs
var url = 'http://newsapi.org/v2/everything?' +
'q=COVID+corona&' +
'language=en&' +
'pageSize=5&' +
'excludeDomains=Youtube.com&' +
'sortBy=relevancy&' +
'apiKey=6814e8af1172455a95052c18d4a90f8b';

var globalNews = document.getElementById('globalNews');

fetch(url)
.then(function (response) {
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  return response.json();
})

.then(function (json) {
  var length = json.articles.length;
  for (a = 0; a < length; a++) {
    t = json.articles[a]
    globalNewsFunction(t.title, t.description, t.urlToImage, t.url, t.publishedAt, t.author, t.source.name);
  }
})

function globalNewsFunction(title, desc, imgUrl, url, time, author, source) {
  let a = document.createElement('a');
  let cardHTML = document.createElement('div');
  let imageHTML = document.createElement('div');
  let imgHTML = document.createElement('img');
  let bodyHTML = document.createElement('div');
  let titleHTML = document.createElement('h3');
  let descHTML = document.createElement('p');
  let timeHTML = document.createElement('h6');
  let authorHTML = document.createElement('h6');

  a.setAttribute('href', url);
  cardHTML.setAttribute('class', 'global-news-card bg-transparent-dark b-dark text-dark');
  imageHTML.setAttribute('class', 'image');
  imgHTML.setAttribute('class', 'col-4');
  imgHTML.setAttribute('id', 'global_news_img');
  imgHTML.setAttribute('src', imgUrl);
  bodyHTML.setAttribute('class', 'col');
  titleHTML.setAttribute('id', 'global_news_title');
  titleHTML.textContent = title;
  descHTML.setAttribute('id', 'global_news_desc');
  descHTML.textContent = desc;
  timeHTML.setAttribute('id', 'global_new_time');
  timeHTML.textContent = time.substring(0, 10);;
  authorHTML.setAttribute('id', 'global_new_author');
  authorHTML.textContent = author + '(' + source + ')';

  bodyHTML.appendChild(titleHTML);
  bodyHTML.appendChild(descHTML);
  bodyHTML.appendChild(timeHTML);
  bodyHTML.appendChild(authorHTML);
  imageHTML.appendChild(imgHTML);
  cardHTML.appendChild(imageHTML);
  cardHTML.appendChild(bodyHTML);
  a.appendChild(cardHTML);

  globalNews.appendChild(a);
}