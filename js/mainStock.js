
// SVG Size
// var width = 700,
// 	height = 500;

console.log('hi');
// Load CSV file


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
        var DateArray2 = [];
        var dateForTooltip = [];

        data.forEach(function (d) {
            PriceArray.push(+d.close);
            DateArray.push(d3.isoParse(d.date));
            DateArray2.push(d.date);
            dateForTooltip.push(d.date);
            d.close = (+d.close);
            d.closef = (+d.closef);
            d.closem = (+d.closem);
            d.closes = (+d.closes);
            // console.log(d.date);
            d.date = (d3.isoParse(d.date));
            // console.log(d.date);
            //d.date = parseDate(d.date);
        });

        console.log(DateArray2);
        console.log(DateArray);

        var width = 1100 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

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

        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("fill", "red")
            .attr("opacity", 0.1)
            .attr("d", area);

        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("fill", "red")
            .attr("opacity", 0.1)
            .attr("d", area4);

        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("fill", "red")
            .attr("opacity", 0.1)
            .attr("d", area2);

        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("fill", "red")
            .attr("opacity", 0.1)
            .attr("d", area3);


        var valueline = d3.line()
            .x(function (d) {return x(+d.date);})
            .y(function (d) {return y(+d.close);});

        var valueline2 = d3.line()
            .x(function (d) {return x(+d.date);})
            .y(function (d) {return y(+d.closes);});

        var valueline3 = d3.line()
            .x(function (d) {return x(+d.date);})
            .y(function (d) {return y(+d.closef);});

        var valueline4 = d3.line()
            .x(function (d) {return x(+d.date);})
            .y(function (d) {return y(+d.closem);});

        var lineSvg = svg.append("g");

        svg.append('g')
            .attr('class', 'lineStock');

        svg.select("g.lineStock")
            .datum(data)
            .append("path")
            .attr("d", valueline(data));

        svg.select("g.lineStock")
            .datum(data)
            .append("path")
            .attr("d", valueline2(data));

        svg.select("g.lineStock")
            .datum(data)
            .append("path")
            .attr("d", valueline3(data));

        svg.select("g.lineStock")
            .datum(data)
            .append("path")
            .attr("d", valueline4(data));

///////////////////////
        svg.append("line")
            .attr("class", "y")
            .style("stroke", "red")
            .style("stroke-dasharray", "4,4")
            .style("opacity", 1)
            .attr("y1", 0)
            .attr("y2", height +15);

        svg.append("text")
            .attr("class", "t")
            .attr("x", 10)
            .attr("y", margin.top +420);

        svg.select(".t")
            .attr("transform",
                "translate(" + 225  + "," +
                60 + ")")
            .text( "OCULUS" );

        svg.select("line.y")
            .attr("transform",
                "translate(" + 245  + "," +
                0 + ")")
            .text( "Snap : ");
///////////////////////
        svg.append("line")
            .attr("class", "y2")
            .style("stroke", "red")
            .style("stroke-dasharray", "4,4")
            .style("opacity", 1)
            .attr("y1", 0)
            .attr("y2", height+15);


        svg.append("text")
            .attr("class", "t2")
            .attr("x", 10)
            .attr("y", margin.top +420);

        svg.select(".t2")
            .attr("transform",
                "translate(" + 805  + "," +
                45 + ")")
            .text( "HOLOLENS" );

        svg.select("line.y2")
            .attr("transform",
                "translate(" + 825  + "," +
                0 + ")");

///////////////////////
        svg.append("line")
            .attr("class", "y3")
            .style("stroke", "red")
            .style("stroke-dasharray", "4,4")
            .style("opacity", 1)
            .attr("y1", 0)
            .attr("y2", height+20);


        svg.append("text")
            .attr("class", "t3")
            .attr("x", 10)
            .attr("y", margin.top +420);

        svg.select(".t3")
            .attr("transform",
                "translate(" + 830  + "," +
                60 + ")")
            .text( "DAYDREAM + SPECTACLES" );

        svg.select("line.y3")
            .attr("transform",
                "translate(" + 895  + "," +
                0 + ")");

        // lineSvg.append("path")
        //     .attr("class", "line")
        //     .attr("data", valueline(data));

        // svg.append("path")
        //     .datum(data)
        //     .attr("class", "line")
        //     .attr("data", line);

        // X Axis
        svg.append("g")
            .attr("class", "xaxis axis axis-date1")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        d3.selectAll(".axis-date1 .tick text");
            // .attr("transform", "translate(-5,10) rotate(0)");
        //


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

        focus.append("circle")
            .attr("class", "y1")
            .style("fill", "none")
            .style("stroke", "blue")
            .attr("r", 8);

        focus.append("circle")
            .attr("class", "y2")
            .style("fill", "none")
            .style("stroke", "blue")
            .attr("r", 8);

        focus.append("circle")
            .attr("class", "y3")
            .style("fill", "none")
            .style("stroke", "blue")
            .attr("r", 8);


        // append the y line
        focus.append("line")
            .attr("class", "y")
            .style("stroke", "blue")
            .style("stroke-dasharray", "4,4")
            .style("opacity", 1)
            .attr("y1", 0)
            .attr("y2", height);

        focus.append("text")
            .attr("class", "t")
            .attr("x", 10)
            .attr("y", margin.top + 10);


        focus.append("text")
            .attr("class", "t2")
            .attr("x", 10)
            .attr("y", margin.top + 10);


        focus.append("text")
            .attr("class", "t3")
            .attr("x", 10)
            .attr("y", margin.top + 10);


        focus.append("text")
            .attr("class", "t4")
            .attr("x", 10)
            .attr("y", margin.top + 10);



        focus.append("text")
            .attr("class", "tDate")
            .attr("x", 10)
            .attr("y", -10);


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

            focus.select("circle.y1")
                .attr("transform",
                    "translate(" + x(dd.date) + "," +
                    y(dd.closef) + ")");

            focus.select("circle.y2")
                .attr("transform",
                    "translate(" + x(dd.date) + "," +
                    y(dd.closem) + ")");

            focus.select("circle.y3")
                .attr("transform",
                    "translate(" + x(dd.date) + "," +
                    y(dd.closes) + ")");


            focus.select("line.y")
                .attr("transform",
                    "translate(" + x(dd.date)  + "," +
                    0 + ")");


            focus.select(".tDate")
                .attr("transform",
                    "translate(" + x(dd.date) + "," +
                    15 + ")")
                .text(dateForTooltip[i]);


            focus.select(".t")
                .attr("transform",
                    "translate(" + x(dd.date) + "," +
                    y(dd.close) + ")")
                .text( "Google : " + parseNum(d0.close));


            focus.select(".t2")
                .attr("transform",
                    "translate(" + x(dd.date) + "," +
                    340 + ")")
                .text( "Snap : " + parseNum(d0.closes));


            focus.select(".t3")
                .attr("transform",
                    "translate(" + x(dd.date) + "," +
                    360 + ")")
                .text( "Facebook : " + parseNum(d0.closef));


            focus.select(".t4")
                .attr("transform",
                    "translate(" + x(dd.date) + "," +
                    390 + ")")
                .text( "Microsoft : " + parseNum(d0.closem));



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

