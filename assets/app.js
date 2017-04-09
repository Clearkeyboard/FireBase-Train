var config = {
    apiKey: "AIzaSyCibgxUxSKYRn7u3IbUs1y-DH_SlWkk6z0",
    authDomain: "savedforms.firebaseapp.com",
    databaseURL: "https://savedforms.firebaseio.com",
    storageBucket: "savedforms.appspot.com",
    messagingSenderId: "175238082149"
  };
firebase.initializeApp(config);
var database = firebase.database();

$('#addbtn').on("click", function(event){
        event.preventDefault();
        var name = $('#name').val().trim();
        var dest = $('#dest').val().trim();
        var start = $('#firsttrain').val().trim();
        var freq = $('#freq').val().trim();
        database.ref().push({
        Name: name,
        Destination: dest,
        Start: start,
        Frequency: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });   
      });

database.ref().on('child_added', function(childSnapshot){

		var trainMoment= moment(childSnapshot.val().Start, "hh:mm").subtract(1, "years");
		var diffTime = moment().diff(moment(trainMoment), "minutes");
		var remainder = diffTime % childSnapshot.val().Frequency;
		var minUntilTrain = childSnapshot.val().Frequency - remainder;
		var nextTrain = moment().add(minUntilTrain, "minutes");
$('#tablebody').append('<tr><td>' + childSnapshot.val().Name + '</td><td>' + childSnapshot.val().Destination + '</td><td>' + childSnapshot.val().Frequency + '</td><td>' + moment(nextTrain).format("hh:mm A") +'</td><td id="minupdate">'+minUntilTrain+'</td>');
});