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

    // Small menu bar on scroll
    var body = $("body");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 300) {
            body.addClass("small-header");
        } else {
            body.removeClass("small-header");
        }
    });
});

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
  $("#slider-range").slider({
    range: true,
    min: 0,
    max: 1000,
    values: [0, 300],
    slide: function(event, ui) {
      $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
    }
  });
  $("#amount").val("$" + $("#slider-range").slider("values", 0) +
    " - $" + $("#slider-range").slider("values", 1));
});

/*****************************************************************************/
/*
/* PDP PAGE
/*
/*****************************************************************************/

// Getting image from vertical thumbnail on click

$(document).ready(function() {
  $(".product-thumb").click(function(event) {
    event.preventDefault();
    $("div.product-frame").html($("<img>").attr("src", this.href).fadeIn(100));
  });
});

// Loading first child of vertical thumbnail on pageload

//There is a bug who prevent other script to work properly, please fix!
// $(document).ready(function() {
//   var href = $('#first-thumb').get(0).href;
//   $('div.product-frame').html($('<img>').attr('src', href).fadeIn(100));
// });

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
