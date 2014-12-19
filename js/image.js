var $overlay = $("<div id='overlay'></div>");
var $image = $("<img>");
var $loader =$("<div class='loader'><span class='loadDot'></span><span class='loadDot'></span><span class='loadDot'></span></div>'");

$overlay.append($image);
$("body").append($overlay);

$(".preview").hover(function() {
  $(this).find($(".controls")).show();
}, function() {
  $(this).find($(".controls")).hide();
})

$(".view").click(function(event) {
  event.preventDefault();
  var imageURL = $(".withImage").css("background");
  imageURL = imageURL.replace("rgba(0, 0, 0, 0) url(","").replace(") no-repeat scroll 50% 50% / cover padding-box border-box","");
  $image.attr("src", imageURL);
  $overlay.show();
})

$overlay.click(function() {
  $overlay.hide();
})

$(".upload").click(function(event) {
  event.preventDefault();
  $(this).parent().parent().parent().prepend($loader);
  setTimeout(function() {
    $(".loader").detach();
  }, 1500);  
})