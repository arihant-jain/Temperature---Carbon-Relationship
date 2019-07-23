window.onload = function(){
    filterplot();
}
function loadplots(filterby) {

    // Loading temperature dataset
    d3.csv("Global Temp By Country.csv", function(d){

        // List for regions and years
        var regions = [], years = [], regionsData = [];

        // Populating countries list, regions list and getting minimum temperature
        // variation and maximum temperature variation
        var flags = [], length = d.length, min = 0, max = 0;
        for(var i=0; i<length; i++) {
            if(filterby == 'country'){
                if(d[i].Type == 'C'){
                    if(min > parseFloat(d[i].TemperatureDifference))
                        min = parseFloat(d[i].TemperatureDifference);

                    if(max < parseFloat(d[i].TemperatureDifference))
                        max = parseFloat(d[i].TemperatureDifference);
                    
                    regionsData.push(d[i]);
                    
                    if(flags[d[i].Country]) 
                        continue;
                    flags[d[i].Country] = true;
                    regions.push(d[i].Country);
                }
            }
            else{
                if(d[i].Type == 'R'){
                    if(min > parseFloat(d[i].TemperatureDifference))
                        min = parseFloat(d[i].TemperatureDifference);

                    if(max < parseFloat(d[i].TemperatureDifference))
                        max = parseFloat(d[i].TemperatureDifference);
                    
                    regionsData.push(d[i]);
                    
                    if(flags[d[i].Country]) 
                        continue;
                    flags[d[i].Country] = true;
                    regions.push(d[i].Country);
                }
            }
        }
        
        // Getting number of countries and regions
        regionsCount = regions.length;

        // Populating years list
        for(i = 1921; i <= 2012; i++){
            years.push(i)
        }

        // set the dimensions and margins of the graph
        var margin = {top: 50, right: 230, bottom: 50, left: 230},
        width = screen.width - 30,
        //width = years.length * 10 + margin.left + margin.right,
        height = regionsCount * 15 + margin.top + margin.bottom;
        //console.log("screen width: " + width);
        console.log("min: "+min.toFixed(3))
        console.log("max: "+max.toFixed(3))
        // console.log(regionsData);

        ///////////////////////////////////////////////////////
        //////////////       LEGEND         ///////////////////
        ///////////////////////////////////////////////////////
        // Setting width and height
        var w = 340, h = 50;
        
        // Adding legend at top
        var key = d3.select("#legend1")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("transform","translate(" + ((width - margin.left - margin.right)/2 + margin.left - w/2) + ",0)");
        
        // Adding border to the legend
        key.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", h)
            .attr("width", w)
            .style("stroke", "black")
            .style("fill", "white")
            .style("stroke-width", 1);

        var legend = key.append("defs")
            .append("svg:linearGradient")
            .attr("id", "gradient")
            .attr("x1", "0%")
            .attr("y1", "100%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        // Setting colours for different percentages
        legend.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#051937")
            .attr("stop-opacity", 1);

        legend.append("stop")
            .attr("offset", "16.667%")
            .attr("stop-color", "#004d7a")
            .attr("stop-opacity", 1);

        legend.append("stop")
            .attr("offset", "33.334%")
            .attr("stop-color", "#008793")
            .attr("stop-opacity", 1);
        
        legend.append("stop")
            .attr("offset", "50.001%")
            .attr("stop-color", "#00bf72")
            .attr("stop-opacity", 1);
        
        legend.append("stop")
            .attr("offset", "66.668%")
            .attr("stop-color", "#a8eb12")
            .attr("stop-opacity", 1);
        
        legend.append("stop")
            .attr("offset", "83.335%")
            .attr("stop-color", "#EB9312")
            .attr("stop-opacity", 1);

        legend.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#FF0000")
            .attr("stop-opacity", 1);

        // Drawing the colour bar
        key.append("rect")
            .attr("width", w - 40)
            .attr("height", h - 35)
            .style("fill", "url(#gradient)")
            .attr("transform", "translate(20,5)");

        // Setting scale
        var x = d3.scaleLinear()
            .range([0, 300])
            .domain([min.toFixed(3), max.toFixed(3)]);

        // Positioning scale
        var xAxis = d3.axisBottom()
            .scale(x)
            .ticks(5);

        // Adding scale
        key.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(20,20)")
            .call(xAxis)
        
        // Adding text label to the legend
        key.append("text")
            .attr("x", (w - 40)/2 + 20)
            .attr("y", 45)
            .style("text-anchor", "middle")
            .text("Temperature Variance (°C)");

        ///////////////////////////////////////////////////////////
        /////////////////    HEATMAP    ///////////////////////////
        ///////////////////////////////////////////////////////////

        // append the svg object to the body of the page
        var svg = d3.select("#heatmap")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

        // Build X scales
        var x = d3.scaleBand()
            .range([ 0, width - margin.left - margin.right ])
            .domain(years)
            .padding(0.01);

        // Building bottom axis
        svg.append("g")
            .attr("transform", "translate(0," + (height - margin.bottom - margin.top) + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.5em")
            .attr("transform", "rotate(-90)");
        
        // Building top axis
        svg.append("g")
            .attr("transform", "translate(0,-1)")
            .call(d3.axisTop(x))
            .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "3.0em")
            .attr("dy", "1.25em")
            .attr("transform", "rotate(-90)");

        // Build Y scales
        var y = d3.scaleBand()
            .range([ height - margin.bottom - margin.top, 0 ])
            .domain(regions)
            .padding(0.01);

        // Buidling left axis
        svg.append("g")
            .attr("transform", "translate(-1,0)")
            .call(d3.axisLeft(y));

        // Building right axis
        svg.append("g")
            .attr("transform", "translate(" + (width - margin.right - margin.left) + ",0)")
            .call(d3.axisRight(y));

        // Build color scale
        var myColor = d3.scaleLinear()
        .range(["#051937", "#004d7a", "#008793", "#00bf72", "#a8eb12", "#EB9312", "#FF0000"])
        .domain([min, (max-min)/6 + min, 2*(max-min)/6 + min, 3*(max-min)/6 + min, 4*(max-min)/6 + min, 5*(max-min)/6 + min, max])

        // Adding boxes to the heatmap
        svg.selectAll()
            .data(regionsData, function(d) {return d.Country+':'+d.Year;})
            .enter()
            .append("rect")
            .attr("x", function(d) { return x(d.Year) })
            .attr("y", function(d) { return y(d.Country) })
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth() )
            .style("fill", function(d) { return myColor(d.TemperatureDifference)} )

            // Mouse over event
            .on("mouseover", function(d) {
                d3.select(this)
                    .style("stroke", "white")
                    .style("opacity", 1)
                //TOOLTIP 
                div.transition()        
                    .duration(200)      
                    .style("opacity", .9);      
                div.html("<b>Country: " + d.Country + "</b>" +
                          "<br><b>Year: " + d.Year + "</b>" +
                          "<br>Average Temperature: " + (parseFloat(d.AverageTemperature)).toFixed(3) + " °C" +
                          "<br>Temperature Variance: " + (parseFloat(d.TemperatureDifference)).toFixed(3) + " °C"
                        )  
                .style("left", (d3.event.pageX + 20) + "px")     
                .style("top", (d3.event.pageY + 20) + "px"); 
            })
            // Mouse out event
            .on("mouseout", function(d) {
                d3.select(this)
                    .style("stroke", "none")
                    .style("opacity", 1)       
                div.transition()        
                    .duration(500)      
                    .style("opacity", 0);   
            });

        //TOOLTIP
        var div = d3.select("#chartCanvas").append("div")   
        .attr("class", "tooltip")      
        .attr("id","tooltip")
        .style("margin-top", -80)         
        .style("opacity", 0);

        //////////////////////////////////////////////////////////////
        //////////////////       LINE CHART       ////////////////////
        //////////////////////////////////////////////////////////////

        // Carbon emissions line chart

        // Reading data
        d3.csv("emissions global.csv", function(poldata){
            // Use the margin convention practice 
            var margin = {top: 50, right: 230, bottom: 50, left: 230},
            // width = years.length * 10 + margin.left + margin.right, 
            width = screen.width - 30,
            height = 350 - margin.top - margin.bottom,
            radius = 3;

            // X scale will use the years from our data
            var xScale = d3.scaleLinear()
                .domain([1921, 2012]) // input
                .range([0, width - margin.left - margin.right]); // output

            // Y scale will use the Carbon emissions amount 
            var yScale = d3.scaleLinear()
                .domain([750, 10000]) // input 
                .range([height, 0]); // output

            // d3's line generator
            var line = d3.line()
                .x(function(d, i) { return xScale(d.Year); }) // set the x values for the line generator
                .y(function(d) { return yScale(d.TotalEmissions); }) // set the y values for the line generator

            // Add the SVG to the page
            var svg = d3.select("#linechart")
                .append("svg")
                .attr("width", width)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Call the x axis in a group tag
            svg.append("g")
                .attr("fill", "black")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom
            
            // text label for the x axis
            svg.append("text")             
                .attr("transform", "translate(" + ((width - margin.left - margin.right)/2) + " ," + (height + 50) + ")")
                .style("text-anchor", "middle")
                .text("Years");

            // Call the y axis in a group tag
            svg.append("g")
                .attr("fill", "black")
                .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft
            
            // text label for the y axis
            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -80)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Global Carbon Emissions (million metric tons)");  

            // Append the path, bind the data, and call the line generator 
            svg.append("path")
                .datum(poldata) // Binds data to the line 
                .attr("class", "line") // Assign a class for styling 
                .attr("d", line); // Calls the line generator 

            // Appends a circle for each datapoint 
            svg.selectAll(".dot")
                .data(poldata)
                .enter().append("circle") // Uses the enter().append() method
                .attr("class", "dot") // Assign a class for styling
                .attr("cx", function(d, i) { return xScale(d.Year) })
                .attr("cy", function(d) { return yScale(d.TotalEmissions) })
                .attr("r", radius)

                // Mouse over event
                .on("mouseover", function(d) { 
                    // Use D3 to select element, change color and size
                    d3.select(this).attr('class', 'focus')
                    //TOOLTIP
                    div.transition()        
                        .duration(200)      
                        .style("opacity", .9);      
                    div.html("<b>Year: " + d.Year + "</b>" +
                            "<br>Carbon Emissions: " + (parseFloat(d.TotalEmissions)).toFixed(1) + "<br>(Million Metric Tons)"
                            )  
                        .style("left", (d3.event.pageX + 20) + "px")     
                        .style("top", (d3.event.pageY + 20) + "px"); 
                })

                // Mouse out event
                .on("mouseout", function(d) {
                    // Use D3 to select element, change color and size
                    d3.select(this).attr('class', 'dot')
                    div.transition()        
                        .duration(500)      
                        .style("opacity", 0);   
                });
            //TOOLTIP
            var div = d3.select("#chartCanvas").append("div")   
            .attr("class", "tooltipEmissionChart") 
            .attr("id","tooltipEmissionChart")    
            .style("margin-top", -60)  
            .style("opacity", 0);
        })   
    });
}


