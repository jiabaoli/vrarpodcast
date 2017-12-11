
/*
 * AreaChart - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the area chart
 * @param _data						-- the dataset 'household characteristics'
 */

AreaChart = function(_parentElement, _data){
	this.parentElement = _parentElement;
	this.data = _data;
	this.displayData = [];

	this.initVis();
};


/*
 * Initialize visualization (static content; e.g. SVG area, axes, brush component)
 */

AreaChart.prototype.initVis = function(){
	var vis = this;

	// * TO-DO *



	// (Filter, aggregate, modify data)
	vis.wrangleData();
};


/*
 * Data wrangling
 */

AreaChart.prototype.wrangleData = function(){
	var vis = this;

	// (1) Group data by date and count survey results for each day

    console.log(vis.data);
    // * TO-DO *

    vis.SurveyArray = [];
    // var OwnrentArray = [];
    // var ReligionArray = [];
    // var ElecArray = [];
    // var LatrineArray = [];

    vis.data.forEach(function(d) {
        vis.SurveyArray.push(d.survey);
        // OwnrentArray.push(d.ownrent);
        // ReligionArray.push(d.hohreligion);
        // ElecArray.push(d.electricity);
        // LatrineArray.push(d.latrine);
        // console.log(vis.SurveyArray);
    });


    // var studentsByCity = d3.nest()
    //     .key(function(d) { return d.city; })
    //     .entries(students);

    var field = ["survey"];

    // vis.myArray = [];
    for (i = 0; i < field.length; i++) {

        vis.nestedData = d3.nest()
            .key(function(d) {return d.survey; })
            .rollup(function(leaves) { return leaves.length; })
            .entries(vis.data);


        // var nestedData2 = d3.nest()
        //     .key(function(d) { return d.survey; })
        //     .entries(vis.data);

        // nestedData.forEach(function(d) {
        //     d.key = (d.key);
        //     d.value = +d.value;
        // });
        // vis.myArray.push(nestedData);
    }
	console.log(vis.nestedData);

    // (2) Sort data by day

    for (i = 0; i < vis.nestedData.length; i++) {
        // vis.surveys = [];
        vis.nestedData.sort(function (a, b) {
            return parseDate(a.key) - parseDate(b.key);
        })
    }


    console.log(vis.nestedData[0]);
    console.log(vis.nestedData[0].key);
    console.log(vis.nestedData[0].value);

    var DateArray =  [];
    var ValueArray =  [];
    var dateForTooltip = [];

    vis.nestedData.forEach(function(d) {
        ValueArray.push(+d.value);
        DateArray.push(d3.isoParse(d.key));
        dateForTooltip.push(d.key);
        d.value=(+d.value);
        d.key=(d3.isoParse(d.key));
        //d.date = parseDate(d.date);
    });

    console.log(DateArray);
    console.log(ValueArray);



	// * TO-DO *

    // vis.wrangleData();
	// Update the visualization
	vis.updateVis();
};


/*
 * The drawing function
 */

AreaChart.prototype.updateVis = function(){
	var vis = this;

	// * TO-DO *
    vis.margin = {top: 50, right: 30, bottom: 70, left: 70};
    vis.width = 600 - margin.left - margin.right,
        vis.height = 400 - margin.top - margin.bottom;


    vis.svg = d3.select("#chart-area").append("svg")
        .data(vis.nestedData)
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    vis.x = d3.scaleTime()
        .range([0, vis.width]);
    // .domain(d3.extend(data,function(d){return d.date;}));

    vis.y = d3.scaleLinear()
        .range([vis.height, 0]);

    vis.xAxis = d3.axisBottom()
        .scale(vis.x);
    // .tickFormat(d3.time.format("%b %Y"))

    vis.yAxis = d3.axisLeft()
        .scale(vis.y);

    vis.area = d3.area()
        .x(function(d) { return vis.x(+d.key); })
        .y0(vis.height)
        .y1(function(d) { return vis.y(+d.value); });

    // var path = svg.append("path")
    //     .datum(data)
    //     .attr("class","area")
    //     .attr("d",area);

    vis.x.domain(d3.extent(vis.nestedData, function(d) { return d.key; }));
    vis.y.domain([0, d3.max(vis.nestedData, function(d) { return d.value; })]);



    // X Axis
    vis.svg.append("g")
        .attr("class", "xaxis axis axis-date")
        .attr("transform", "translate(0," + vis.height + ")")
        .call(vis.xAxis);

    d3.selectAll(".axis-date .tick text")
        .attr("transform", "translate(-15,20) rotate(-45)");

    // Y Axis
    vis.svg.append("g")
        .attr("class", "y axis")
        .call(vis.yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("population");


    vis.svg.append("path")
        .datum(vis.nestedData)
        .attr("class", "area")
        .attr("fill", "gray")
        .attr("opacity", 0.3)
        .attr("d", vis.area);






    // TO-DO: Initialize brush component

// Initialize brush component
    vis.brush = d3.brushX()
        .extent([[0, 0], [vis.width, vis.height]])
        .on("brush", brushed);

    // Get the extent of the current brush

    // vis.svg.append("g")
    //     .attr("class", "x-axis axis")
    //     .attr("transform", "translate(0," + vis.heightT + ")")
    //     .call(vis.xAxis)
    //     .on("click", function(d,i) {
    //         vis.filter = (vis.filter) ? "" : dataCategories[i];
    //         vis.wrangleData();
    //     });


    // TO-DO: Append brush component here

    vis.svg.append("g")
        .attr("class", "x brush")
        .call(vis.brush)
        .selectAll("rect")
        .attr("y", -6)
        .attr("height", vis.height + 7);


    vis.svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", vis.width)
        .attr("height", vis.height+800);


    // vis.wrangleData();




}
