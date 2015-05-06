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

// $(document).on('click', '.mega-dropdown', function(e) {
//   e.stopPropagation();
// });

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