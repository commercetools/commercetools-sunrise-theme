/*****************************************************************************/
/*
/* NAVIGATION
/*
/*****************************************************************************/

$(document).ready(function(){
  // Toggle search bar on mobile
  $('.search-toggle').click(function(){
      $('.search-box').slideToggle();
  });

  // Location dropdown
  $(".location-dropdown-toggle").click(function () {
    $(".location-dropdown").slideToggle();
  });
});

  // Close dropdown when clicking outside of it
// $(document).mouseup(function (e) {
//   var container = $(".location-dropdown");
//   if (!container.is(e.target) // if the target of the click isn't the container
//     && container.has(e.target).length === 0) // nor a descendant of the container
//   {
//     container.hide();
//   }
// });

/*****************************************************************************/
/*
/* HOME PAGE
/*
/*****************************************************************************/

// $(document).ready(function() {
//   $(".slick-homepage").slick({
//     dots: true
//   });
// });

/*****************************************************************************/
/*
/* POP PAGE
/*
/*****************************************************************************/

// Activate megamenu accordion on smaller screens
$(function() {
  if ($(window).width() < 768) {
    $(".nav-accordion").accordion({
      heightStyle: "content",
      active: false,
      collapsible: true
    });
  }
});

// Toggling plus and minus icons for mobile navigation menu
$(".dropdown-toggle").click(function() {
    $(this).find(".mobile-plus-content").toggleClass("mobile-minus-content");
});

// Disabling bootstrap menu close on 2nd+ level items
$( ".dropdown-submenu" ).click(function(event) {
    // stop bootstrap.js to hide the parents
    event.stopPropagation();
    // hide the open children
    $( this ).find(".dropdown-submenu").removeClass('open');
    // add 'open' class to all parents with class 'dropdown-submenu'
    $( this ).parents(".dropdown-submenu").addClass('open');
    // this is also open (or was)
    $( this ).toggleClass('open');
});

// Close hamburger menu on select click or outside
$(function() {
  $('.navbar-collapse ul li a:not(.dropdown-toggle)').bind('click touchstart', function() {
    $('.navbar-toggle:visible').click();
  });
});

// Off-canvas menu
$(document).ready(function() {
  $('[data-toggle="offcanvas"]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });
});

// Price range slider
$(function() {
  $(".slider-range").slider({
    range: true,
    min: 0,
    max: 1000,
    values: [0, 1000],
    slide: function(event, ui) {
      // Getting handler values
      $('.s1').val('€ ' + ui.values[0]);
      $('.s2').val('€ ' + ui.values[1]);
    }
  });
});

// Adding dynamic ID to quickview modals
$( ".quickview" ).click(function( event ) {
  event.stopPropagation();
  var modalId = event.target.getAttribute('data-modal')
  $("#" + modalId).modal('show');
});

// Wishlist section
$( ".wishlist-btn" ).click(function() {
  $( ".wishlist-items" ).toggleClass("hidden");
});

// Dark background on opened menu (mobile)
$(".navbar-toggle").click(function() {
  $(".darkbg").toggleClass("hidden");
});

/*****************************************************************************/
/*
/* PDP PAGE
/*
/*****************************************************************************/

// Product gallery - BZoom
$("ul#bzoom").each( function(index, ul) {
  $ul = $(ul);
  $ul.zoom({
    zoom_area_width: 300,
    // MORE OPTIONS HERE
    small_thumbs: 4,
    autoplay: false
  });
});

// Expand product information on click
$( ".view-details" ).click(function() {
  event.preventDefault();
  $( this ).closest("div").find(".additional-description").slideToggle( "fast" )
});

// Toggle hidden/sliced description
$(function() {
    var hiddenDescription = $('p.pdp-product-description');

    hiddenDescription.each(function(){
        var t = $(this).text();
        if(t.length < 100) return;
        $(this).html(
            t.slice(0,100)+'<span>... </span>'+
            '<span class="hidden">'+ t.slice(100,t.length)+'</span>'
        );
    });

    $('.view-details').click(function() {
      $('.pdp-product-description span').toggleClass('hidden');
    });
});

// Slick gallery init
$(document).ready(function() {
  $('.gallery-mobile').slick({
    dots: true
  });
});

// Slick reviews init
$(document).ready(function() {
  $('.reviews-mobile').slick({
      dots: true
  });
});

/*****************************************************************************/
/*
/* CART PAGE
/*
/*****************************************************************************/

// Quantity counter / spinner
(function() {
  window.inputNumber = function(el) {
    var min = el.attr('min') || false;
    var max = el.attr('max') || false;
    el.each(function() {
      init($(this));
    });
    function init(el) {
      el.prev().on('click', decrement);
      el.next().on('click', increment);
      function decrement() {
        var value = el[0].value;
        value--;
        if(!min || value >= min) {
          el[0].value = value;
        }
      }
      function increment() {
        var value = el[0].value;
        value++;
        if(!max || value <= max) {
          el[0].value = value++;
        }
      }
    }
  };
})();
inputNumber($('.input-number'));

// jQuery UI - Tooltip on hover
$( ".promo-info-text, .delivery-est, .security-code-info" ).tooltip();

/*****************************************************************************/
/*
/* CHECKOUT-SHIPPING PAGE
/*
/*****************************************************************************/

// Adding active on click to checkout steps
(function($){
  $('.step-number').click(function(){
    $('.step-number-active').removeClass('step-number-active');
    $(this).addClass('step-number-active');
  });
}(jQuery));

// Slide toggle different shipping address on click
$( "#different-billing-checkbox" ).click(function() {
  $( "#different-billing-address" ).slideToggle( "slow" )
});
