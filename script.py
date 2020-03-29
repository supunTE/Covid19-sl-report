#import the library used to query a website
import urllib.request
#specify the url
website = "https://www.google.com/covid19-map/"
#Query the website and return the html to the variable 'page'
page = urllib.request.urlopen(website) 
#import the Beautiful soup functions to parse the data returned from the website
from bs4 import BeautifulSoup
#Parse the html in the 'page' variable, and store it in Beautiful Soup format
soup = BeautifulSoup(page, 'html.parser')

print(soup.prettify())

# all_tables = soup.find('table', class_='table')

# right_table = all_tables[1]

# extract_contents = lambda row: [x.text.replace('\n', '') for x in row] 

# for row in right_table:
#     cells = extract_contents(row.find_all('td'))
    
# print(cells[6])
