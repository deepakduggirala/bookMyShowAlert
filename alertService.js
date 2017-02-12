(function(query, interval) {
    'use strict';
    function check(callback){
        var movies = $('#now-showing > section.now-showing.filter-now-showing > div > div.__col-now-showing > div.mv-row > div > div > div > div.detail > div.__name.overflowEllipses > a')
                      .map(()=> $(this).text());
        if(movies.length === 0)
            callback();
        callback(Array.from(movies).filter((name)=>name.toLowerCase().indexOf(query.toLowerCase()) !== -1).length !== 0);
    }
	
	var repeat = setInterval(function(){
		check(function(found){
			if(typeof found === 'undefined'){
				customAlert('Error');
				stopRepeat();
			}
			else if(typeof found === 'boolean')
				customAlert(found);
				if(!found)
					location.reload();
		});
	}, 1000*interval);
	
	function stopRepeat(){
		clearInterval(repeat);
	}
	
	function customAlert(found){
		if(found)
			alert("Now available: "+query);
		else
			console.log('Not available yet');
	}
})('wick', 10);