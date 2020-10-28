var cookie = {
	create: function (name, value, days){
		try {
			localStorage.setItem(cookieprefix+name, value);
		}
		catch (e) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			}
			else
				var expires = "";
			document.cookie = cookieprefix+name + "=" + escape(value) + ";path=/" + expires;
		}
	},
	create_serialized: function (name, days){
		var s = '';
		for(var i=0;i<undoList.length;i++) {
			if(i) s += '~';
			s += undoList[i].mode + ','
			  + ((undoList[i].oldmode) ? undoList[i].oldmode : '0') + ','
			  + ((undoList[i].oldval) ? undoList[i].oldval : '0') + ','
			  + ((undoList[i].newval) ? undoList[i].newval : '0') + ','
			  + undoList[i].x + ','
			  + undoList[i].y;
		}
		this.create(name,s,days);
		//document.getElementById("debug").value = s;
	},
	read: function (name){
		try {
			var vvv=localStorage.getItem(cookieprefix+name);
			//alert(cookieprefix+name);
			return vvv;
		}
		catch (e) {
			var nameEQ = cookieprefix + name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ')
					c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0)
					return unescape(c.substring(nameEQ.length, c.length));
			}
		}
		return null;
	},
	read2: function (name){
		try {
			var vvv=localStorage.getItem(name);
			return vvv;
		}
		catch (e) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ')
					c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0)
					return unescape(c.substring(nameEQ.length, c.length));
			}
		}
		return null;
	},

	read_serialize: function (name){
		var elms,s = this.read(name);
		if(!s) return;
		//document.getElementById("debug").value = s;
		var sarr = s.split('~');
		for(var i=0;i<sarr.length;i++) {
			elms = sarr[i].split(',');
			undoList[i] = {
				mode: parseInt(elms[0]),
				oldmode: parseInt(elms[1]),
				oldval: (elms[2]=='0') ? null : elms[2],
				newval: (elms[3]=='0') ? null : elms[3],
				x: parseInt(elms[4]),
				y: parseInt(elms[5])
			};
		}
	},

	erase: function (name){
		try {
			localStorage.eraseItem(cookieprefix+name);
		}
		catch (e) {
			cookie.create(name, "", 0);
		}
	}
}

function clear_cookies() {

	cookie.erase("undoPtr");
	cookie.erase("undoStack");
	cookie.erase("curgrade");

	for (var j=1; j<5; j++) {
		cookie.erase("pdata"+j);
		cookie.erase('sud_time'+j);
		for (var i=0; i<9; i++) {
			cookie.erase("us"+j+i);
			cookie.erase("um"+j+i);
		}
	}
}