var legend = document.getElementById("legend1");
//var linechart = document.getElementById("heatmap");
var legendDistanceFromTop = legend.offsetTop;
//var linechartDistanceFromTop = linechart.offsetTop;
//console.log("leg: "+legendDistanceFromTop);
//console.log("line: " + linechartDistanceFromTop);

// Making legend stick at the top on scroll
window.onscroll = function() {myFunction()};



function myFunction() {
    //console.log(window.pageYOffset);
    if ((window.pageYOffset > legendDistanceFromTop) /* && (window.pageYOffset < linechartDistanceFromTop) */) {
        legend.classList.add("sticky");
    } else {
        legend.classList.remove("sticky");
    }
}

function filterplot(){
    var country = document.getElementById("country");
    if(country.checked == true){
        document.getElementById("legend1").innerHTML = "";
        document.getElementById("heatmap").innerHTML = "";
        document.getElementById("linechart").innerHTML = "";
        
        var tooltipEmissionChart = document.getElementById("tooltipEmissionChart");
        //console.log(tooltipEmissionChart == undefined);
        if(tooltipEmissionChart != undefined)
            tooltipEmissionChart.parentNode.removeChild(tooltipEmissionChart);
        var tooltip = document.getElementById("tooltip");
        //console.log(tooltip == undefined);
        if(tooltip != undefined)
            tooltip.parentNode.removeChild(tooltip);
        loadplots("country");
    }
    else{
        //document.getElementById("chartCanvas").innerHTML = "";
        document.getElementById("legend1").innerHTML = "";
        document.getElementById("heatmap").innerHTML = "";
        document.getElementById("linechart").innerHTML = "";
        
        var tooltipEmissionChart = document.getElementById("tooltipEmissionChart");
        //console.log(tooltipEmissionChart == undefined);
        if(tooltipEmissionChart != undefined)
            tooltipEmissionChart.parentNode.removeChild(tooltipEmissionChart);
        var tooltip = document.getElementById("tooltip");
        //console.log(tooltip == undefined);
        if(tooltip != undefined)
            tooltip.parentNode.removeChild(tooltip);
        loadplots("continent");
    }
}