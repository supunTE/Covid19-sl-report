#import the library used to query a website
import urllib.request
class AppURLopener(urllib.request.FancyURLopener):
    version = "Mozilla/5.0"
#specify the url
website = "https://www.google.com/covid19-map/"
#Query the website and return the html to the variable 'page'
page = AppURLopener().open(website) 
#import the Beautiful soup functions to parse the data returned from the website
from bs4 import BeautifulSoup
#Parse the html in the 'page' variable, and store it in Beautiful Soup format
soup = BeautifulSoup(page, 'html.parser')

# print(soup.title)

all_tables = soup.find_all('table', class_='SAGQRd')

right_table = all_tables[0]

rows = right_table.findAll("tr")
    
datas = rows[1].findAll("td")

print('Confirmed Cases : ' + datas[1].string)
print('Recovered : ' + datas[3].string)
print('Deaths : ' + datas[4].string)
