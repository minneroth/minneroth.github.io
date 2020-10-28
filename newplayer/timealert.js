// http://slayeroffice.com/code/custom_alert/
//var ALERT_TITLE = "Sudoku";
//var ALERT_BUTTON_TEXT = "Ok";


var timetextGerman = {
	pausenotice : "Das Spiel wurde angehalten.<br>Mit OK geht\'s weiter."
};
var timetextEnglish = {
    pausenotice : "Game paused<br>Press OK to continue"
};
function SWUpdateTimer()
{
	if(timerID) {
	  clearTimeout(timerID);
	}

	if(!tStart)
	  tStart   = new Date();

	var hours, mins, secs;
	var   tDate = new Date();
	var   tDiff = tDate.getTime() - tStart.getTime();

	tDate.setTime(tDiff);

	hours = tDate.getUTCHours();
	if( hours >= 15 ) hours = 0;
	mins = tDate.getMinutes();
	secs = tDate.getSeconds();
	if( mins < 10 ) mins = '0' + mins
	if( secs < 10 ) secs = '0' + secs
	if( showTimer ) {
		if( hours > 0 )
			document.getElementById('theTimer').innerHTML = "" + hours + ":" + mins + ":" + secs;
		else
			document.getElementById('theTimer').innerHTML = "" + mins + ":" + secs;
	}
	timerID = setTimeout("SWUpdateTimer()", 1000);

	cookie.create('puz_time',tDiff,7);
}
function pause_game()
{
	tInt1 = new Date();
	clearTimeout(timerID);

	alert( (language=='de') ? timetextGerman.pausenotice : timetextEnglish.pausenotice ,'Ok',2);
}
function continue_game()
{
	if( !tStart ) return;
	tInt2 = new Date();

	tStart.setTime( tStart.getTime() + (tInt2.getTime()-tInt1.getTime()));

	timerID  = setTimeout("SWUpdateTimer()", 1000);
}
function SWStart()
{
	var tLapsed = cookie.read('puz_time');
	tStart   = new Date();
	if( tLapsed ) {
		var   tDate = new Date();
		var   tDiff = tDate.getTime() - tLapsed;
		tStart.setTime( tDiff );
	}
	if( showTimer ) document.getElementById('theTimer').innerHTML = "0:00:00";

	timerID  = setTimeout("SWUpdateTimer()", 1000);
}
function SWStop()
{
   if(timerID) {
      clearTimeout(timerID);
      timerID  = 0;
   }
   tStart = null;
}
function SWReset()
{
	tStart = null;

	if( showTimer ) document.getElementById('theTimer').innerHTML = "0:00:00";
}

/* Conflicts with jqery
Object.prototype.myaddOnClick = function(func){

	if( typeof this.ontouchstart  != "undefined" ){
		this.ontouchstart = func;
	} else{
		this.onclick = func;
	}
}*/

// over-ride the alert method only if this a newer browser.
// Older browser will see standard alerts

if(document.getElementById) {
	window.alert = function(txt,okyesno,action) {
		createCustomAlert(txt,okyesno,action);
	}
	window.myconfirm = function(txt,okyesno,action) {
		createCustomAlert(txt,okyesno,action);
	}
}

function createCustomAlert(txt,okyesno,action) {
	// shortcut reference to the document object
	var d = document;

//	if(action==1)
//		d.getElementById("btn_restart").className = "btnDown";

	if( okyesno != 'Ok' )
		document.getElementById('fade').style.display='block';

	// if the modalContainer object already exists in the DOM, bail out.
	if(d.getElementById("modalContainer"))
	{
		return;
	}
	// create the modalContainer div as a child of the BODY element
	mObj = d.getElementById("sp_mypuzzle").appendChild(d.createElement("div"));
	mObj.id = "modalContainer";
	 // make sure its as tall as it needs to be to overlay all the content on the page
	mObj.style.height = document.documentElement.scrollHeight + "px";

	// create the DIV that will be the alert
	alertObj = mObj.appendChild(d.createElement("div"));
	alertObj.id = "alertBox";
	// MSIE doesnt treat position:fixed correctly, so this compensates for positioning the alert
	if(d.all && !window.opera) alertObj.style.top = d.documentElement.scrollTop + "px";
	// center the alert box
	//alertObj.style.left = "145px";

	// create an H1 element as the title bar
//	h1 = alertObj.appendChild(d.createElement("h1"));
//	h1.appendChild(d.createTextNode(text.ALERT_TITLE));

	// create a paragraph element to contain the txt argument
	msg = alertObj.appendChild(d.createElement("p"));
	msg.innerHTML = txt;

	// create an anchor element to use as the confirmation button.
	btn = (IE)
		? alertObj.appendChild(d.createElement("image"))
		: alertObj.appendChild(d.createElement("input"));
	if( !IE ) btn.type = "image";
	if( okyesno == 'Ok' ) {
		btn.id = "closeBtn";
		btn.src = "https://www.str8ts.com/newplayer/overlay_btn_ok_unpressed.png";
		// set up the onclick event to remove the alert when the anchor is clicked
		btn.onclick = function() { removeCustomAlert(action);return false; }
	} else {
		btn.id = "noBtn";
		btn.src = "https://www.str8ts.com/newplayer/overlay_btn_cancel_unpressed.png";
		btn.onclick = function() { removeCustomAlert(0); return false; }

		btn2 = (IE)
			? alertObj.appendChild(d.createElement("image"))
			: alertObj.appendChild(d.createElement("input"));
		btn2.id = "yesBtn";
		if( !IE ) btn2.type = "image";
		btn2.src = "https://www.str8ts.com/newplayer/overlay_btn-continue_unpressed.png";
		// set up the onclick event to remove the alert when the anchor is clicked
		btn2.onclick = function() { removeCustomAlert(action); return false; }
	}
}

// removes the custom alert from the DOM
function removeCustomAlert(clearit) {
	var d = document;
	d.getElementById('fade').style.display='none';
	d.getElementById("sp_mypuzzle").removeChild(d.getElementById("modalContainer"));
	switch( clearit ) {
	case 1 : // Restart
		puzzle.clearboard();
		puzzle.clearState();
		d.getElementById("btn_restart").className = "btnNormal";
		SWStop();
	    cookie.erase('puz_time');
		SWStart();
		break;
	case 2 : // continue after pause
		continue_game();
		d.getElementById("btn_pause").className = "btnNormal";
		break;
	case 3 :
		//clear the cookies
		cookie.erase('puz_time');
		puzzle.clearState();
		puzzle.loadFromServer(newpuzzleready);
		newAvailable=false;
		puzzle.setNewState();
		window.scroll(0,1);
	}
}
