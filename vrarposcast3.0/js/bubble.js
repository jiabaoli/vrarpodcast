var dataset2 = {
    "children": [
        // {
        //     "facilityId": "65+",
        //     "count": 54,
        //     "color": 9
        // }, {
        //     "facilityId": "55-64",
        //     "count": 50,
        //     "color": 9
        // }, {
        //     "facilityId": "45-54",
        //     "count": 38,
        //     "color": 10
        // }, {
        //     "facilityId": "35-44",
        //     "count": 31,
        //     "color": 10
        // }, {
        //     "facilityId": "25-34",
        //     "count": 22,
        //     "color": 11
        // }, {
        //     "facilityId": "18-24",
        //     "count": 21,
        //     "color": 12
        // }
        {
            "facilityId": "Somewhat agree",
            "count":46,
            "color":5
        },  {
            "facilityId": "Completely agree",
            "count":26,
            "color":5
        },  {
            "facilityId": "Don't know",
            "count":14,
            "color":6
        },  {
            "facilityId": "Somewhat disagree",
            "count":3,
            "color":7
        }, {
            "facilityId": "Completely disagree",
            "count":3,
            "color":7
        }
    ]
};



var width2 = 550,
    height2 = 500,
    padding = 1.5, // separation between same-color nodes
    clusterPadding = 6, // separation between different-color nodes
    maxRadius = 100;

var n = 5, // total number of nodes
    m = 5; // number of distinct clusters

//    var color = d3.scaleSequential(d3.interpolateRainbow)
//        .domain(d3.range(m));
// var colorC = d3.scaleOrdinal(d3.schemeCategory20c);
var colorC = d3.scaleOrdinal()
    .domain(["New York", "San Francisco", "Austin", "haha", "haho",
        "ss", "we", "wef", "pop", "ewe"])
    // .range(["#912427", "#511416" , "#D13438", "#DE373B", "#B72E31"]);
    .range(["#FF794B", "#FFB298", "#D0917C"]);

// The largest node for each cluster.
var clusters = new Array(m);
var i = 0;
var nodes = d3.range(n).map(function () {

//        var i = Math.floor(Math.random() * m),
//            r = Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
    r = dataset2.children[i].count,
        d = {
            cluster: i,
            radius: r + 40,
            x: Math.cos(i / m * 2 * Math.PI) * 200 + width2 / 2 + Math.random(),
            y: Math.sin(i / m * 2 * Math.PI) * 200 + height2 / 2 + Math.random(),
            text: dataset2.children[i].facilityId,
            color:dataset2.children[i].color
        };
    if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
//        console.log(n);
    i ++;
//        console.log(i);
    return d;

});
console.log(nodes);
var simulation = d3.forceSimulation()
// keep entire simulation balanced around screen center
    .force('center', d3.forceCenter(width2/2, height2/2))

    // pull toward center
    .force('attract', d3.forceAttract()
        .target([width2/2, height2/2])
        .strength(0.01))

    // cluster by section
    .force('cluster', d3.forceCluster()
        .centers(function (d) { return clusters[d.cluster]; })
        .strength(0.5)
        .centerInertia(0.1))

    // apply collision with padding
    .force('collide', d3.forceCollide(function (d) { return d.radius + padding; })
        .strength(0))

    .on('tick', layoutTick)
    .nodes(nodes);

// var svg = d3.select('body').append('svg')
//     .attr('width', width)
//     .attr('height', height);
var svg = d3.select("#visualization1c")
    .append("svg")
    .attr("width", width2)
    .attr("height", height2);
    // .attr("class", "bubble");

var group = svg.selectAll('g')
    .data(nodes)
    .enter().append('g');

var node = group.append('circle')
    .style('fill', function (d) {
        return colorC(d.color);
    });


var text2 = group.append("text")
    .text(function(d) {
        return d.text;
    })
    .attr("dx", function(d) {
       return d.x - 15 ;
    })
    .attr("dy", function(d) {
       return d.y;
    })
    .style("stroke", "black");

group.call(d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended)
);

function dragstarted (d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged (d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended (d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// ramp up collision strength to provide smooth transition
var transitionTime = 500;
var t = d3.timer(function (elapsed) {
    var dt = elapsed / transitionTime;
    simulation.force('collide').strength(Math.pow(dt, 2) * 0.3);
    if (dt >= 1.0) t.stop();
});

function layoutTick (e) {
    node.attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('r', function (d) { return d.radius; });

    text2.attr('dx', function (d) { return d.x - 15; })
        .attr('dy', function (d) { return d.y; })
        .attr('r', function (d) { return d.radius; });
};