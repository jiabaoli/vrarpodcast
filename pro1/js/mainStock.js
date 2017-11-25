
// SVG Size
// var width = 700,
// 	height = 500;

console.log('hi');
// Load CSV file
// d3.csv("data/stockClean.csv", function(data){
//
// 	// Analyze the dataset in the web console
// 	console.log(data);
//
// });


// var margin = {top: 50, right: 30, bottom: 70, left: 70};

var timeline;

loadData();

function loadData() {
    d3.csv("data/google.csv", function (data) {

        // Analyze the dataset in the web console
        console.log(data);

        // var dataLength = d.length;
        var PriceArray = [];
        var DateArray = [];
        var dateForTooltip = [];

        data.forEach(function (d) {
            PriceArray.push(+d.close);
            DateArray.push(d3.isoParse(d.date));
            dateForTooltip.push(d.date);
            d.close = (+d.close);
            d.closef = (+d.closef);
            d.closem = (+d.closem);
            d.closes = (+d.closes);
            d.date = (d3.isoParse(d.date));
            //d.date = parseDate(d.date);
        });

        console.log(DateArray);
        console.log(PriceArray);

        // var width = 960 - margin.left - margin.right,
            // height = 500 - margin.top - margin.bottom;

        // var svg = d3.select("#chart-area").append("svg")
        //     .attr("height", height)
        //     .attr("width", width)
        //     .style("background", "rgb(250,250,250)");

        var svg = d3.select("#chart-area-stock").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleTime()
            .range([0, width]);
        // .domain(d3.extend(data,function(d){return d.date;}));

        var y = d3.scaleLinear()
            .range([height, 0]);

        var xAxis = d3.axisBottom()
            .scale(x);
        // .tickFormat(d3.time.format("%b %Y"))

        var yAxis = d3.axisLeft()
            .scale(y);

        var area = d3.area()
            .x(function (d) {
                return x(+d.date);
            })
            .y0(height)
            .y1(function (d) {
                return y(+d.close);
            });

        var area2 = d3.area()
            .x(function (d) {
                return x(+d.date);
            })
            .y0(height)
            .y1(function (d) {
                return y(+d.closef);
            });

        var area3 = d3.area()
            .x(function (d) {
                return x(+d.date);
            })
            .y0(height)
            .y1(function (d) {
                return y(+d.closem);
            });

        var area4 = d3.area()
            .x(function (d) {
                return x(+d.date);
            })
            .y0(height)
            .y1(function (d) {
                return y(+d.closes);
            });

        var lineSvg = svg.append("g");

        var focus = svg.append("g")
            .style("display", "none");

        var line = d3.line()
            .x(function (d) {
                return x(+d.date);
            })
            .y(function (d) {
                return y(+d.close);
            });

        console.log(data.date);

        var parseDate = d3.timeFormat("%Y-%m-%d").parse;
        var parseNum = d3.format(".6");
        // give all the index of all the valuse
        //Why we need bisector?
        var bisectDate = d3.bisector(function (d) {
            return d.date;
        }).left;

        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.close;
        })]);

        // y.domain([0, 100]);

        var valueline = d3.line()
            .x(function (data) {
                return x(+data.date);
            })
            .y(function (data) {
                return y(+data.close);
            });


        lineSvg.append("path")
            .attr("class", "line")
            .attr("data", valueline(data));

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("data", line);

        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("fill", "blue")
            .attr("opacity", 0.3)
            .attr("d", area);

        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("fill", "blue")
            .attr("opacity", 0.3)
            .attr("d", area4);

        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("fill", "blue")
            .attr("opacity", 0.3)
            .attr("d", area2);

        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("fill", "blue")
            .attr("opacity", 0.3)
            .attr("d", area3);

        // X Axis
        svg.append("g")
            .attr("class", "xaxis axis axis-date")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        d3.selectAll(".axis-date .tick text")
            .attr("transform", "translate(-15,20) rotate(-45)");

        // Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("population");


        // append the circle at the intersection
        focus.append("circle")
            .attr("class", "y")
            .style("fill", "none")
            .style("stroke", "blue")
            .attr("r", 8);

        focus.append("circle2")
            .attr("class", "y")
            .style("fill", "none")
            .style("stroke", "red")
            .attr("r", 8);


        // append the y line
        focus.append("line")
            .attr("class", "y")
            .style("stroke", "blue")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 1)
            .attr("y1", margin.top)
            .attr("y2", height);

        focus.append("text")
            .attr("class", "t")
            .attr("x", 10)
            .attr("y", margin.top + 10)


        focus.append("text")
            .attr("class", "tDate")
            .attr("x", 10)
            .attr("y", margin.top + 30)


        //append the rectangle to capture mouse
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            // .on("mouseover", function() { focus.style("display", null); })
            .on("mouseover", function () {
                focus.style("display", "block");
            })
            .on("mouseout", function () {
                focus.style("display", "none");
            })
            .on("mousemove", mousemove);


        function mousemove() {
            // console.log(d.length);
            // console.log(bisectDate);
            //x.invert ---> give us back our datetime obj
            // can select specific informaton,
            var x0 = x.invert(d3.mouse(this)[0]);
            //locate entire information on that obj, all the value in that index
            var i = bisectDate(data, x0, 1);
            var d0 = data[i - 1];
            var d1 = data[i];

            // console.log(i);

            var dd = x0 - d0.date > d1.date - x0 ? d1 : d0;

            focus.select("circle.y")
                .attr("transform",
                    "translate(" + x(dd.date) + "," +
                    y(dd.close) + ")");

            focus.select("circle.y")
                .attr("transform",
                    "translate(" + x(dd.date) + "," +
                    y(dd.closef) + ")");


            focus.select("line.y")
                .attr("transform",
                    "translate(" + x(dd.date) + 250 + "," +
                    0 + ")");

            focus.select(".t")
                .attr("transform",
                    "translate(" + x(dd.date) + "," +
                    0 + ")")
                .text(parseNum(d0.close));

            focus.select(".tDate")
                .attr("transform",
                    "translate(" + x(dd.date) + "," +
                    0 + ")")
                .text(dateForTooltip[i]);
        };

        // createVis(data);

    });
}

//
// function createVis(data) {
//
//     // TO-DO: Instantiate visualization objects here
//     // areachart = new StackedAreaChart("stacked-area-chart", data);
//     timeline = new Timeline("timeline", data);
//
//
// };
//
//
// function brushed() {
//
//     var selectionRange = d3.brushSelection(d3.select(".brush").node());
//     // Convert the extent into the corresponding domain values
//     var selectionDomain = selectionRange.map(timeline.x.invert);
//     // Update focus chart (detailed information)
//     // areachart.x.domain(selectionDomain);
//
//     // areachart.wrangleData();
//
//
// }

