
d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
        this.parentNode.appendChild(this);
    });
};

var removePunctuation = function(string) {
    return string.replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g," ").replace(/\s{2,}/g," ");
};

var visWidth = 1100;
var visHeight = 700;

//  - more likely - the interesting spacing is removed in the gutenberg version
var sentenceLengths = function(text) {
    // text = text.replace(/['\"\‘\’]/gm,"");
    // tregex = /\n|([^\r\n.!?]+([.!?]+|$))/gim;
    // var sentences = text.match(tregex).map(function(s) { return s.trim(); });

    var sentences = text.split("\n");

    var data = sentences.map(function(s) {
        var d = {};
        d.sentence = s.replace(/ /g, '\u00a0');
        d.lookupSentence = removePunctuation(s).toLowerCase();
        d.length = s.length;
        return d;
    });

    return data;
};

var getWords = function(text) {
    text = text.replace(/['\"\‘\’]/gm,"");
    // text = text.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    text = removePunctuation(text);
    var allWords = text.split(" ").map(function(w) { return {"word": w};});
    var wordCenters = radialPlacement().width(460).height(280).center({"x":visWidth / 2, "y":visHeight / 2 });
    wordCenters(allWords);

    var wordsLen = allWords.length;
    var words = d3.map();
    for(var i = 0;i < wordsLen;i++) {
        var word = allWords[i];
        var wordList = [];
        var wordKey = word.word.toLowerCase();
        if(words.has(wordKey)) {
            wordList = words.get(wordKey);
        }
        wordList.push({"word":word.word, "index":i, "pos":i / wordsLen, "x":word.x, "y":word.y, "angle":word.angle});
        words.set(wordKey, wordList);
    }

    var getMostFrequent = function(positions) {
        if (positions.length === 1) {
            return positions[0].word;
        }

        var wordCounts = d3.nest()
            .key(function(p) { return p.word; })
            .rollup(function(words) { return words.length;})
            .entries(positions);

        wordCounts.sort(function(a,b) { return b.values - a.values; });
        return wordCounts[0].key;
    };

    var wordMap = [];
    words.each(function(positions, word) {

        var w = {"key":positions[0].word};
        w.visual = getMostFrequent(positions);
        w.x = d3.sum(positions.map(function(p) { return p.x; })) / positions.length;
        w.y = d3.sum(positions.map(function(p) { return p.y; })) / positions.length;
        w.positions = positions;
        w.count = positions.length;
        wordMap.push(w);
    });

    // sort to put more frequent words on top
    return wordMap.sort(function(a,b) { return a.count - b.count; });
};

var radialPlacement = function() {
    var values = d3.map();
    var increment = 20;
    var radius = 200;
    var width = 500;
    var height = 300;
    var tapper = -50;
    var center = {"x":0, "y":0};
    var start = -90;

    var current = start;

    var radialLocation = function(center, angle, width, height, tapper) {
        return {"x":(center.x + (width * Math.cos(angle * Math.PI / 180) - tapper)),
            "y": (center.y + (height * Math.sin(angle * Math.PI / 180) + tapper))};
    };

    var place = function(obj) {
        var value = radialLocation(center, current, width, height, tapper);
        // now it just adds attributes to the object. DANGEROUS
        obj.x = value.x;
        obj.y = value.y;
        obj.angle = current;
        current += increment;
        tapper += increment;
        tapper = Math.min(tapper, 0);
        return value;
    };

    var placement = function(keys) {
        values = d3.map();
        increment = 360 / keys.length;

        keys.forEach(function(k) {
            place(k);
        });
    };

    placement.keys = function(_) {
        if (!arguments.length) {
            return d3.keys(values);
        }
        setKeys(_);
        return placement;
    };

    placement.center = function(_) {
        if (!arguments.length) {
            return center;
        }
        center = _;
        return placement;
    };

    placement.width = function(_) {
        if (!arguments.length) {
            return width;
        }

        width = _;
        return placement;
    };

    placement.height = function(_) {
        if (!arguments.length) {
            return height;
        }

        height = _;
        return placement;
    };

    placement.start = function(_) {
        if (!arguments.length) {
            return start;
        }
        start = _;
        return placement;
    };

    return placement;
};

var chart = function() {
    var width = visWidth;
    var height = visHeight;
    var margin = {top: 20, right: 20, bottom: 20, left: 20};
    var g = null;
    var sentence = null;
    var word = null;

    var sentenceCenters = radialPlacement().width(520).center({"x":width / 2 - 30, "y":height / 2 });

    var chart = function(selection) {
        selection.each(function(rawData) {

            var sentences = rawData.sentences;
            sentenceCenters(sentences);

            var words = rawData.words;

            var svg = d3.select(this).selectAll("svg").data([sentences]);
            var gEnter = svg.enter().append("svg")

            svg.merge(gEnter)
                .attr("width", width + margin.left + margin.right )
                .attr("height", height + margin.top + margin.bottom );
            g = gEnter.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            sentence = g.selectAll(".sentence")
                .data(sentences)
                .enter()
                .append("text")
                .attr("class", "sentence")
                .attr("x",  function(d) { return d.x; })
                .attr("y",  function(d) { return d.y; })
                // .attr("text-anchor", function(d) { return d.angle > 90 ? "end" : "start"; })
                .attr("text-anchor", "start")
                // .attr("fill", "#ddd")
                 .attr("opacity", 0)
                .attr("font-size", "2px")
                .text(function(d) { return d.sentence; });

            var maxCount = d3.max(words, function(w) { return w.count; });
            var color = d3.scaleLog()
                .domain([1,maxCount / 2])
                .range(["#ffefed", "#ff1d2a"]);

            word = g.selectAll(".word")
                .data(words.filter(function(w) { return stop_words.indexOf(w.key) == -1; })).enter()
                .append("text")
                .attr("class", "word")
                .attr("x",  function(d) { return d.x; })
                .attr("y",  function(d) { return d.y; })
                .attr("text-anchor", "middle")
                .attr("text-anchor", function(d) { return d.x > (width / 2) ? "end" : "start"; })
                // .attr("font-size", function(d) { return (Math.min(d.count, 12)) + "px";})
                .attr("font-size", "8px")
                // .attr("fill", "#ddd")
                // .attr("opacity", function(d) { return Math.min(d.count / 20, 0.5); })
                // .attr("opacity", function(d) { return d.count > 30 ? 0.9 : 0.4; })
                // .attr("fill", function(d) { return d.count > 30 ? "#ddd": "#555"; })
                .attr("fill", function(d) { return  color(d.count); })
                .text(function(d) { return d.visual; })
                .on("mouseover", mouseover)
                .on("mouseout", mouseout);
        });
    };

    function getSentencesWith(aWord) {
        return sentence.filter(function(s) {
            return s.lookupSentence.indexOf(aWord.toLowerCase()) > -1;
        });
    }

    function mouseover(d,i) {
        var bbox = this.getBBox();
        var direction = d.x > (width / 2) ? -1 : 1;
        g.selectAll(".line")
            .data(d.positions)
            .enter()
            .append("line")
            .attr('pointer-events', 'none')
            .attr("class", "line")
            .attr("x1", d.x + (direction * (bbox.width / 2)))
            .attr("y1", d.y - (bbox.height / 3))
            .attr("x2", function(p) { return p.x; })
            .attr("y2", function(p) { return p.y; });

        d3.select("#word").html(d.visual);

        if( !d.sentences ) {
            d.sentences = getSentencesWith(d.key);
        }
        d.sentences.classed("highlight", true)//.moveToFront();
    }

    function mouseout(d,i) {
        g.selectAll(".line").remove();
        d.sentences.classed("highlight", false);
    }

    return chart;
};

function plotData(selector, data, plot) {
    d3.select(selector)
        .datum(data)
        .call(plot);
}

var plot = chart();

function display(error, text) {
    var sentences = sentenceLengths(text);
    var words = getWords(text);
    plotData("#vis", {"sentences":sentences, "words": words}, plot);
}

d3.queue()
    .defer(d3.text, "data/alice.txt")
    .await(display);
