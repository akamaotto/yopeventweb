var app = angular.module("yopi", ["firebase"]);

app.controller("EventCtrl", function($scope, $firebase) {
  var ref = new Firebase("https://yopi.firebaseio.com/events/event list").limitToLast(12);
  var sync = $firebase(ref);
  $scope.events = sync.$asArray();
  
  //console.log($scope.events.Title);
  
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

