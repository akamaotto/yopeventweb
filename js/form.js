
  function submit(){
      var title = document.getElementById('title');
      var spot = document.getElementById('spot');
      var date = document.getElementById('datetimepicker');
      var duration = document.getElementById('duration');
      var description = document.getElementById('description');
      console.log(title.value);
      console.log(spot.value);
      console.log(date.value);
      console.log(duration.value);
      console.log(description.value);
  var eventsRef = {
      Title: "",
      Spot: "",
      TvShow: "",
      Duree: "",
      DateOfTheEvent: "",
      Description: ""
    };
    eventsRef.Title = title;
    eventsRef.Spot = spot;
    eventsRef.TvShow = "TF6";
    eventsRef.Duree = duration;
    eventsRef.DateOfTheEvent = date;
    eventsRef.Description = description;
  var ref = new Firebase('https://yopi.firebaseio.com/events');
  var eventsRef = ref.child('event list');
      eventsRef.push({
      Title: "hoeroty",
      Spot: "klerty",
      TvShow: "Action +",
      Duree: "pyktp",
      DateOfTheEvent: "fhhhhh",
      Description: "fkfy"
    });
  }

  


