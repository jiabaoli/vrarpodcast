// set the dimensions and margins of the graph
// var margin = {top: 20, right: 20, bottom: 30, left: 50},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleTime().range([0, width- 40]);
console.log(x);

// x.domain(["2016", "2017", "2018", "2019", "2020"]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.Lowadoption); });


// define the line
var valueline2 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.Mediumadoption); });

// define the line
var valueline3 = d3.line()
    .x(function(d) {
        console.log(d.year);
        return x(d.year);
    })
    .y(function(d) { return y(d.Highadoption); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg4 = d3.select("#visualization1e").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");


// Get the data
d3.csv("data/adoption.csv", function(error, data) {

    if (error) throw error;

    // format the data
    data.forEach(function(d) {
        d.Lowadoption = +d.Lowadoption;
        d.Mediumadoption = +d.Mediumadoption;
        d.Highadoption = +d.Highadoption;
    });

    console.log(data);

    // // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.Highadoption; })]);




    // Add the valueline path.
    svg4.append("path")
        .data([data])
        .attr("transform", "translate(40," + 0 + ")")
        .attr("class", "line")
        .attr("d", valueline);

    // Add the valueline path.
    svg4.append("path")
        .data([data])
        .attr("transform", "translate(40," + 0 + ")")
        .attr("class", "line2")
        .attr("d", valueline2);

    // Add the valueline path.
    svg4.append("path")
        .data([data])
        .attr("transform", "translate(40," + 0 + ")")
        .attr("class", "line3")
        .attr("d", valueline3);

    var xAxis = d3.axisBottom()
        .scale(x)
        .ticks(4);


    // Add the X Axis
    svg4.append("g")
        .attr("transform", "translate(40," + height + ")")
        .call(xAxis);

    // Add the Y Axis

    var yAxis = d3.axisLeft().scale(y).ticks(10);

    svg4.append("g")
        .attr("transform", "translate(40," + 0 + ")")
        .call(yAxis);


    var circle = svg4.selectAll("circle")
        .data(data);

    circle.enter().append("circle")
        .merge(circle)
        .transition()
        .duration(500)
        .attr("transform", "translate(40," + 0 + ")")
        .attr("cx", function(d) {
            return x(d.year);
        })
        .attr("cy", function(d) {
            return y(d.Lowadoption);
        })
        .attr("r", 5)
        .attr("fill", "steelblue");

    circle.enter().append("circle")
        .merge(circle)
        .transition()
        .duration(500)
        .attr("transform", "translate(40," + 0 + ")")
        .attr("cx", function(d) {
            return x(d.year);
        })
        .attr("cy", function(d) {
            return y(d.Highadoption);
        })
        .attr("r", 5)
        .attr("fill", "red");

    circle.enter().append("circle")
        .merge(circle)
        .transition()
        .duration(500)
        .attr("transform", "translate(40," + 0 + ")")
        .attr("cx", function(d) {
            return x(d.year);
        })
        .attr("cy", function(d) {
            return y(d.Mediumadoption);
        })
        .attr("r", 5)
        .attr("fill", "orange");

});