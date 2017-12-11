

//
// var margin = {top: 50, right: 30, bottom: 70, left: 70};
//
//
// var width = 1200 - margin.left - margin.right,
//     height = 800 - margin.top - margin.bottom;
//
// var svg = d3.select("#chart").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var vrArray = [];
var arArray = [];
var DateArray = [];
var dateForTooltip = [];


d3.csv("data/googleTest.csv", function (data) {

    console.log(data);
    data.forEach(function (d) {

        vrArray.push(+d.vr);
        arArray.push(+d.ar);
        DateArray.push(d3.isoParse(d.date));
        dateForTooltip.push(d.date);

        d.vr = (+d.vr);
        d.ar = (+d.ar);
        d.date = (d3.isoParse(d.date));
        //d.date = parseDate(d.date);

    });


    console.log(vrArray);

    var data = [
//     {
//     x: DateArray,
//     y: vrArray
// }
    ];

    var width1 = 1000;
    var height1 = 500;
    var globalX = 0;
    var duration = 200;
    var max = 500;
    var index = 1;
    var step = 10;

    var chart = d3.select('#Googlechart02')
        .attr('width', width1 + 50)
        .attr('height', height1 + 50);

    // chart.append("svg")
    // chart.style("width", 1000)
    //     .style("height", 1000);


    var x = d3.scaleLinear().domain([0, 500]).range([0, 500]);
    var y = d3.scaleLinear().domain([0, 100]).range([500, 0]);

// -----------------------------------

    var line = d3.line()
        .x(function(d){ return x(d.x); })
        // .y(function(d){ return y(d.y); });
        .y(function(d){ return y(d.y); });


    var smoothLine = d3.line().curve(d3.curveCardinal)
        .x(function(d){ return x(d.x); })
        .y(function(d){ return y(d.y); });

    var lineArea = d3.area()
        .x(function(d){ return x(d.x); })
        .y0(y(0))
        .y1(function(d){ return y(d.y); })
        .curve(d3.curveCardinal);
// -----------------------------------
// Draw the axis
    var xAxis = d3.axisBottom().scale(x);
    var axisX = chart.append('g').attr('class', 'x axis')
        .attr('transform', 'translate(0, 500)')
        .call(xAxis);

// // Draw the grid
//     chart.append('path').datum([{x: 0, y: 150}, {x: 500, y: 150}])
//         .attr('class', 'grid')
//         .attr('d', line);
//     chart.append('path').datum([{x: 0, y: 300}, {x: 500, y: 300}])
//         .attr('class', 'grid')
//         .attr('d', line);
//     chart.append('path').datum([{x: 0, y: 450}, {x: 500, y: 450}])
//         .attr('class', 'grid')
//         .attr('d', line);
//     chart.append('path').datum([{x: 50, y: 0}, {x: 50, y: 500}])
//         .attr('class', 'grid')
//         .attr('d', line);
//     chart.append('path').datum([{x: 250, y: 0}, {x: 250, y: 500}])
//         .attr('class', 'grid')
//         .attr('d', line);
//     chart.append('path').datum([{x: 450, y: 0}, {x: 450, y: 500}])
//         .attr('class', 'grid')
//         .attr('d', line);

// Append the holder for line chart and fill area


    var path = chart.append('path');

    var areaPath = chart.append('path');
// Main loop

    function tick() {
        // Generate new data
        var point = {
            x: globalX,
            // x:DateArray[index],
            y: arArray[index]
        };

        data.push(point);
        globalX += step;
        index += 1;
        // Draw new line
        path.datum(data)
            .attr('class', 'mysmoothline')
            .attr('d', smoothLine);
        // Draw new fill area
        areaPath.datum(data)
            .attr('class', 'myarea')
            .attr('d', lineArea);
        // Shift the chart left
        x.domain([globalX - (max - step), globalX]);

        axisX.transition()
            .duration(duration)
            .ease(d3.easeLinear,2)
            .call(xAxis);

        path.attr('transform', null)
            .transition()
            .duration(duration)
            .ease(d3.easeLinear,2)
            .attr('transform', 'translate(' + x(globalX - max) + ')')

        areaPath.attr('transform', null)
            .transition()
            .duration(duration)
            .ease(d3.easeLinear,2)
            .attr('transform', 'translate(' + x(globalX - max) + ')')
            .on('end', tick)
        // Remote old data (max 50 points)
        if (data.length > 250) data.shift();
    }

    tick();


});


