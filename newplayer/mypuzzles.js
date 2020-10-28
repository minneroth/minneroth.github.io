

	var fullpath = 'https://www.str8ts.com/newplayer/';
	//var fullpath = '';
	var accid = 0;
	var language = 'de';

	var scripts = document.getElementsByTagName('script');
	var index = scripts.length - 1;
	var myScript = scripts[index];
	var queryString = myScript.src.replace(/^[^\?]+\??/,'');


	if(!document.getElementById('id1')) {
		var link = document.createElement('link');
		link.id = 'id1';
		link.rel = 'stylesheet';
		link.href = fullpath + 'puzzleapp_all.css';
		document.head.appendChild(link);
	}

	if(!document.getElementById('id2')) {
		var link = document.createElement('link');
		link.id = 'id2';
		link.rel = 'stylesheet';
		link.href = fullpath + 'puzzle_sizes.css';
		document.head.appendChild(link);
	}

	if(!document.getElementById('id3')) {
		var script = document.createElement('script');
		script.id = 'id3';
		script.src = fullpath + 'cookies.js?aa=1';
		document.head.appendChild(script);
	}
	if(!document.getElementById('id4')) {
		var script = document.createElement('script');
		script.id = 'id4';
		script.src = fullpath + 'timealert.js?bb=2';
		document.head.appendChild(script);
	}

	if( queryString.indexOf('=')!==-1 ) {
		asymparam = '';

		if( queryString.indexOf('&')===-1 ){
			params = queryString.split('=');
			accid = params[1];
		} else {
			paramsA = queryString.split('&');
			params = paramsA[0].split('=');
			accid = params[1];
			params2 = paramsA[1].split('=');
			if( params2[0]=='asym' && params2[1]=='1' ) asymparam = '&asym=1';
		}

		if( params[0] == "str8ts" )
		{
			if(!document.getElementById('id5')) {
				var script = document.createElement('script');
				script.id = 'id5';
				script.src = fullpath + 'str8ts.js';
				document.head.appendChild(script);
			}
		}
		if( params[0] == "sudoku" )
		{
			if(!document.getElementById('id5')) {
				var script = document.createElement('script');
				script.id = 'id5';
				script.src = fullpath + 'sudoku.js';
				document.head.appendChild(script);
			}
		}
	}
