// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://in.bookmyshow.com/bengaluru/movies
// @grant        none
// @require http://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==

(function(query, interval) {
    'use strict';
    function check(callback){
        var movies = Array.from($('#now-showing > section.now-showing.filter-now-showing > div > div.__col-now-showing > div.mv-row > div > div > div > div.detail > div.__name.overflowEllipses > a')
        .map(function(){
            return $(this).text();
        }));
        if(movies.length === 0)
            callback({
				statusCode:500,
				msg : 'Error: No movies found'
			});
		else if(movies.filter((name)=>name.toLowerCase().indexOf(query.toLowerCase()) !== -1).length !== 0)
			callback({
				statusCode : 200,
				msg : query + ' found'
			});
		else
			callback({
				statusCode : 404,
				msg : query + ' not found'
			});
    }
	function notify(message){
		// Let's check whether notification permissions have already been granted
		console.log(message);
		if (Notification.permission === "granted") {
			// If it's okay let's create a notification
			var notification = new Notification(message);
		}
	}
	(function setUpNotify() {
		// Let's check if the browser supports notifications
	    if (!("Notification" in window)) {
			console.log("This browser does not support desktop notification");
	    }
		// Otherwise, we need to ask the user for permission
		else if (Notification.permission !== 'denied') {
			Notification.requestPermission();
		}
	})();
	(function checkRunner(){
        check(function(res){
            if(res.statusCode === 404)
				setTimeout(function(){
					location.reload();
				}, 1000*interval);
			else
				notify(res.msg);
        });
    })();
})('wick', 10*60);