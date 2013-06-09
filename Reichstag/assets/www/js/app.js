// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

$(document).ready(function(){
	document.addEventListener("deviceready", function(){
		Reichstag.App.init();
	}, false);
});

Reichstag = {};

Reichstag.App = function(){
	
	var myLocation;
	
	var InitializeClickHandlers = function(){
		
		
		
		$('#map-load').click(function(){
			
			var mapOptions = {
	          center: new google.maps.LatLng(myLocation.coords.latitude, myLocation.coords.longitude),
	          zoom: 8,
	          mapTypeId: google.maps.MapTypeId.ROADMAP
	        };
	        
			var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions );

		});
	};
	
	var LoadTweets = function() {
		$.ajax({
			url:'http://search.twitter.com/search.json?q=%23reichstag&rpp=15&include_entities=true&with_twitter_user_id=true&result_type=mixed',
			type: 'GET',
	        dataType: 'jsonp',
	        success: function(data) {
	        	$.each( data.results, function(index, tweet) {
					AddTweet('<img src="'+ tweet.profile_image_url + '"/>' + tweet.text);
				});
			
			}
		});
	}
	
	var AddTweet = function(tweet) {
		$("#tweetlist").append("<li>" +  tweet + "</li>").listview('refresh');
	}
		
	var init = function() {
		$('#tweets').bind('pageinit', function(){
			LoadTweets();
		});
	};
	
	return {
		init:init
	};
	
	
}();