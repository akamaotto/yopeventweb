// define our app and dependencies (remember to include firebase!)
// demoUtils creates a unique sandbox URL for us to play in!
var demoUtils = "https://yopi.firebaseio.com/";
var app = angular.module("yopi", ["firebase", "https://yopi.firebaseio.com/"]);

// this factory returns a synchronized array of chat messages
app.factory("chatMessages", ["$firebase", '$rootScope', 
  function($firebase, $rootScope) {
     // create a reference to the Firebase where we will store our data
     var ref = new Firebase($rootScope.demoUrl);
      
     // this uses AngularFire to create the synchronized array
     return $firebase(ref).$asArray();
  }
]);

app.controller("ChatCtrl", ["$scope", "chatMessages",
  // we pass our new factory, chatMessages, into the controller
  function($scope, chatMessages) {
    $scope.user = "Guest " + Math.round(Math.random()*101);
      
    // we add chatMessages array to the scope for our ng-repeat
    $scope.messages = chatMessages;
      
    // called by ng-submit a method to create new messages
    $scope.addMessage = function(message) {
      // calling $add on a synchronized array is like Array.push,
      // except that it saves the changes to Firebase!
      $scope.messages.$add({from: $scope.user, content: message});
      $scope.message = "";
    };
      
    // if the messages are empty, add something for fun!
    $scope.messages.$loaded(function(messages) {
        if( messages.length === 0 ) { 
            messages.$add({from: 'Firebase Docs', content: 'Hello world!'});
        }
    });
  }
]);

// this is just some demo fluff that creates a unique sandbox URL
// so we can play with Firebase and have fun!
app.run(function($rootScope, demoUtils) {
   $rootScope.demoUrl = demoUtils.getRandomDemoUrl('web/af/basics-chat');
});
