

/*
 * StackedAreaChart - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the  
 */

StackedAreaChart = function(_parentElement, _data){
	this.parentElement = _parentElement;
    this.data = _data;
    this.displayData = []; // see data wrangling

    // DEBUG RAW DATA
    console.log(this.data);

    this.initVis();
};



/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

StackedAreaChart.prototype.initVis = function(){
	var vis = this;

	vis.margin = { top: 40, right: 0, bottom: 60, left: 60 };

	vis.width = 800 - vis.margin.left - vis.margin.right,
    vis.height = 400 - vis.margin.top - vis.margin.bottom;


  // SVG drawing area
	vis.svg = d3.select("#" + vis.parentElement).append("svg")
	    .attr("width", vis.width + vis.margin.left + vis.margin.right)
	    .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
	    .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

	// TO-DO: Overlay with path clipping



    // Scales and axes
    vis.x = d3.scaleTime()
        .range([0, vis.width])
        .domain(d3.extent(vis.data, function(d) { return d.Year; }));

    vis.y = d3.scaleLinear()
        .range([vis.height, 0]);

    vis.xAxis = d3.axisBottom()
        .scale(vis.x);

    vis.yAxis = d3.axisLeft()
        .scale(vis.y);

    vis.svg.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", "translate(0," + vis.height + ")");

    vis.svg.append("g")
        .attr("class", "y-axis axis");

    var dataCategories = colorScale.domain();

	// TO-DO: Initialize stack layout
    vis.stack = d3.stack()
        .keys(dataCategories);


    // TO-DO: Rearrange data
    vis.stackedData = vis.stack(vis.data);
    console.log(vis.stackedData);


    // TO-DO: Stacked area layout
	// vis.area = d3.area()
	//	...

    vis.area = d3.area()
        .curve(d3.curveCardinal)
        .x(function(d) { return vis.x(d.data.Year); })
        .y0(function(d) { return vis.y(d[0]); })
        .y1(function(d) { return vis.y(d[1]); });

    // vis.area2 = d3.area

	// TO-DO: Tooltip placeholder
    //
    // var bisectDate = d3.bisector(function(d) {
     //    return d.Year;
    // }).left;
    //
    // var focus = vis.svg.append("g")
     //    .attr("class", "focus")
     //    .style("display", "none");
    //
    // focus.append("circle")
     //    .attr("r", 5);
    //
    // focus.append("text")
     //    .attr("x", 9)
     //    .attr("dy", ".35em")
     //    .style("font-size",15);
    //
    // vis.svg.append("rect")
     //    .attr("class", "overlay")
     //    .attr("width", vis.width)
     //    .attr("height", vis.height)
     //    .on("mouseover", function() {
     //        focus.style("display", null);
     //    })
     //    .on("mouseout", function() {
     //        focus.style("display", "none");
     //    })
     //    .on("mousemove", mousemove);
    //
    // function mousemove() {
    //
     //    var x0 = vis.x.invert(d3.mouse(this)[0]),
     //        i = bisectDate(vis.data, x0, 1),
     //        d0 = vis.data[i - 1],
     //        d1 = vis.data[i],
     //        d= x0 - d0.date > d1.date - x0 ? d1 : d0;
     //    var depl=parseFloat(d['Safari'])+parseFloat(d['Opera'])+parseFloat(d['Firefox']);
     //    // var depl2=parseFloat(d['Safari'])+parseFloat(d['Opera']);
     //    // var depl3=parseFloat(d['Safari'])+parseFloat(d['Opera'])+parseFloat(d['Firefox'])+parseFloat(d['Chrome']);
     //    // var depl4=parseFloat(d['Opera']);
    //
     //    focus.attr("transform", "translate(" + vis.x(d.Year) + "," + (500 - margin.top - margin.bottom)*depl/100+ ")");
     //    // focus2.attr("transform", "translate(" + vis.x(d.Year) + "," + (500 - margin.top - margin.bottom)*depl2/100+ ")");
     //    // focus3.attr("transform", "translate(" + vis.x(d.Year) + "," + (500 - margin.top - margin.bottom)*depl3/100+ ")");
     //    // focus4.attr("transform", "translate(" + vis.x(d.Year) + "," + (500 - margin.top - margin.bottom)*depl4/100+ ")");
     //    focus.select("text").text(vis.data.Year);
     //    // focus2.select("text").text(d3.round(100-depl2, 1)+"%");
     //    // focus3.select("text").text(d3.round(100-depl3, 1)+"%");
     //    // focus4.select("text").text(d3.round(100-depl4, 1)+"%");
    // }



    // TO-DO: (Filter, aggregate, modify data)
    vis.wrangleData();

};

/*
 * Data wrangling
 */

StackedAreaChart.prototype.wrangleData = function(){
	var vis = this;

	// In the first step no data wrangling/filtering needed
	vis.displayData = vis.stackedData;

	// Update the visualization
    vis.updateVis();

};



/*
 * The drawing function - should use the D3 update sequence (enter, update, exit)
 * Function parameters only needed if different kinds of updates are needed
 */

StackedAreaChart.prototype.updateVis = function(){
	var vis = this;

	// Update domain
	// Get the maximum of the multi-dimensional array or in other words, get the highest peak of the uppermost layer
	vis.y.domain([0, d3.max(vis.displayData, function(d) {
			return d3.max(d, function(e) {
				return e[1];
			});
		})
	]);

    var dataCategories = colorScale.domain();

// Draw the layers
    var categories = vis.svg.selectAll(".area")
        .data(vis.displayData);

    categories.enter().append("path")
        .attr("class", "area")
        .merge(categories)
        .style("fill", function(d,i) {
            return colorScale(dataCategories[i]);
        })
        .attr("d", function(d) {
            return vis.area(d);
        });


    // TO-DO: Update tooltip text

	categories.exit().remove();


	// Call axis functions with the new domain 
	vis.svg.select(".x-axis").call(vis.xAxis);
    vis.svg.select(".y-axis").call(vis.yAxis);
}
