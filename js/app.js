var app = angular.module("yopi", ["firebase"]);
app.controller("EventCtrl", function($scope, $firebase, $window) {
  var ref = new Firebase("https://yopi.firebaseio.com/");

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
    },{scope: 'email,user_photos,user_videos'});

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

      //$('#myModal').modal('show');
      ref.child("users").child($scope.Id).set({
        UserId: $scope.Id,
        UserName: $scope.Name,
        UserEmail: $scope.Email,
        UserPicUrl: $scope.PicUrl
      });

      /*var str="<br/><b>Pic</b> : <img src='"+response.data.url+"'/>";*/
      /*document.getElementById("UserId").innerHTML+= UserId;
      document.getElementById("UserName").innerHTML+= UserName;
      document.getElementById("UserEmail").innerHTML+= UserEmail;
      document.getElementById("UserPicUrl").innerHTML+= response.data.url;;*/
      
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

//function to handle the sign up form
$scope.SignUp = function(){
  if ($scope.user.email) {
    $scope.users.$add($scope.user).catch(alert);
    $('#myModal').modal('toggle');
  }
};




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

