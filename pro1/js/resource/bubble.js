dataset = {
    "children": [{
        "facilityId": "18-24",
        "responseCount": 21
    }, {
        "facilityId": "25-34",
        "responseCount": 22
    }, {
        "facilityId": "35-44",
        "responseCount": 31
    }, {
        "facilityId": "45-54",
        "responseCount":38
    }, {
        "facilityId": "55-64",
        "responseCount": 50
    }, {
        "facilityId": "65+",
        "responseCount": 54
    }
    ]
};

var diameter = 400;
var colorb = d3.scaleOrdinal(d3.schemeCategory20);

var bubble = d3.pack(dataset)
    .size([diameter * 0.8, diameter * 0.8])
    .padding(1.5);
var svg = d3.select("#visualization1a")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

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

node.append("title")
    .text(function(d) {
        return d.facilityId + ": " + d.responseCount * 0.01;
    });

node.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("fill", function(d) {
        return colorb(d.responseCount);
    });

node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.facilityId.substring(0, d.r / 3) + ": " + d.data.responseCount + "%";
    });

d3.select(self.frameElement)
    .style("height", diameter + "px");

dataset2 = {
    "children": [{
        "facilityId": "Completely agree",
        "responseCount": 26
    }, {
        "facilityId": "Somewhat agree",
        "responseCount": 46
    }, {
        "facilityId": "Somewhat disagree",
        "responseCount": 11
    }, {
        "facilityId": "Completely disagree",
        "responseCount":3
    }, {
        "facilityId": "Don't know",
        "responseCount": 14
    }
    ]
};
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
        return colorb(d.responseCount);
    });

node2.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.facilityId.substring(0, d.r / 3) + ": " + d.data.responseCount + "%";
    });

d3.select(self.frameElement)
    .style("height", diameter + "px");

