dataset = {
    "children": [{
        "facilityId": "Entertainment",
        "responseCount": 66
    }, {
        "facilityId": "Education",
        "responseCount": 61
    }, {
        "facilityId": "Marketing/media",
        "responseCount": 57
    }, {
        "facilityId": "Healthcare/medical",
        "responseCount":55
    }, {
        "facilityId": "Travel",
        "responseCount": 55
    }, {
        "facilityId": "Technology",
        "responseCount": 44
    }, {
        "facilityId": "Real Estate",
        "responseCount": 41
    }, {
        "facilityId": "Government/Military",
        "responseCount": 39
    }, {
        "facilityId": "Engineering",
        "responseCount": 37
    }, {
        "facilityId": "Aerospace",
        "responseCount": 35
    }, {
        "facilityId": "Retail",
        "responseCount": 33
    }, {
        "facilityId": "Transportation",
        "responseCount": 33
    }, {
        "facilityId": "Manufacturing",
        "responseCount": 25
    }, {
        "facilityId": "Telecommunications",
        "responseCount": 24
    }, {
        "facilityId": "Mining/Construction/Petroleum/Agriculture",
        "responseCount": 18
    }, {
        "facilityId": "Utilities",
        "responseCount": 12
    }, {
        "facilityId": "Insurance",
        "responseCount": 8
    }, {
        "facilityId": "Legal",
        "responseCount": 2
    }, {
        "facilityId": "Unsure",
        "responseCount": 3
    }, {
        "facilityId": "Other",
        "responseCount": 1
    }
    ]
};

var diameter = 600;
var colorb = d3.scaleOrdinal(d3.schemeCategory20);

var bubble = d3.pack(dataset)
    .size([diameter, diameter])
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
        return d.facilityId + ": " + d.responseCount;
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
        return d.data.facilityId.substring(0, d.r / 3) + ": " + d.data.responseCount;
    });

d3.select(self.frameElement)
    .style("height", diameter + "px");

