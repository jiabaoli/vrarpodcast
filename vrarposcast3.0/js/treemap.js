const treemap = d3.treemap().size([width * 1.0, height * 1.0]);
const treemap2 = d3.treemap().size([width * 1.0, height * 1.0]);

var tooltip = d3.select("#visualization1")
    .append("div")
    // .style("position", "absolute")
    // .style("top", (d3.event.pageY - 28) + "px");
    .style("z-index", "10")
    .style("visibility", "hidden");

const div = d3.select("#visualization1").append("div")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px");

d3.json("data/industry.json", function(error, data) {
    if (error) throw error;
    console.log(data);

    const root = d3.hierarchy(data, (d) => d.children).sum((d) => d.size);

    const tree = treemap(root);

    const node = div.datum(root).selectAll(".node")
        .data(tree.leaves())
        .enter().append("div")
        .attr("class", "node")
        .style("left", (d) => d.x0 + "px")
        .style("top", (d) => d.y0 + "px")
        .style("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
        .style("height", (d) => Math.max(0, d.y1 - d.y0  - 1) + "px")
        .style("background", (d) => color(d.data.color))
        .text((d) => d.data.size);

    d3.selectAll("input").on("change", function change() {
        const value = this.value === "count"
            ? (d) => { return d.size ? 1 : 0;} : (d) => { return d.size; };

        const newRoot = d3.hierarchy(data, (d) => d.children).sum(value);

        node.data(treemap(newRoot).leaves())
            .transition()
            .duration(1500)
            .style("left", (d) => d.x0 + "px")
            .style("top", (d) => d.y0 + "px")
            .style("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
            .style("height", (d) => Math.max(0, d.y1 - d.y0  - 1) + "px")
    })

    // add the dots with tooltips
    d3.select("#visualization1").selectAll(".node")
        // .data(data.children)
        // .enter()
        .on("mouseover", function(d){
            tooltip.text(d.data.name + " " + d.data.size);
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function(){
            return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
        })
        .on("mouseout", function(){
            return tooltip.style("visibility", "hidden");
        });
});
var tooltip2 = d3.select("#visualization2")
    .append("div")
    // .style("position", "absolute")
    // .style("top", (d3.event.pageY - 28) + "px");
    .style("z-index", "10")
    .style("visibility", "hidden");

const div2 = d3.select("#visualization2").append("div")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px");

d3.json("data/market_size.json", function(error, data) {
    if (error) throw error;

    const root = d3.hierarchy(data, (d) => d.children).sum((d) => d.size);
    const tree = treemap2(root);
    const node = div2.datum(root).selectAll(".node")
        .data(tree.leaves())
        .enter().append("div")
        .attr("class", "node")
        .style("left", (d) => d.x0 + "px")
        .style("top", (d) => d.y0 + "px")
        .style("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
        .style("height", (d) => Math.max(0, d.y1 - d.y0  - 1) + "px")
        .style("background", (d) => color(d.data.color))
        .text((d) => d.data.size);

    d3.selectAll("input").on("change", function change() {
        const value = this.value === "count"
            ? (d) => { return d.size ? 1 : 0;} : (d) => { return d.size; };

        const newRoot = d3.hierarchy(data, (d) => d.children).sum(value);

        node.data(treemap2(newRoot).leaves())
            .transition()
            .duration(1500)
            .style("left", (d) => d.x0 + "px")
            .style("top", (d) => d.y0 + "px")
            .style("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
            .style("height", (d) => Math.max(0, d.y1 - d.y0  - 1) + "px")
    })

    // add the dots with tooltips
    d3.select("#visualization2").selectAll(".node")
    // .data(data.children)
    // .enter()
        .on("mouseover", function(d){
            tooltip2.text(d.data.name + " " + d.data.size);
            return tooltip2.style("visibility", "visible");
        })
        .on("mousemove", function(){
            return tooltip2.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
        })
        .on("mouseout", function(){
            return tooltip2.style("visibility", "hidden");
        });

});

