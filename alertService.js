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
	var checkRunner = function(){
        check(function(found){
            console.log(found);
            if(typeof found === 'undefined'){
                customAlert('Error');
                stopRepeat();
            }
            else if(typeof found === 'boolean'){
                customAlert(found);
                if(!found)
                    location.reload();
            }
        });
    };
	
    function check(callback){
        var movies = Array.from($('#now-showing > section.now-showing.filter-now-showing > div > div.__col-now-showing > div.mv-row > div > div > div > div.detail > div.__name.overflowEllipses > a')
        .map(function(){
            return $(this).text();
        }));
        if(movies.length === 0)
            callback();
        callback(movies.filter((name)=>name.toLowerCase().indexOf(query.toLowerCase()) !== -1).length !== 0);
    }

    var repeat = setInterval(checkRunner, 1000*interval);

    function stopRepeat(){
        clearInterval(repeat);
    }

    function customAlert(found){
        if(found){
            alert("Now available: "+query);
            stopRepeat();
        }
        else
            console.log('Not available yet');
    }
	
	checkRunner();
})('wick', 10*60);