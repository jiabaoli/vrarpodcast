<<<<<<< HEAD:vrarpodcast2.0/freewrite.bonnemarque.se/js/bubble.js
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
=======
dataset = {
>>>>>>> 9326b594c16983ad01c7e6c74fe84d3c326e85fb:vrarpodcast2.0/freewrite.bonnemarque.se/js/resource/bubble.js
    "children": [
        {
            "facilityId": "65+",
            "responseCount": 54,
            "color": 9
        },{
            "facilityId": "55-64",
            "responseCount": 50,
            "color": 9
        },{
            "facilityId": "45-54",
            "responseCount":38,
            "color": 10
        },{
            "facilityId": "35-44",
            "responseCount": 31,
            "color": 10
        },{
            "facilityId": "25-34",
            "responseCount": 22,
            "color": 11
        },{
            "facilityId": "18-24",
            "responseCount": 21,
            "color": 12
        }
    ]
};

<<<<<<< HEAD:vrarpodcast2.0/freewrite.bonnemarque.se/js/bubble.js
var width2 = 430,
    height2 = 500;
//     padding = 1.5,



var diameter = 500,
    padding = 1.5, // separation between same-color nodes
    clusterPadding = 6, // separation between different-color nodes
    maxRadius = 12;
=======
var diameter = 500;
var colorb = d3.scaleOrdinal(d3.schemeCategory20c);
>>>>>>> 9326b594c16983ad01c7e6c74fe84d3c326e85fb:vrarpodcast2.0/freewrite.bonnemarque.se/js/resource/bubble.js

var bubble = d3.pack(dataset)
    .size([diameter * 0.8, diameter * 0.8])
    .padding(1.5);
var svg = d3.select("#visualization1a")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

<<<<<<< HEAD:vrarpodcast2.0/freewrite.bonnemarque.se/js/bubble.js
//    var color = d3.scaleSequential(d3.interpolateRainbow)
//        .domain(d3.range(m));
var colorc = d3.scaleOrdinal()
    .domain(["New York", "San Francisco", "Austin", "haha", "haho",
        "ss", "we", "wef", "pop", "ewe"])
    // .range(["#912427", "#511416" , "#D13438", "#DE373B", "#B72E31"]);
    .range([  "#6F257F", "#BD78CB", "#8A5894"]);
=======
>>>>>>> 9326b594c16983ad01c7e6c74fe84d3c326e85fb:vrarpodcast2.0/freewrite.bonnemarque.se/js/resource/bubble.js

var nodes = d3.hierarchy(dataset)
    .sum(function(d) { return d.responseCount; });

var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d){
        return  !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

<<<<<<< HEAD:vrarpodcast2.0/freewrite.bonnemarque.se/js/bubble.js
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
=======
node.append("title")
    .text(function(d) {
        return d.facilityId + ": " + d.responseCount * 0.01;
    });

node.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("fill", function(d) {
        return colorb(d.data.color);
    })
    .attr("fill", "#a9592a");

node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.facilityId.substring(0, d.r / 3) + ": " + d.data.responseCount + "%";
    });
>>>>>>> 9326b594c16983ad01c7e6c74fe84d3c326e85fb:vrarpodcast2.0/freewrite.bonnemarque.se/js/resource/bubble.js

d3.select(self.frameElement)
    .style("height", diameter + "px");

dataset2 = {
    "children": [
        {
            "facilityId": "Somewhat agree",
            "responseCount": 46,
            "color": 5
        },  {
            "facilityId": "Completely agree",
            "responseCount": 26,
            "color": 5
        },  {
            "facilityId": "Don't know",
            "responseCount": 14,
            "color": 6
        },  {
            "facilityId": "Somewhat disagree",
            "responseCount": 3,
            "color": 7
        }, {
            "facilityId": "Completely disagree",
            "responseCount":3,
            "color": 7
        }
    ]
};


<<<<<<< HEAD:vrarpodcast2.0/freewrite.bonnemarque.se/js/bubble.js
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
=======
var svg2 = d3.select("#visualization1c")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var nodes2 = d3.hierarchy(dataset2)
    .sum(function(d) { return d.responseCount; });

var node2 = svg2.selectAll(".node")
    .data(bubble(nodes2).descendants())
    .enter()
    .filter(function(d){
        return  !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
>>>>>>> 9326b594c16983ad01c7e6c74fe84d3c326e85fb:vrarpodcast2.0/freewrite.bonnemarque.se/js/resource/bubble.js
    });

node2.append("title")
    .text(function(d) {
        return d.facilityId + ": " + d.responseCount;
    });

node2.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("fill", function(d) {
        return colorb(d.data.color);
    });

<<<<<<< HEAD:vrarpodcast2.0/freewrite.bonnemarque.se/js/bubble.js
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
=======
node2.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.facilityId.substring(0, d.r / 3) + ": " + d.data.responseCount + "%";
    });

d3.select(self.frameElement)
    .style("height", diameter + "px");
>>>>>>> 9326b594c16983ad01c7e6c74fe84d3c326e85fb:vrarpodcast2.0/freewrite.bonnemarque.se/js/resource/bubble.js

