# Temperature - Carbon Emissions Relationship
In this project, I have tried to look at the effects of global Carbon emissions on average temperatures of countries and geographic regions over a period of time.

Link: https://arihant-jain.github.io/Temperature-Carbon-Relationship/

## Context
As widely known that CO2 is a greenhouse gas which means that when it is released in the earth’s atmosphere, it tries to trap the heat and works as a blanket over the earth. This is called the Greenhouse Effect. Though to some extent, this greenhouse effect is good for life on earth as it keeps the earth warm, but if the levels of CO2 and other greenhouse gases like Methane increases beyond a certain extent, it could lead to more heat trapped within earth’s atmosphere and rise in temperatures. This phenomenon is widely known as Global Warming.

The dataset we have, gives the monthly average temperatures for all countries from the mid-eighteenth century up until 2013. Though not all countries’ data is available from that time, at least 100 years of data is available for each country. Another dataset has the amount of Carbon emissions globally over the period - 1751 to 2014. But we will look at the data from 1921 to 2012 as we have complete data only from 1890 and we have utilised first 30 years data to calculate the average annual temperature for each country.

This project tries to identify any relationship between global temperatures and global Carbon emissions.

## Audience
Students, faculty members, politicians and anyone who wants to know more about global warming and what may be one of its causes. Besides, those interested to see how earth’s (land only) temperatures have increased over the years would enjoy looking at the visualisation.

## Data Sources
1. Global Average Land Temperature by Country
https://www.kaggle.com/berkeleyearth/climate-change-earth-surface-temperature-data/version/2
Description: This data contains the average monthly temperatures of all countries. Every country data is available but the time period is different for some countries. However, at least 100 years of data is available for each country.
Format: .CSV file  
Number of rows: 577463
Number of columns: 4
Type of data: Tabular (with Country names)

2. Global Fossil-Fuel CO2 Emissions
https://cdiac.ess-dive.lbl.gov/trends/emis/tre_coun.html
Description: This data shows the amount of global CO2 emissions over the period - 1751 to 2014.
Format: .CSV file
Number of rows: 266
Number of columns: 7
Type of data: Tabular

## Data Preparation
As specified above, the temperature dataset used contains half a million rows. It takes a significant amount of time to wrangle and process that data. This was done using python. Some of the steps are:
1.	Filter out missing data
2.	Remove those years data where less than 12 months data is available
3.	Take yearly averages out of monthly temperature data for each country
4.	Take the average of temperatures between 1891 to 1920 for each country
5.	Calculate variation of average temperature for each year from the average temperature calculated in step 4 for the period - 1921 to 2012 for each country
6.	Segregate regions/continents and countries
7.	Rename countries where spelling is wrong

## Implementation
The visualisation developed contains a heatmap and a line chart which have similar time axes and is built using D3 and JavaScript. The heatmap lists all countries on the vertical axis and time on the horizontal axis. The colour of the boxes denote the temperature variation/anomaly compared to the average of temperatures in 30 years from 1890 to 1920. And thus, the plot starts from 1921 and goes till 2012.

As the heatmap is quite big and doesn’t fit on the screen at once, a pop-up box has been added to show up when the user hover the mouse cursor on any of the boxes and shows the following details - country, year, annual average temperature and temperature variation (from the 30 years average). Also, the legend of the heatmap has been made to float over the screen and stay at the top when scrolling up and down the webpage.

Exactly below this heatmap is a line chart depicting the total amount of global carbon emissions (in million metric tons) over the same period of time as the heatmap. For a more precise view, a pop-up box, similar to the heatmap, has been added which, upon mouse hover on each data point, displays the year and global Carbon emission amount in million metric tons, and highlights that data point.

Click on the ***Show By*** radio buttons to view the heatmap by countries or by regions/continents.

## Libraries Used
For visualisation, this project uses:
1.	D3 version 4
2.	D3 Chromatic version 1
3.	HTML, CSS and JavaScript
For data wrangling, I utilised:
1.	Python version 3
2.	Pandas library
3.	Regex library

## User Guide
Steps to use the visualisation:
1.	Read the description on the web page to know what the visualisation is about.
2.  Select your preferred view using the ***Show By*** radio buttons.
<p align="center">
  <img width="250" height=""30 src="https://github.com/arihant-jain/Temperature-Carbon-Relationship/blob/master/Images/filter.PNG" alt="Show By control"/>
</p>

3.	Look at the heatmap to see how the temperature has varied for each country/region over the period of 1921 to 2012.
<p align="center">
  <img width="900" height=""250 src="https://github.com/arihant-jain/Temperature-Carbon-Relationship/blob/master/Images/heatmap.PNG" alt="Heatmap"/>
</p>

4.	Use the legend to find the temperature variation corresponding to different colour levels.
<p align="center">
  <img width="400" height="70" src="https://github.com/arihant-jain/Temperature-Carbon-Relationship/blob/master/Images/legend.PNG" alt="Legend"/>
</p>

5.	Scroll up - down the page to see the country you are interested in. The countries/regions are alphabetically arranged.
6.	Hover the mouse cursor on any box on the heatmap to highlight it and to find the country/region and year that box represents. The pop-up box that appears also shows the annual average temperature that year for that country and the temperature variance.
<p align="center">
  <img width="250" height="90" src="https://github.com/arihant-jain/Temperature-Carbon-Relationship/blob/master/Images/pop1.PNG" alt="Pop-up Box"/>
</p>

7.	Scroll all the way down to see the global emissions line chart.
<p align="center">
  <img width="800" height="300" src="https://github.com/arihant-jain/Temperature-Carbon-Relationship/blob/master/Images/lineChart.PNG" alt="Line Chart"/>
</p>

8.	Hover over any dot on this chart to highlight it and to see the year and total Carbon emissions that year.
<p align="center">
  <img width="210" height="80" src="https://github.com/arihant-jain/Temperature-Carbon-Relationship/blob/master/Images/pop2.PNG" alt="Pop-up Box"/>
</p>
 
## Conclusion
Through this visualisation, we found that as the global Carbon emissions increased beyond the levels of 5000 million metric tons around the year 1980, the average temperatures also increased. The variation in temperatures (of around 1 degree Celsius) may seem very small but such a small variation is highly significant because, according to the environmentalists and other experts, the overall earth’s temperature change should be kept under 2 degree Celsius to prevent irreversible change to our planet which involves loss of biodiversity among many threats.

## References
1.	Create Heatmap in D3
https://www.d3-graph-gallery.com/graph/heatmap_basic.html
2.	Create gradient legend
https://bl.ocks.org/duspviz-mit/9b6dce37101c30ab80d0bf378fe5e583
3.	Highlight elements
https://www.d3-graph-gallery.com/graph/heatmap_style.html
4.	Create Line charts
https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89
5.	Create Pop-up box on mouse hovers
https://codepen.io/valmassoi/pen/aNGryB
6.	Add axes labels
https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
7.	Access property in D3
https://stackoverflow.com/questions/28723447/getting-the-properties-of-an-element-in-d3-is-not-elegant
8.	D3 online editor
https://www.tutorialspoint.com/online_d3js_editor.php
9.	Make HTML elements stick
https://www.w3schools.com/howto/howto_js_sticky_header.asp
