// setup canvas3
var margin3 = {top: 40, right:40, bottom: 40, left: 40};

var width3 = 350 - margin3.left - margin3.right,
    height3 = 300 - margin3.top - margin3.bottom;


var svg3 = d3.select("#temp-Chart").append("svg")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
    .append("g")
    .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");


// var svg4 = d3.select("#temp-Chart2").append("svg")
//     .attr("width", width3 + margin3.left + margin3.right)
//     .attr("height", height3 + margin3.top + margin3.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");
//
//
// var svg5 = d3.select("#chart-area33").append("svg")
//     .attr("width", width3 + margin3.left + margin3.right)
//     .attr("height", height3 + margin3.top + margin3.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

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
            DateArray.push(d3.isoParse(d.date1));
            DateArray2.push(d.date1);
            dateForTooltip.push(d.date1);
            d.daydream = (+d.daydream);
            d.spectacles = (+d.spectacles);
            console.log(d.spectacles);
            d.date1 = (d3.isoParse(d.date1));

            d.oculus = (+d.oculus);

            // console.log(d.date);
            d.date2 = (d3.isoParse(d.date2));

            d.hololens = (+d.hololens);

            // console.log(d.date);
            d.date3 = (d3.isoParse(d.date3));
            // console.log(d.date);
            //d.date = parseDate(d.date);
        });


        var x = d3.scaleTime()
            .range([0, width3]);
        // .domain(d3.extend(data,function(d){return d.date;}));

        var y = d3.scaleLinear()
            .range([height3, 0]);

        var xAxis = d3.axisBottom()
            .scale(x);
        // .tickFormat(d3.time.format("%b %Y"))

        var yAxis = d3.axisLeft()
            .scale(y);


        x.domain(d3.extent(data, function (d) {
            return d.date1;
        }));

        // y.domain([0, d3.max(data, function (d) {
        //     return d.daydream;
        // })]);

        y.domain([100, 120]);


        var valueline = d3.line()
            .x(function (d) {return x(+d.date1);})
            .y(function (d) {return y(+d.oculus);})
            .curve(d3.curveMonotoneX);

        var lineSvg = svg3.append("g");

        svg3.append('g')
            .attr('class', 'lineStock');

        svg3.select("g.lineStock")
            .datum(data)
            .append("path")
            .attr("d", valueline(data));

        svg3.append("g")
            .attr("class", "xaxis axis axis-date")
            .attr("transform", "translate(0," + height3 + ")")
            .call(xAxis);

        d3.selectAll(".axis-date .tick text")
            .attr("transform", "translate(-15,20) rotate(-90)");

        // Y Axis
        svg3.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("population");

        // svg3.selectAll(".dot")
        //     .data(data)
        //     .enter().append("circle") // Uses the enter().append() method
        //     .attr("class", "dot") // Assign a class for styling
        //     .attr("cx", function(d) { return d.date1 })
        //     .attr("cy", function(d) { return d.daydream })
        //     .attr("r", 5);

///////////////////////////////////////////////////////////////////////
//
//         var x1 = d3.scaleTime()
//             .range([0, width3]);
//         // .domain(d3.extend(data,function(d){return d.date;}));
//         var y1 = d3.scaleLinear()
//             .range([height3, 0]);
//
//         var xAxis1 = d3.axisBottom()
//             .scale(x1);
//         // .tickFormat(d3.time.format("%b %Y"))
//
//         var yAxis1 = d3.axisLeft()
//             .scale(y1);
//
//
//         x1.domain(d3.extent(data, function (d) {
//             return d.date2;
//         }));
//
//         // y.domain([0, d3.max(data, function (d) {
//         //     return d.daydream;
//         // })]);
//
//         y1.domain([100, 120]);
//
//         var valueline2 = d3.line()
//             .x(function (d) {return x1(+d.date2);})
//             .y(function (d) {return y1(+d.oculus);});
//
//         var lineSvg = svg4.append("g");
//
//         svg4.append('g')
//             .attr('class', 'lineStock');
//
//         svg4.select("g.lineStock")
//             .datum(data)
//             .append("path")
//             .attr("d", valueline2(data));
//
//         svg4.append("g")
//             .attr("class", "xaxis axis axis-date")
//             .attr("transform", "translate(0," + height3 + ")")
//             .call(xAxis1);
//
//         // d3.selectAll(".axis-date .tick text")
//         //     .attr("transform", "translate(0,0) rotate(0)");
//
//         // Y Axis
//         svg4.append("g")
//             .attr("class", "y axis")
//             .call(yAxis1)
//             .append("text")
//             .attr("transform", "rotate(-90)")
//             .attr("y", 6)
//             .attr("dy", ".71em")
//             .style("text-anchor", "end")
//             .text("population");
//


///////////////////////////////////////////////////////////////////////


    });
}
