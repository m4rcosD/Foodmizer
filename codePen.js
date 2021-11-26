$(document).ready(function () {
    $("#sign-up").click(function () {
      $("#sign-in").removeClass("active");
      $("#sign-in-form").hide();
      $("#sign-up").addClass("active");
      $("#sign-up-form").show();
    });
    $("#sign-in").click(function () {
      $("#sign-in").addClass("active");
      $("#sign-in-form").show();
      $("#sign-up").removeClass("active");
      $("#sign-up-form").hide();
    });
  });
  $("body").removeClass("nojs").addClass("js");
//dropdown
$("div.menu > span").click(function(e) {
  var container = $(this).parent();
  // var container = $(this).closest('div.menu'); // alternative

  if (container.hasClass('clicked')) {
    // Dropdown already open so close it
    container.removeClass('clicked');
  }
  else {
    // Hide all open dropdowns so only one is open at a time
    $("div.menu.clicked").removeClass("clicked");
    // Open this dropdown
    container.addClass("clicked");
   }
   
   e.stopPropagation(); // prevent the $('html').click fires..
});

$('html').click(function(e){
  // this is not pretty...
  // check if we are clicking inside an open select
 if ($(e.target).closest('div.menu.clicked').length == 0) {
   
   
    // Close open dropdowns when clicking elsewhere
    $('div.menu.clicked').removeClass('clicked');
  }
});