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
    $('.row-offcanvas').toggleClass('active')
  });
});

// Main navigation

jQuery(document).on('click', '.mega-dropdown', function(e) {
  e.stopPropagation()
})

/*****************************************************************************/
/*
/* PDP PAGE
/*
/*****************************************************************************/

// Getting image from vertical thumbnail gallery on click

$(document).ready(function () {
        $("div.col-sm-12 a").click(function (event) {
            event.preventDefault();
            $("div.product-frame").html($("<img>").attr("src", this.href).fadeIn(1000));
        });
    });