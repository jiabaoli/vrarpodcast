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


const margin = {top: 40, right: 10, bottom: 10, left: 10},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    color = d3.scaleOrdinal().range(d3.schemeCategory20c);

const treemap = d3.treemap().size([width, height]);

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
        .style("background", (d) => color(d.parent.data.name))
        .text((d) => d.data.name);

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
    });
});