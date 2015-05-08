/*****************************************************************************/
/*
/* POP PAGE
/*
/*****************************************************************************/

// Close hamburger menu on click

// $(function () {
// 	$('.navbar-collapse ul li a:not(.dropdown-toggle)').bind('click touchstart', function () {
// 	    $('.navbar-toggle:visible').click();
// 	});
// });

// Off-canvas menu 

$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active');
  });
});

// Main navigation

$(document).on('click', '.mega-dropdown', function(e) {
  e.stopPropagation();
});

// Price range slider 

$(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 1000,
      values: [ 0, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  });

/*****************************************************************************/
/*
/* PDP PAGE
/*
/*****************************************************************************/

// Getting image from vertical thumbnail on click

$(document).ready(function () {
        $(".product-thumb").click(function (event) {
            event.preventDefault();
            $("div.product-frame").html($("<img>").attr("src", this.href).fadeIn(100));
        });
    });

// Loading first child of vertical thumbnail on pageload 

$(document).ready(function () {
    var href = $('#first-thumb').get(0).href;
    $('div.product-frame').html($('<img>').attr('src', href).fadeIn(100));
});