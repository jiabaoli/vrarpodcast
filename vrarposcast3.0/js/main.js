/* ======================================
	
	Template: Moto - App Landing Page
	Css Name: Main Js
	Version: 1
	Design and Developed by: Hastech

========================================= */

/*================================================
[  Table of contents  ]
================================================

	01. Menu Navvar
	02. Nav Var Remove Add
	03. Scrool Spy
	04. Sticky Header
	05. Counter Up
	06. Testimonial Owl Active
	07. Mailchimp Active
	08. Magnific Popup Video
	09. Slider Full Carousel
	10. Slider Text Carousel
	11. YTPlayer Active
	12. Screenshot Slider
	13. scrollUp
	
================================================*/

(function ($) {
 "use strict";
	
	//  01. Menu Navvar
	$(".navbar-nav a, .scroll-icon a, .appai-preview .button-group a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
	
	// 02. Nav Var Remove Add
    $(document).on("click", ".navbar-nav a", function() {
        $(".navbar-nav").find("li").removeClass("active");
        $(this).closest("li").addClass("active");
    });
	
	// 03. Scrool Spy
    $('body').scrollspy({ target: '#navigation' })
 
	// 04. Sticky Header
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 0) {
            $('#header-top').addClass("navbar-fixed-top");
        } else {
            $('#header-top').removeClass("navbar-fixed-top");
        }
    });
	
	// 05. Counter Up
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
	
	// 06. Testimonial Owl Active
	$('.testimonial-active').owlCarousel({
		items:1,
		lazyLoad:true,
		dots:false,
		loop:false,
		margin:10
	});
	
	// 07. Mailchimp Active
	$('#mc-form').ajaxChimp({
		 language: 'en',
		 callback: mailChimpResponse,
		 // ADD YOUR MAILCHIMP URL BELOW HERE!
		 url: 'http://themeshaven.us8.list-manage.com/subscribe/post?u=759ce8a8f4f1037e021ba2922&amp;id=a2452237f8'
		});
		function mailChimpResponse(resp) {
		 if (resp.result === 'success') {
		  $('.mailchimp-success').html('' + resp.msg).fadeIn(900);
		  $('.mailchimp-error').fadeOut(400);
		  
		 } else if(resp.result === 'error') {
		  $('.mailchimp-error').html('' + resp.msg).fadeIn(900);
		 }  
	}
	
    // 08. Magnific Popup Video		
     $('.video-popup').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        zoom: {
            enabled: true,
        }
    });
	
    // 09. Slider Full Carousel
    $(".slider-full-carousel").owlCarousel({
        loop:true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 2500,
        nav:true,
        navText: ["<i class='icofont icofont-thin-left'></i>","<i class='icofont icofont-thin-right'></i>"],
        items:1,
		dots:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
	
    // 10. Slider Text Carousel
    $(".slider-carousel").owlCarousel({
        loop:true,
        smartSpeed: 2500,
        nav:true,
        navText: ["<i class='icofont icofont-thin-left'></i>","<i class='icofont icofont-thin-right'></i>"],
        items:1,
        dots:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
	
	// 11. YTPlayer Active
    $("#bgndVideo").YTPlayer();
	
	// 12. Screenshot Slider
	$('.screenshot-slider').slick({
	  centerMode: true,
	  centerPadding: '0',
	  slidesToShow: 3,
	  dots: false,
	  arrows: false,
	  autoplay:true,
	  prevArrow: '<button class="slick-prev ss2-prev" type="button"><i class="icofont icofont-thin-left"></i></i></button>',
	  nextArrow: '<button class="slick-next ss2-next" type="button"><i class="icofont icofont-thin-right"></i></button>',
	});
	
	// 13. scrollUp
	$.scrollUp({
		scrollText: '<i class="fa fa-angle-up"></i>',
		easingType: 'linear',
		scrollSpeed: 900,
		animation: 'fade'
	});
	
	
})(jQuery);



const margin = {top: 10, right: 10, bottom: 50, left: 30},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    // color = d3.scaleOrdinal().range(d3.schemeCategory20c);
    color = d3.scaleOrdinal()
        .domain(["New York", "San Francisco", "Austin", "haha", "haho",
                 "ss", "we", "wef", "pop", "ewe"])
        // .range(["#912427", "#511416" , "#D13438", "#DE373B", "#B72E31"]);
        .range([  "#D13438", "#D97779", "#9E272A", "#E1BFBF"]);



var g2 = d3.select("#visualization1b").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("data/brand.csv", function(data) {
    var formatter = d3.format("0f");
    // var formatter = d3.format(".0%");
    var interval = 80;
    var x = d3.scaleOrdinal()
        .domain(["Samsung Gear VR", "PlayStation VR", "HTC Vive", "Google Daydream", "Oculus Rift"])
        .range([interval*0.5, interval*1.5, interval*2.5, interval*3.5, interval*4.5]);

    var y = d3.scaleLinear()
        .domain([0, 4600])
        .range([height, 0]);

    var xAxis = d3.axisBottom()
        .scale(x);

    var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(10);

    var xAxisGroup = g2.append("g")
        .attr("class", "x-axis axis");

    var yAxisGroup = g2.append("g")
        .attr("class", "y-axis axis");

    data.forEach(function(d){
        d.Shipments = +d.Shipments;
    });

    g2.selectAll("rect").data(data)
        .enter()
        .append("rect")
        .attr("fill", "#e1666b")
        .attr("transform", "translate(40," + 0 + ")")
        .attr("width", interval/2)
        .attr("height", function(d){ return height - y(d.Shipments); })
        .attr("x", function(d, index) {
            return (index*interval+10);
        })
        .attr("y", function(d){ return y(d.Shipments); });

    g2.selectAll("tex-height").data(data)
        .enter()
        .append("text")
        .attr("transform", "translate(40," + 0 + ")")
        .attr("color", "black")
        .attr("class", "height-label")
        .attr("x", function(d, index) {
            return (index*interval+22);
        })
        .attr("y", function(d) {
            return y(d.Shipments)-10;})
        .text( function (d) { return d.Shipments; } );

    xAxisGroup = g2.select(".x-axis")
        .attr("transform", "translate(30," + height + ")")
        .call(xAxis);

    yAxisGroup = g2.select(".y-axis")
        .attr("transform", "translate(40," + 0 + ")")
        .call(yAxis);

    g2.append("text")
        .attr("x", (width / 2 - 450))
        .attr("y", -10)
        .attr("text-anchor", "left")
        .style("font-size", "16px")
        .text("shipments (in 1,000s)");

});

var g3 = d3.select("#visualization1e").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("data/adoption.csv", function(data) {

    // format the data
    data.forEach(function(d) {
        d.year = +d.year;
        d.Lowadoption = +d.Lowadoption;
        d.Mediumadoption = +d.Mediumadoption;
        d.Highadoption = +d.Highadoption;
    });

    console.log(data);


    // var formatter = d3.format(".0%");
    var interval = 80;
    var x = d3.scaleOrdinal()
        .domain(["2016", "2017", "2018", "2019", "2020"])
        .range([interval*0.5, interval*1.5, interval*2.5, interval*3.5, interval*4.5]);

    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, function(d) { return d.Highadoption; })]);

    var xAxis = d3.axisBottom()
        .scale(x);

    var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(10);

    var xAxisGroup = g3.append("g")
        .attr("class", "x-axis axis");

    var yAxisGroup = g3.append("g")
        .attr("class", "y-axis axis");


    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.Lowadoption); });


    // define the line
    var valueline2 = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.Mediumadoption); });

    // define the line
    var valueline3 = d3.line()
        .x(function(d) {
            console.log(d.year);
            return x(d.year);
        })
        .y(function(d) { return y(d.Highadoption); });


    // Add the valueline path.
    g3.append("path")
        .data([data])
        .attr("transform", "translate(25," + 0 + ")")
        .attr("class", "line1")
        .attr("d", valueline);

    // Add the valueline path.
    g3.append("path")
        .data([data])
        .attr("transform", "translate(25," + 0 + ")")
        .attr("class", "line2")
        .attr("d", valueline2);

    // Add the valueline path.
    g3.append("path")
        .data([data])
        .attr("transform", "translate(25," + 0 + ")")
        .attr("class", "line3")
        .attr("d", valueline3);


    var circle = g3.selectAll("circle")
        .data(data);

    circle.enter().append("circle")
        .merge(circle)
        .transition()
        .duration(500)
        .attr("transform", "translate(25," + 0 + ")")
        .attr("cx", function(d) {
            return x(d.year);
        })
        .attr("cy", function(d) {
            return y(d.Lowadoption);
        })
        .attr("r", 5)
        .attr("stroke", "black")
        .attr("fill", "white");

    circle.enter().append("circle")
        .merge(circle)
        .transition()
        .duration(500)
        .attr("transform", "translate(25," + 0 + ")")
        .attr("cx", function(d) {
            return x(d.year);
        })
        .attr("cy", function(d) {
            return y(d.Highadoption);
        })
        .attr("r", 5)
        .attr("stroke", "black")
        .attr("fill", "white");

    circle.enter().append("circle")
        .merge(circle)
        .transition()
        .duration(500)
        .attr("transform", "translate(25," + 0 + ")")
        .attr("cx", function(d) {
            return x(d.year);
        })
        .attr("cy", function(d) {
            return y(d.Mediumadoption);
        })
        .attr("r", 5)
        .attr("stroke", "black")
        .attr("fill", "white");

    xAxisGroup = g3.select(".x-axis")
        .attr("transform", "translate(25," + height + ")")
        .call(xAxis);

    yAxisGroup = g3.select(".y-axis")
        .attr("transform", "translate(40," + 0 + ")")
        .call(yAxis);

    g3.append("text")
        .attr("x", (width / 2 - 450))
        .attr("y", -10)
        .attr("text-anchor", "left")
        .style("font-size", "16px")
        .text("Adoption rate (%)");

    g3.append("text")
        .attr("x", (width / 2 - 380))
        .attr("y", 10)
        .attr("text-anchor", "left")
        .style("font-size", "16px")
        .text("Low adoption");

    g3.append("text")
        .attr("x", (width / 2 - 380))
        .attr("y", 25)
        .attr("text-anchor", "left")
        .style("font-size", "16px")
        .text("Medium adoption");

    g3.append("text")
        .attr("x", (width / 2 - 380))
        .attr("y", 40)
        .attr("text-anchor", "left")
        .style("font-size", "16px")
        .text("High adoption");



    g3.append("circle")
        .attr("cx", x(2016) + 25)
        .attr("cy", 35)
        .attr("r", 5)
        .attr("fill", "#d13438");

    g3.append("circle")
        .attr("cx", x(2016) + 25)
        .attr("cy", 20)
        .attr("r", 5)
        .attr("fill", "#D97779");

    g3.append("circle")
        .attr("cx", x(2016) + 25)
        .attr("cy", 5)
        .attr("r", 5)
        .attr("fill", "#511416");
});