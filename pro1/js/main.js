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


const margin = {top: 40, right: 10, bottom: 50, left: 0},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    color = d3.scaleOrdinal().range(d3.schemeCategory20c);



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
        .scale(y);

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
        .attr("width", interval/2)
        .attr("height", function(d){ return height - y(d.Shipments); })
        .attr("x", function(d, index) {
            return (index*interval+10);
        })
        .attr("y", function(d){ return y(d.Shipments); });

    g2.selectAll("tex-height").data(data)
        .enter()
        .append("text")
        .attr("color", "black")
        .attr("class", "height-label")
        .attr("x", function(d, index) {
            return (index*interval+25);
        })
        .attr("y", function(d) {
            return y(d.Shipments)-10;})
        .text( function (d) { return d.Shipments; } );

    xAxisGroup = g2.select(".x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    yAxisGroup = g2.select(".y-axis")
        .call(yAxis);

    // g2.append("text")
    //     .attr("x", (width / 2))
    //     .attr("y", 0)
    //     .attr("text-anchor", "middle")
    //     .style("font-size", "16px")
    //     .text("Global virtual reality headset shipments by brand 2016 (in 1,000s)");

});

