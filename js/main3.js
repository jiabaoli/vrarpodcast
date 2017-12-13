
//
// var width = 300,
//     height = 300;

// Config for the Radar chart
var config = {
    w: 300,
    h: 300,
    maxValue: 100,
    levels: 5,
    ExtraWidthX: 300
}


var svg = d3.select('body')
    .selectAll('svg')
    .append('svg')
    .attr("width", width)
    .attr("height", height);


//Call function to draw the Radar chart
d3.json("data/vrRadar.json", function(error, data) {
    if (error) throw error;
    RadarChart.draw("#radar", data, config);
});


//Call function to draw the Radar chart
d3.json("data/arRadar.json", function(error, data) {
    if (error) throw error;
    RadarChart.draw("#radar_02", data, config);
});



