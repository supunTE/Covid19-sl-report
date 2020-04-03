#import the Beautiful soup functions to parse the data returned from the website
from bs4 import BeautifulSoup
# Import pandas to make data tables and to import it to CSV
import pandas as pd
#import the library used to query a website
import urllib.request
class AppURLopener(urllib.request.FancyURLopener):
    version = "Mozilla/5.0"
#specify the url
website = "https://www.google.com/covid19-map/"
#Query the website and return the html to the variable 'page'
page = AppURLopener().open(website) 

#Parse the html in the 'page' variable, and store it in Beautiful Soup format
soup = BeautifulSoup(page, 'html.parser')

# print(soup.title)

all_tables = soup.find_all('table', class_='SAGQRd')

right_table = all_tables[0]

rows = right_table.findAll("tr")
    
datas = rows[1].findAll("td")

#print('Confirmed Cases : ' + datas[1].string)
#print('Recovered : ' + datas[3].string)
#print('Deaths : ' + datas[4].string)

# make a table from the data
stat = pd.DataFrame(
    {
       'Confirmed Cases': [datas[1].string],
       'Recovered':  [datas[3].string],
       'Deaths': [datas[4].string],
    }
)

print(stat)

html = (stat.to_html())
# Export the table to csv
stat.to_csv('stats.csv')

# Export the table to HTML
stat.to_html('stats.html')

print(html)