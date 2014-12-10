var app = angular.module("yopi", ["firebase"]);

app.controller("EventCtrl", function($scope, $firebase, $window) {
  var ref = new Firebase("https://yopevent.firebaseio.com/").limitToLast(12);
  var sync = $firebase(ref);
  $scope.events = sync.$asArray();
  
  //console.log($scope.events.Title);
  $scope.login = function(){
    ref.authWithOAuthPopup("facebook", function(error, authData) { ... }, {
      remember: "sessionOnly",
      scope: "email,user_likes"
    });
    $window.location.href = "https://yopevent.firebaseio.com/events.html";
  };
  ref.on('child_added', function(snap) {
      console.log("added", snap.key());
    });

  $scope.form ={};
  $scope.addEvent = function() {
    if( $scope.form.Title ) {
    // push a message to the end of the array
    $scope.events.$add($scope.form)
    // display any errors
    .catch(alert);
    //here i am trying to get the key of the array added
    
    //Reset your form
    $scope.form = {};
    $('#modal').modal('toggle');
  }
  }
});

