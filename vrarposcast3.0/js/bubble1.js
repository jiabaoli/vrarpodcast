var dataset3 = {
    "children": [
        {
            "facilityId": "65+",
            "count": 54,
            "color": 9
        }, {
            "facilityId": "55-64",
            "count": 50,
            "color": 9
        }, {
            "facilityId": "45-54",
            "count": 38,
            "color": 10
        }, {
            "facilityId": "35-44",
            "count": 31,
            "color": 10
        }, {
            "facilityId": "25-34",
            "count": 22,
            "color": 11
        }, {
            "facilityId": "18-24",
            "count": 21,
            "color": 12
        }
    ]
};



var width3 = 550,
    height3 = 500,
    padding = 1.5, // separation between same-color nodes
    clusterPadding = 6, // separation between different-color nodes
    maxRadius = 50;

var n2 = 6, // total number of nodes
    m2 = 6; // number of distinct clusters

//    var color = d3.scaleSequential(d3.interpolateRainbow)
//        .domain(d3.range(m));
// var colorD = d3.scaleOrdinal(d3.schemeCategory20c);
var colorD = d3.scaleOrdinal()
    .domain(["New York", "San Francisco", "Austin", "haha", "haho",
        "ss", "we", "wef", "pop", "ewe"])
    // .range(["#912427", "#511416" , "#D13438", "#DE373B", "#B72E31"]);
    .range(["#FF794B", "#FFB298", "#D0917C"]);

// The largest node for each cluster.
var clusters2 = new Array(m2);
var i2 = 0;
var nodes2 = d3.range(n2).map(function () {

//        var i = Math.floor(Math.random() * m),
//            r = Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
    r = dataset3.children[i2].count,
        d = {
            cluster: i2,
            radius: r + 30,
            x: Math.cos(i2 / m2 * 2 * Math.PI) * 200 + width3 / 2 + Math.random(),
            y: Math.sin(i2 / m2 * 2 * Math.PI) * 200 + height3 / 2 + Math.random(),
            text: dataset3.children[i2].facilityId,
            color:dataset3.children[i2].color
        };
    if (!clusters2[i2] || (r > clusters2[i2].radius)) clusters2[i2] = d;
//        console.log(n);
    i2 ++;
//        console.log(i);
    return d;

});
console.log(nodes2);
var simulation2 = d3.forceSimulation()
// keep entire simulation balanced around screen center
    .force('center', d3.forceCenter(width3/2, height3/2))

    // pull toward center
    .force('attract', d3.forceAttract()
        .target([width3/2, height3/2])
        .strength(0.01))

    // cluster by section
    .force('cluster', d3.forceCluster()
        .centers(function (d) { return clusters2[d.cluster]; })
        .strength(0.5)
        .centerInertia(0.1))

    // apply collision with padding
    .force('collide', d3.forceCollide(function (d) { return d.radius + padding; })
        .strength(0))

    .on('tick', layoutTick2)
    .nodes(nodes2);

// var svg_bubble_2 = d3.select('body').append('svg_bubble_2')
//     .attr('width', width)
//     .attr('height', height);
var svg_bubble_2 = d3.select("#visualization1a")
    .append("svg")
    .attr("width", width3)
    .attr("height", height3);
// .attr("class", "bubble");

var group2 = svg_bubble_2.selectAll('g')
    .data(nodes2)
    .enter().append('g');

var node3 = group2.append('circle')
    .style('fill', function (d) {
        return colorD(d.color);
    });


var text3 = group2.append("text")
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

console.log(node3);
group2.call(d3.drag()
    .on('start', dragstarted2)
    .on('drag', dragged2)
    .on('end', dragended2)
);

function dragstarted2 (d) {
    if (!d3.event.active) simulation2.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged2 (d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended2 (d) {
    if (!d3.event.active) simulation2.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// ramp up collision strength to provide smooth transition
var transitionTime2 = 500;
var t2 = d3.timer(function (elapsed) {
    var dt = elapsed / transitionTime2;
    simulation2.force('collide').strength(Math.pow(dt, 2) * 0.3);
    if (dt >= 1.0) t2.stop();
});

function layoutTick2 (e) {
    node3.attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('r', function (d) { return d.radius; });

    text3.attr('dx', function (d) { return d.x - 15; })
        .attr('dy', function (d) { return d.y; })
        .attr('r', function (d) { return d.radius; });
    // console.log(text3);
};