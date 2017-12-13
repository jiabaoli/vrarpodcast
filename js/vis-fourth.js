// setup canvas3
var margin4 = {top: 40, right:40, bottom: 40, left: 40};

var width4 = 350 - margin3.left - margin3.right,
    height4 = 300 - margin3.top - margin3.bottom;


var svg4 = d3.select("#temp-Chart2").append("svg")
    .attr("width", width4 + margin4.left + margin4.right)
    .attr("height", height4 + margin4.top + margin4.bottom)
    .append("g")
    .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");



// Date parser
var formatDate = d3.timeFormat("%Y");
console.log(formatDate);

var parseDate = d3.timeParse("%Y");

loadData()

function loadData() {
    d3.csv("data/releaseDate.csv", function (data) {

        // Analyze the dataset in the web console
        console.log(data);

        // var dataLength = d.length;
        var PriceArray = [];
        var DateArray = [];
        var DateArray2 = [];
        var dateForTooltip = [];

        data.forEach(function (d) {
            PriceArray.push(+d.daydream);
            DateArray.push(d3.isoParse(d.date3));
            DateArray2.push(d.date3);
            dateForTooltip.push(d.date3);
            d.daydream = (+d.daydream);
            d.spectacles = (+d.spectacles);
            console.log(d.spectacles);
            d.date1 = (d3.isoParse(d.date3));

            d.oculus = (+d.oculus);

            // console.log(d.date);
            d.date2 = (d3.isoParse(d.date3));

            d.hololens = (+d.hololens);

            // console.log(d.date);
            d.date3 = (d3.isoParse(d.date3));
            // console.log(d.date);
            //d.date = parseDate(d.date);
        });


        var x1 = d3.scaleTime()
            .range([0, width4]);
        // .domain(d3.extend(data,function(d){return d.date;}));

        var y1 = d3.scaleLinear()
            .range([height4, 0]);

        var xAxis1 = d3.axisBottom()
            .ticks(12)
            .scale(x1);
        // .tickFormat(d3.time.format("%b %Y"))

        var yAxis1 = d3.axisLeft()
            .scale(y1);


        x1.domain(d3.extent(data, function (d) {
            return d.date3;
        }));

        // y.domain([0, d3.max(data, function (d) {
        //     return d.daydream;
        // })]);

        y1.domain([50, 60]);


        var valueline1 = d3.line()
            .x(function (d) {return x1(+d.date3);})
            .y(function (d) {return y1(+d.hololens);})
            .curve(d3.curveMonotoneX);

        var lineSvg = svg4.append("g");

        svg4.append('g')
            .attr('class', 'lineStock');

        svg4.select("g.lineStock")
            .datum(data)
            .append("path")
            .attr("d", valueline1(data));

        svg4.append("g")
            .attr("class", "xaxis axis axis-date")
            .attr("transform", "translate(0," + height4 + ")")
            .call(xAxis1);

        d3.selectAll(".axis-date .tick text")
            .attr("transform", "translate(-15,20) rotate(-90)");

        // Y Axis
        svg4.append("g")
            .attr("class", "y axis")
            .call(yAxis1)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("population");

        svg4.append("line")
            .attr("class", "y2")
            .style("stroke", "red")
            .style("stroke-dasharray", "4,4")
            .style("opacity", 1)
            .attr("y1", 0)
            .attr("y2", height3+5);


        svg4.append("text")
            .attr("class", "t2")
            .attr("x", 10)
            .attr("y", margin3.top);

        // svg3.select(".t2")
        //     .attr("transform",
        //         "translate(" + 805  + "," +
        //         45 + ")")
        //     .text( "HOLOLENS" );
        //
        svg4.select("line.y2")
            .attr("transform",
                "translate(" + 135  + "," +
                0 + ")");





// svg3.selectAll(".dot")
//     .data(data)
//     .enter().append("circle") // Uses the enter().append() method
//     .attr("class", "dot") // Assign a class for styling
//     .attr("cx", function(d) { return d.date1 })
//     .attr("cy", function(d) { return d.daydream })
//     .attr("r", 5);


    });
}
