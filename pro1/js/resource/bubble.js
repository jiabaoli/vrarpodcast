dataset = {
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

var diameter = 400;
var colorb = d3.scaleOrdinal(d3.schemeCategory20b);

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
        return colorb(d.data.color);
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
        return colorb(d.data.color);
    });

node2.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.facilityId.substring(0, d.r / 3) + ": " + d.data.responseCount + "%";
    });

d3.select(self.frameElement)
    .style("height", diameter + "px");

