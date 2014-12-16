var app = angular.module("yopi", ['firebase']);
app.controller("EventCtrl", function($scope, $firebase, $window) {
  var ref = new Firebase("https://yopevent.firebaseio.com/");

  // facebook init
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '293300270859411', // Set YOUR APP I
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    FB.Event.subscribe('auth.authResponseChange', function(response) 
    {
     if (response.status === 'connected') 
     {
      document.getElementById("message").innerHTML +=  "<br>Connected to Facebook";
        //SUCCESS

      }    
      else if (response.status === 'not_authorized') 
      {
        document.getElementById("message").innerHTML +=  "<br>Failed to Connect";

        //FAILED
      } else
      {
        document.getElementById("message").innerHTML +=  "<br>Logged Out";

        //UNKNOWN ERROR
      }
    }); 

  };

  $scope.Login = function()
  {

    FB.login(function(response) {
     if (response.authResponse) 
     {
      getUserInfo();
      getPhoto();
      //$window.location.href = "https://yopevent.firebaseapp.com/events.html";
    } else 
    {
      console.log('User cancelled login or did not fully authorize.');
    }
  },{scope: 'email, user_photos'});

  }

  function getUserInfo() {
    FB.api('/me', function(response) {
      UserId = response.id;
      UserName = response.name;
      UserEmail = response.email;
    });
  }

  function getPhoto()
  {
    FB.api('/me/picture?type=normal', function(response) {

      $scope.Id = UserId;
      $scope.Name = UserName;
      $scope.Email = UserEmail;
      $scope.PicUrl = response.data.url;



      ref.child("users").child($scope.Id).once('value', function(snapshot) {
        exists = (snapshot.val() !== null);
        /*userExistsCallback(userId, exists);*/
        //$scope.user = snapshot.val();
      });
      if (exists) {
        alert("User exists"); 
        /*var name = UserName;
        //var picture = "<img width='"30"' height='"30"' class='"img-responsive img-circle"' src='"+ $scope.PicUrl +"'>";
        document.getElementById("name").innerHTML = name;*/
        //document.getElementById("picture").innerHTML = picture;
      }else{
        ref.child("users").child($scope.Id).set({
          Id: $scope.Id,
          Name: $scope.Name,
          //Email: $scope.Email,
          PicUrl: $scope.PicUrl
        });
      }
    });

  }

    /*$scope.Logout = function()
    {
        FB.logout(function(){document.location.reload();});
      }*/

  // Load the SDK asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
 }(document));





var sync = $firebase(ref);
$scope.events = sync.$asArray();
  
  

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

