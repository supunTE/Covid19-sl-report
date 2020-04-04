//formatdata
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

//api

const api_url = "https://www.hpb.health.gov.lk/api/get-current-statistical";
var globalTotalAPI, globalDeathsAPI, globalRecoveredAPI, globalCasesTodayAPI, globalDeathsTodayAPI;

globalTotal = document.getElementById('global_total');
globalDeaths = document.getElementById('global_deaths');
globalRecovered = document.getElementById('global_recovered');
globalCasesToday = document.getElementById('global_cases_today');
globalDeathsToday = document.getElementById('global_deaths_today');
LastUpdated = document.getElementById('API_lastUpdated');

async function getData() {
  const response = await fetch(api_url);
  const all_data = await response.json();
  const data = all_data.data;

  globalTotalAPI = data.global_total_cases;
  globalDeathsAPI = data.global_deaths;
  globalRecoveredAPI = data.global_recovered;
  globalCasesTodayAPI = data.global_new_cases;
  globalDeathsTodayAPI = data.global_new_deaths;
  LastUpdatedAPI = data.update_date_time;

  globalTotal.innerHTML = formatNumber(globalTotalAPI);
  globalDeaths.innerHTML = formatNumber(globalDeathsAPI);
  globalRecovered.innerHTML = formatNumber(globalRecoveredAPI);
  globalCasesToday.innerHTML = formatNumber(globalCasesTodayAPI);
  globalDeathsToday.innerHTML = formatNumber(globalDeathsTodayAPI);
  LastUpdated.innerHTML = LastUpdatedAPI;

}

getData();