// =============================================================
// Daily Str8ts from Andrew Stuart
//
// Copyright Syndicated Puzzles 2008-2010
//
// This script is for distribution to any web site participating
// in the Andrew Stuart Daily Str8ts Subscription
//
// Version 2.04 14-Jun-2010
// =============================================================

var g 		= [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
var jc 		= [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
var sol 	= [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
var clues	= [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
var mask	= [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
var last_back_col = '';
var last_name = '';
var timerID = 0;
var tStart  = null;
var oneMinute = 60 * 1000  // milliseconds in a minute
var oneHour = oneMinute * 60
var oneDay = oneHour * 24
var monnames = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
var easymode = false;
var backstackcur = 0;
var stackx = new Array(50);
var stacky = new Array(50);
var stackg = new Array(50);


function bit2int( m )
{
	switch( m ) {
	case 1   : return 0;
	case 2   : return 1;
	case 4   : return 2;
	case 8   : return 3;
	case 16  : return 4;
	case 32  : return 5;
	case 64  : return 6;
	case 128 : return 7;
	case 256 : return 8;
	}
	return 0;
}
function bit_count( b )
{
    var n = 0;
	if ( !b ) return 0;
    do { ++n; } while ( b &= (b-1) );
    return  n;
}
function vs_valid_number(item)
{
	var okay = true;
//	item.value = item.value.Trim();
	var num = "0123456789";
	for (var intLoop = 0; intLoop < item.value.length; intLoop++) {
	    if (num.indexOf(item.value.charAt(intLoop)) == -1) okay = false;
	}
	if( !okay ) item.value = '';
	return okay;
}
function set_print_square( x, y, val )
{
	if( jc[y][x]==0 ) // White background
	{
		if( val == ' ' || val == '0' || val == 0 )
		{
			document.getElementById('C' + x + y).innerHTML = '&nbsp;';
			document.getElementById('C' + x + y).className = (clues[y][x]==true)?'InnerTClues':'InnerTDone';
		}
		else
		{
			document.getElementById('C' + x + y).innerHTML = val;
			document.getElementById('C' + x + y).className = (clues[y][x]==true)?'InnerTClues':'InnerTDone';
		}
	}
	else
	{
		if( val == ' ' || val == '0' || val == 0 )
			 document.getElementById('C' + x + y).innerHTML = '&nbsp;';
		else document.getElementById('C' + x + y).innerHTML = val;
		document.getElementById('C' + x + y).className = 'InnerBDone';
	}
}

function set_square(x,y,val)
{
	if( jc[y][x]=='0' ) // White background
	{
		if( val == ' ' || val == '0' || val == 0 )
		{
			document.getElementById('A' + x + y).value = '';
			document.getElementById('A' + x + y).className = (clues[y][x]==true)?'SQWC':'SQW';
		}
		else
		{
			document.getElementById('A' + x + y).value = val;
			document.getElementById('A' + x + y).className = (clues[y][x]==true)?'SQWC':'SQW';
		}
		document.getElementById('A' + x + y).readOnly = false;
		document.getElementById('C' + x + y).className = 'CellT';
	}
	else
	{
		if( val == ' ' || val == '0' )
		{
			document.getElementById('A' + x + y).value = '';
			document.getElementById('A' + x + y).className = 'SQB';
		}
		else
		{
			document.getElementById('A' + x + y).value = val;
			document.getElementById('A' + x + y).className = 'SQB';
		}
		document.getElementById('A' + x + y).readOnly = true;
		document.getElementById('C' + x + y).className = 'CellB';
	}
}
function load_board(print_version)
{
	var i, j, c;
	var archive_date = location.search;
	var mySudoku, todayStr, todayTitle;
	var asymstr = '';
	var cmLevelLet, cmPuzzle, cmColourMap, cmSolution, puznum;

	var d = new Date();
	easymode = false;
	if( doasym ) asymstr = "&asym=1";
    

/*	var today = new Date();
	var yesterday = new Date();

	var ayear = today.getYear();
	if( ayear < 1900 ) ayear += 1900;

	if( archive_date.length == 0 )
	{
		todayTitle = today.getDate() + '/' + (today.getMonth()+1) + '/' + ayear;
		todayStr = '&m=' + (today.getMonth()+1)  + '&d=' + today.getDate() + '&y=' + ayear;
	}
	else
		todayStr = archive_date.substring(4,archive_date.length); */

/*
	todayStr = "?d=0";
	if( location.search.substring(0,3)=="?d=" )
	{
		todayStr = location.search;
		sp = location.search.split("=");
		d = new Date();
		d.setDate(d.getDate() - (sp[1]*1));
	}
	todayTitle = d.getDate() + '. ' + (monnames[d.getMonth()]) + ' ' + (d.getYear()<1000 ? (d.getYear()+1900) : d.getYear());

	if(window.ActiveXObject)
	{
		var xmlDoc = new ActiveXObject("Msxml2.XMLHTTP");
		xmlDoc.open("GET","https://www.str8ts.com/feed/fetchStr8tsDAILY.asp" + todayStr + "&accid=7819" + asymstr, false);
		xmlDoc.send();
		mySudoku = xmlDoc.responseXML.xml;
		console.log(10);
		mySudoku = mySudoku.substring(24,mySudoku.length-2);
		if( mySudoku.length > 246 ) {
			puznum = mySudoku.substring(244,mySudoku.length-2);
		}
	}
	else if(document.implementation && document.implementation.createDocument)
	{
		xmlDoc = new XMLHttpRequest();
		xmlDoc.open("GET", "https://www.str8ts.com/feed/fetchStr8tsDAILYtxt.asp" + todayStr + "&accid=7819" + asymstr, false);
		xmlDoc.send(null);
		mySudoku = xmlDoc.responseText;
		if( mySudoku.length > 246 ) {
			puznum = mySudoku.substring(244,mySudoku.length);
		}
	}
	if( mySudoku.indexOf('rror') > 0 )
	{
		alert(mySudoku.substring(6,mySudoku.length-8));
		return;
	} */
//	if( document.getElementById("playertitle") )
//		document.getElementById("playertitle").innerHTML = 'Das tägliche Str8ts, #' + puznum + ", <font size=2>" + todayTitle + "</font>";

	cmLevelLet = document.getElementById('cmLevelLet').value;
	cmPuzzle = document.getElementById('cmPuzzle').value;  //this returns the puzzle code
	cmColourMap = document.getElementById('cmColourMap').value; //this returns thee blackwhite pattern
	cmSolution = document.getElementById('cmSolution').value;  //this returns the solution
	puznum = document.getElementById('puznum').value;

	//document.location.replace('ASStr8tsv2.asp?d='+p) with p from 0 to 30 will load another puzzle

	if( print_version )
		document.getElementById("ptitle").innerHTML = "<font size=5>Das Tägliche Str8ts #" + puznum + ", " + todayTitle + "</font>";


	if( !print_version )
		for(i=1;i<=4;i++)
			document.getElementById("star" + i).src = 'star.gif';
		switch( cmLevelLet ) {
		case 'g' :
			for(i=2;i<=4;i++)
				document.getElementById("star" + i).src = 'starfade.gif'; break;
		case 'm' :
			for(i=3;i<=4;i++)
				document.getElementById("star" + i).src = 'starfade.gif'; break;
		case 't' :
			for(i=4;i<=4;i++)
				document.getElementById("star" + i).src = 'starfade.gif'; break;
		case 'd' :
		}

	stage = 0;

	for(j=0;j<9;j++)
		for(i=0;i<9;i++)
		{
			var c = i*9+j;
			if( cmPuzzle.charAt(c)=='.' )
				g[j][i] = 0;
			else
				g[j][i] = cmPuzzle.charAt(c)*1;
			sol[j][i] = cmSolution.charAt(c)*1;
			jc[j][i] = cmColourMap.charAt(c)*1;
			if( print_version )
				set_print_square(i,j,g[j][i]);
			else
			{
				if( g[j][i] > 0 )
				{
					clues[j][i] = 1;
					set_square(i,j,g[j][i]);
					document.getElementById('A' + i + j).readOnly = true;
				}
				else
				{
					clues[j][i] = 0;
					set_square(i,j,' ');
					document.getElementById('A' + i + j).readOnly = (jc[j][i]=='1');
				}
			}
		}

	if( !print_version ) SWStart();
	backstackcur = 0;
	okdebug = true;
}
function load_easy(print_version)
{
	var i, j, c;
	var archive_date = location.search;
	var mySudoku, todayStr, todayTitle;

	easymode = true;

	if( print_version )
		document.getElementById("ptitle").innerHTML = "<font size=5>Heute: leichtes Str8ts</font>";

	if(window.ActiveXObject)
	{
		var xmlDoc = new ActiveXObject("Msxml2.XMLHTTP");
		xmlDoc.open("GET","https://www.str8ts.com/feed/fetchStr8tsEASY.asp?accid=7819", false);
		xmlDoc.send();
		mySudoku = xmlDoc.responseXML.xml;
		mySudoku = mySudoku.substring(24,mySudoku.length-2);
	}
	else if(document.implementation && document.implementation.createDocument)
	{
		xmlDoc = new XMLHttpRequest();
		xmlDoc.open("GET", "https://www.str8ts.com/feed/fetchStr8tsEASYtxt.asp?accid=7819", false);
		xmlDoc.send(null);
		mySudoku = xmlDoc.responseText;
	}
	if( mySudoku.indexOf('rror') > 0 )
	{
		alert(mySudoku.substring(6,mySudoku.length-8));
		return;
	}

	if( !print_version )
		switch( mySudoku.charAt(0) ) {
		case 'g' :
			for(i=2;i<=4;i++)
				document.getElementById("star" + i).src = 'starfade.gif'; break;
		case 'm' :
			for(i=3;i<=4;i++)
				document.getElementById("star" + i).src = 'starfade.gif'; break;
		case 't' :
			for(i=4;i<=4;i++)
				document.getElementById("star" + i).src = 'starfade.gif'; break;
		case 'd' :
		}

	stage = 0;

	for(j=0;j<9;j++)
		for(i=0;i<9;i++)
		{
			var c = i*9+j+1;
			if( mySudoku.charAt(c)=='.' )
				g[j][i] = 0;
			else
				g[j][i] = mySudoku.charAt(c)*1;
			sol[j][i] = mySudoku.charAt(c+81)*1;
			jc[j][i] = mySudoku.charAt(c+162)*1;
			if( print_version )
				set_print_square(i,j,g[j][i]);
			else
			{
				if( g[j][i] > 0 )
				{
					clues[j][i] = 1;
					set_square(i,j,g[j][i]);
					document.getElementById('A' + i + j).readOnly = true;
				}
				else
				{
					clues[j][i] = 0;
					set_square(i,j,' ');
					document.getElementById('A' + i + j).readOnly = (jc[j][i]=='1');
				}
			}
		}

	if( !print_version ) SWStart();
	backstackcur = 0;
	okdebug = true;
}

function convert_str2mask( astr )
{
	var n = 0;
	for(var i=0;i<astr.length;i++)
		n |= (1 << (parseInt(astr.charAt(i))-1));
	return n;3
}
function convert_mask2str( val )
{
	var s= '';
	for(i=1;i<=9;i++)
		if( val & (1 << i-1) )
			s = s + i;
	return s;
}
function Sudoku1( afield )
{
	var x,y,i,j,v,done,correct;
	x = afield.id.charAt(1);
	y = afield.id.charAt(2);
	if( afield.value=="" ) {
		if( g[y][x]>0 )
			push_stack( x,y,1 <<(g[y][x]-1) );
		else
			push_stack( x,y,mask[y][x] );
	}
	else if( vs_valid_number(afield) )
	{
		if( g[y][x]>0 )
			push_stack( x,y,1 <<(g[y][x]-1) );
		else
			push_stack( x,y,mask[y][x] );
		x = afield.id.charAt(1);
		y = afield.id.charAt(2);
		if( afield.value == 0 )
		{
			afield.value = '';
			g[y][x] = 0;
			mask[y][x] = 0;
			set_square( x,y, g[y][x] );
		}
		if( afield.value.length > 1 )
		{
			v = convert_str2mask( afield.value );
			if( bit_count(v) == 1 )
			{
				g[y][x] = bit2int(v)+1;
				mask[y][x] = 0;
				set_square( x,y, g[y][x] );
			}
			else
			{

				mask[y][x] = v;
				g[y][x] = 0;
				afield.value = convert_mask2str( v );
				afield.className = (afield.className == 'SQ1' || afield.className == 'SQ2') ? "notes2" : "notes1";
			}
		}
		else
		{
			mask[y][x] = 0;
			g[y][x] = afield.value;
			set_square( x,y, g[y][x] );
		}

		correct = done = 0;
		for(i=0;i<9;i++)
			for(j=0;j<9;j++)
			{
				if( g[j][i] > 0 || jc[j][i]==1 ) done++;
				if( g[j][i] == sol[j][i] || jc[j][i]==1 ) correct++;
			}
		if( correct == 81 )
		{
			SWStop();
			alert('Herzlichen Glückwunsch, Sie haben das Str8ts Rätsel gelöst!');
		}
		else if( done == 81 && correct == 80 )
			alert('Ups! 1 Feld ist falsch.' );
		else if( done == 81 )
			alert('Ups! ' + (done-correct) + ' Felder sind falsch.' );
	}
}
function focyell( afield )
{
	if( last_name.length > 0 )
		document.getElementById(last_name).style.backgroundColor = last_back_col;
	last_name = '';

	if( afield.readOnly == false )
	{
		last_name = afield.id;
		last_back_col = afield.style.backgroundColor;
		afield.style.backgroundColor = '#ffff00';
	}
}
function color_same(x,y)
{
	var t, i, j, nt;
	var inputbox;

	inputbox = '<input type="number" value="" size=2 maxlength=2 name="ibox" id="ibox" onchange="javascript:Sudoku1(';
	inputbox = inputbox + "'" + 'A' +  x + y + "'" + ',this.value);">';

	document.getElementById('A'+x+y).innerHTML = inputbox;

}
function print_todays_board()
{
	var x,y,done=0;
//	var board = 'ad="bd=';
//	for(y=0;y<9;y++)
//		for(x=0;x<9;x++)
//			board = board + g[y][x];
	if( easymode ) {
		SGW = window.open('Str8tsPrintableEasy.htm' + location.search,'_blank','resizable=yes,menubar=1,toolbar=1,scrollbars=yes,left=100,top=10,screenX=100,screenY=10,width=660,height=690');
	}
	else {
		var dstr = location.search;
		if( dstr.length == 0 ) dstr = "?d=0";
		if( dstr.charAt(0)!='?' && dstr.charAt(1)!='d' ) dstr = "?d=0";
		SGW = window.open('https://www.str8ts.com/Print_Daily_Str8ts_DE.asp' + dstr + '&a=7819','_blank','resizable=yes,menubar=1,toolbar=1,scrollbars=yes,left=100,top=10,screenX=100,screenY=10,width=660,height=690');
	}
	if (!SGW.opener) SGW.opener = self;
}
function print_board(archive_date)
{
	var x,y,done=0;
//	var board = 'ad="bd=';
//	for(y=0;y<9;y++)
//		for(x=0;x<9;x++)
//			board = board + g[y][x];

	SGW = window.open('Str8tsPrintable.htm?ad=' + archive_date,'_blank','resizable=yes,toolbar=1,scrollbars=yes,left=100,top=10,screenX=100,screenY=10,width=660,height=690');
	if (!SGW.opener) SGW.opener = self;
}
function show_help()
{
	SGW = window.open('https://www.str8ts.com/Str8ts_Strategies','_help','resizable=yes,toolbar=1,scrollbars=yes,left=100,top=10,screenX=100,screenY=10');
	if (!SGW.opener) SGW.opener = self;
}
function create_solver_url()
{
	var x,y,done=0;
	var solverurl = 'https://www.str8ts.com/str8ts.htm?bd=';
	for(y=0;y<9;y++) for(x=0;x<9;x++) solverurl = solverurl + g[x][y];
	for(y=0;y<9;y++) for(x=0;x<9;x++) solverurl = solverurl + jc[x][y];

	SGW = window.open(solverurl);
	if (!SGW.opener) SGW.opener = self;
}

function print_yesterdays_solution(easy)
{
	var yesterday = new Date();
	var yesterdayStr, yesterdayDate;
	var today = new Date();
	var asymstr = '';

	if( doasym ) asymstr = "&asym=1";

	yesterdayDate = today.getDate() -1 ;
	yesterday.setDate( yesterdayDate );

	if( yesterday.getYear() < 200 )
		yesterdayStr = yesterday.getDate()  + '/' + (1+yesterday.getMonth()) + '/' + (1900 + yesterday.getYear());
	else yesterdayStr = yesterday.getDate()  + '/' + (1+yesterday.getMonth()) + '/' + yesterday.getYear();

	SGW = window.open('/Print_Daily_Str8ts_DE.asp?a=7819&easy=' + easy + '&solution=please&day=' + yesterdayStr + asymstr,'_blank','resizable=yes,toolbar=1,scrollbars=yes,left=100,top=10,screenX=100,screenY=10,width=660,height=690');

	if (!SGW.opener) SGW.opener = self;
}
function print_solution(archive_date)
{
	SGW = window.open('ASSolution.htm?ad=' + archive_date,'_blank','resizable=yes,toolbar=1,scrollbars=yes,left=100,top=10,screenX=100,screenY=10,width=660,height=690');
	if (!SGW.opener) SGW.opener = self;
}
function email_board()
{
	var x,y,done=0;
	var board = 'bd=';
	for(y=0;y<9;y++)
		for(x=0;x<9;x++)
		{
			if( g[y][x]>0 ) done++;
			board = board + g[y][x];
		}
	if( !done )
		alert("This board is empty!");
	else
	{
		SGW = window.open('Str8tsEmail.htm?' + board,'_blank','resizable=no,scrollbars=no,left=300,top=200,screenX=300,screenY=200,width=500,height=250');
    	if (!SGW.opener) SGW.opener = self;
	}
}
function SWUpdateTimer()
{
	if(timerID) {
	  clearTimeout(timerID);
	  clockID  = 0;
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
	document.getElementById('theTimer').value = "" + hours + ":" + mins + ":" + secs;

	timerID = setTimeout("SWUpdateTimer()", 1000);
}
function pause_game()
{
	tInt1 = new Date();

	clearTimeout(timerID);

	alert("Spiel unterbrochen. Klicken zum Fortfahren");

	tInt2 = new Date();

	tStart.setTime( tStart.getTime() + (tInt2.getTime()-tInt1.getTime()));

	timerID  = setTimeout("SWUpdateTimer()", 1000);
}
function SWStart()
{
	tStart   = new Date();

	document.getElementById('theTimer').value = "0:00:00";

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

	document.getElementById('theTimer').value = "0:00:00";
}
function openAWindow( pageToLoad, winName, width, height, center)
{
	xposition=0; yposition=0;
	if ((parseInt(navigator.appVersion) >= 4 ) && (center)){
		xposition = (screen.width - width) / 2;
		yposition = (screen.height - height) / 2;
	}
	args = "width=" + width + ","
	+ "height=" + height + ","
	+ "location=0,"
	+ "menubar=0,"
	+ "resizable=1,"
	+ "scrollbars=1,"
	+ "status=0,"
	+ "titlebar=1,"
	+ "toolbar=1,"
	+ "hotkeys=0,"
	+ "screenx=" + xposition + ","  //NN Only
	+ "screeny=" + yposition + ","  //NN Only
	+ "left=" + xposition + ","     //IE Only
	+ "top=" + yposition;           //IE Only
	window.open( pageToLoad,winName,args );
}
function push_stack( x, y, v )
{
	if( backstackcur < 49 )
	{
		stackx[backstackcur] = x;
		stacky[backstackcur] = y;
		stackg[backstackcur] = v;
		backstackcur++;
	}
	else
	{
		stackx.shift();
		stacky.shift();
		stackg.shift();
		stackx[backstackcur] = x;
		stacky[backstackcur] = y;
		stackg[backstackcur] = v;
	}
}
function back_step()
{
	var x,y,v,f;
	if( backstackcur == 0 ) return;

	backstackcur--;
	x = stackx[backstackcur];
	y = stacky[backstackcur];
	v = stackg[backstackcur];
	if( bit_count(v)==1 ) {
		mask[y][x] = 0;
		g[y][x] = bit2int(v)+1;
		set_square( x,y,g[y][x] );
	}
	else {
		f = document.getElementById('A' + x + y);
		f.value = convert_mask2str( v );
		f.className = (f.className == 'SQ1' || f.className == 'SQ2') ? "notes2" : "notes1";
		mask[y][x] = v;
		g[y][x] = 0;
	}
}
