// dataset = {
//     "children": [
//         {
//             "facilityId": "65+",
//             "responseCount": 54,
//             "color": 9
//         },{
//             "facilityId": "55-64",
//             "responseCount": 50,
//             "color": 9
//         },{
//             "facilityId": "45-54",
//             "responseCount":38,
//             "color": 10
//         },{
//             "facilityId": "35-44",
//             "responseCount": 31,
//             "color": 10
//         },{
//             "facilityId": "25-34",
//             "responseCount": 22,
//             "color": 11
//         },{
//             "facilityId": "18-24",
//             "responseCount": 21,
//             "color": 12
//         }
//     ]
// };
//
// var diameter = 500;
// var colorb = d3.scaleOrdinal()
//     .domain(["New York", "San Francisco", "Austin", "haha", "haho",
//         "ss", "we", "wef", "pop", "ewe"])
//     // .range(["#912427", "#511416" , "#D13438", "#DE373B", "#B72E31"]);
//     .range([  "#D13438", "#D97779", "#C63135"]);
//
//
//
// var bubble = d3.pack(dataset)
//     .size([diameter * 0.8, diameter * 0.8])
//     .padding(1.5);
// var svg = d3.select("#visualization1a")
//     .append("svg")
//     .attr("width", diameter)
//     .attr("height", diameter)
//     .attr("class", "bubble");
//
// var tooltip3 = d3.select("#visualization1a")
//     .append("div")
//     .style("position", "absolute")
//     // .style("top", (d3.event.pageY - 28) + "px");
//     .style("z-index", "10")
//     .style("visibility", "hidden")
//     .text("lol");
//
// var nodes = d3.hierarchy(dataset)
//     .sum(function(d) { return d.responseCount; });
//
// var node = svg.selectAll(".node")
//     .data(bubble(nodes).descendants())
//     .enter()
//     .filter(function(d){
//         return  !d.children
//     })
//     .append("g")
//     .attr("class", "node")
//     .attr("transform", function(d) {
//         return "translate(" + d.x + "," + d.y + ")";
//     });
//
// // var div = d3.select("#visualization1a").append("div")
// //     .attr("class", "tooltip")
// //     .style("opacity", 0);
//
// node.append("title")
//     .text(function(d) {
//         return d.facilityId + ": " + d.responseCount * 0.01;
//     });
//
// node.append("circle")
//     .attr("r", function(d) {
//         return d.r;
//     })
//     .style("fill", function(d) {
//         return colorb(d.data.color);
//     })
//     .attr("fill", "#a9592a");
//
// node.append("text")
//     .attr("dy", ".3em")
//     .style("text-anchor", "middle")
//     .text(function(d) {
//         return d.data.responseCount + "%";
//     });
//
// d3.select(self.frameElement)
//     .style("height", diameter + "px");
//
// d3.select("#visualization1a").selectAll(".node")
// // .data(data.children)
// // .enter()
//     .on("mouseover", function(d){
//         // console.log(d);
//         // tooltip.text(d.data.name + " " + d.facilityId);
//         return tooltip3.style("visibility", "visible");
//     })
//     .on("mousemove", function(){
//         return tooltip3.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
//     })
//     .on("mouseout", function(){
//         return tooltip3.style("visibility", "hidden");
//     });
//
// dataset2 = {
//     "children": [
//         {
//             "facilityId": "Somewhat agree",
//             "responseCount": 46,
//             "color": 5
//         },  {
//             "facilityId": "Completely agree",
//             "responseCount": 26,
//             "color": 5
//         },  {
//             "facilityId": "Don't know",
//             "responseCount": 14,
//             "color": 6
//         },  {
//             "facilityId": "Somewhat disagree",
//             "responseCount": 3,
//             "color": 7
//         }, {
//             "facilityId": "Completely disagree",
//             "responseCount":3,
//             "color": 7
//         }
//     ]
// };
//
//
// var svg2 = d3.select("#visualization1c")
//     .append("svg")
//     .attr("width", diameter)
//     .attr("height", diameter)
//     .attr("class", "bubble");
//
// var nodes2 = d3.hierarchy(dataset2)
//     .sum(function(d) { return d.responseCount; });
//
// var node2 = svg2.selectAll(".node")
//     .data(bubble(nodes2).descendants())
//     .enter()
//     .filter(function(d){
//         return  !d.children
//     })
//     .append("g")
//     .attr("class", "node")
//     .attr("transform", function(d) {
//         return "translate(" + d.x + "," + d.y + ")";
//     });
//
// node2.append("title")
//     .text(function(d) {
//         return d.facilityId + ": " + d.responseCount;
//     });
//
// node2.append("circle")
//     .attr("r", function(d) {
//         return d.r;
//     })
//     .style("fill", function(d) {
//         return colorb(d.data.color);
//     });
//
// node2.append("text")
//     .attr("dy", ".3em")
//     .style("text-anchor", "middle")
//     .text(function(d) {
//         return d.data.responseCount + "%";
//     });
//
// d3.select(self.frameElement)
//     .style("height", diameter + "px");
//

var dataset2 = {
    "children": [
        {
            "facilityId": "65+",
            "responseCount": 54,
            "color": 9
        }, {
            "facilityId": "55-64",
            "responseCount": 50,
            "color": 9
        }, {
            "facilityId": "45-54",
            "responseCount": 38,
            "color": 10
        }, {
            "facilityId": "35-44",
            "responseCount": 31,
            "color": 10
        }, {
            "facilityId": "25-34",
            "responseCount": 22,
            "color": 11
        }, {
            "facilityId": "18-24",
            "responseCount": 21,
            "color": 12
        }
    ]
};

var width2 = 430,
    height2 = 500;
//     padding = 1.5,



var diameter = 500,
    padding = 1.5, // separation between same-color nodes
    clusterPadding = 6, // separation between different-color nodes
    maxRadius = 12;

var n = 6, // total number of nodes
    m = 6; // number of distinct clusters

//    var color = d3.scaleSequential(d3.interpolateRainbow)
//        .domain(d3.range(m));
var colorc = d3.scaleOrdinal()
    .domain(["New York", "San Francisco", "Austin", "haha", "haho",
        "ss", "we", "wef", "pop", "ewe"])
    // .range(["#912427", "#511416" , "#D13438", "#DE373B", "#B72E31"]);
    .range([  "#6F257F", "#BD78CB", "#8A5894"]);


// The largest node for each cluster.
var clusters = new Array(m);
var i = 0;
var nodes = d3.range(n).map(function () {

//        var i = Math.floor(Math.random() * m),
//            r = Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
    r = dataset2.children[i].responseCount,
        d = {
            cluster: i,
            radius: r,
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
//     .attr('width', width2)
//     .attr('height', height2);
var svg = d3.select("#visualization1a")
    .append("svg")
    .attr("width", width2)
    .attr("height", height2);
    // .attr("class", "bubble");

var group = svg.selectAll('g')
    .data(nodes)
    .enter().append('g');

var node = group.append('circle')
    .style('fill', function (d) {
        return colorc(d.color);
    });


var text = group.append("text")
    .text(function(d) {
        return d.text;
    })
    //        .attr("dx", function(d) {
    //            return d.x;
    //        })
    //        .attr("dy", function(d) {
    //            return d.y;
    //        })
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
//

// console.log(text);
function layoutTick (e) {
    node
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('r', function (d) { return d.radius; });

    text
        .attr('dx', function (d) { return d.x; })
        .attr('dy', function (d) { return d.y; })
        .attr('r', function (d) { return d.radius; });
};
