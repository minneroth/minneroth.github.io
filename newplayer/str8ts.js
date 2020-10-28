/**
 * @author Mike
 * (c) 2010, Master Toolworks, LLC
 * @author Andrew Stuart
 * (c) 2010, Syndicated Puzzles Inc.
 *
 * Modified 14-Apr-2014 for Das Spiegel
 */
var puzzle;
var IE = document.all?true:false;
var timerID = 0;
var tStart  = null;
var tInt1, tInt2;
var newpuzzleready;
var undoList = [];		//undo stack
var showTimer=true;
var newAvailable=false;
var servercallOK=false;
var showcomphigh=false;
var cookieprefix = 'spgst8_';
var bwidth = "4px solid #555555";
//var accid = 2244;

//***************************************************************************************/
/* USE this for the user to pick up the new puzzles from the "NEW" button directly from the server  */
var dataurl = "https://www.str8ts.com/feed/fetchStr8tsDAILYJSon.asp?accid=" + accid + asymparam;
/*****
  OR, place the contents of that feed request into a local file in this app folder, and call
 *****/
//var dataurl = "fetchStr8tsDAILYJSon.asp";
/****************************************************************************************/

var textGerman = {
    restart: "L&ouml;schen",
    new: "Neu",
    undo: "Zur&uuml;ck",
    redo: "Vor",
    notes: "Notizen",
    check: "Pr&uuml;fen",
    closewin: "Schlie&szlig;en",
    help: "Hilfe",
    pause: "Pause",
    printversion : "Druckversion",
    yestsol : "Auflösung<br>von gestern",
    congratulations: "Herzlichen Glückwunsch! Sie haben das Str8ts-Rätsel gelöst!",
    http_request_error: "Fehler bei der Serveranfrage.",
    check_cellsC1: "<font color=\"#6666ff\"><b>1</b></font> Feld ist korrekt ausgefüllt.<br />",
    check_cellsC2: "<font color=\"#6666ff\"><b>%1%</b></font> Felder sind korrekt ausgefüllt.<br />",
    check_cellsW1: "<font color=\"red\"><b>1</b></font> Feld ist falsch.<br />",
    check_cellsW2: "<font color=\"red\"><b>%1%</b></font> Felder sind falsch.<br />",
    check_cellsB1: "<b>1</b> Feld ist leer.<br />",
    check_cellsB2: "<b>%1%</b> Felder sind leer.<br />",
    puzzlenum: "Das tägliche Str8ts #",
    restartconfirm: "Wollen Sie das Spielfeld wirklich leeren?",
    gradetext: ["", "leicht", "mittel", "schwer", "teuflisch","extreme"],
    highsamenum : "Straßen hervorheben",
    reallyload : "Soll das heutige Rätsel geladen werden?<br />Die alten Rätsel werden gelöscht.",
    nointernet : "Ein Laden der Rätsel ist nicht möglich, da keine Internetverbindung aufgebaut werden kann.",
    puzloaded : "Das heutige Rätsel wurde geladen.",
    newpuzzles : "Ein neues Rätsel steht bereit.<br>Um es zu laden klicken Sie auf \"Neu\""
};
var textEnglish = {
    restart: "Restart",
    new: "New",
    undo: "Undo",
    redo: "Redo",
    notes: "Notes",
    check: "Check",
    help: "Help",
    pause: "Pause",
    closewin: "Close",
    printversion : "Print Version",
    yestsol : "Yesterday's Solution",
    congratulations: "Congratulations! You have completed the Str8ts Puzzle!",
    http_request_error: "Error createing server request.",
    check_cellsC1: "There is <font color=\"#6666ff\"><b>1</b></font> correct cell.<br />",
    check_cellsC2: "There are <font color=\"#6666ff\"><b>%1%</b></font> correct cells.<br />",
    check_cellsW1: "There is <font color=\"red\"><b>1</b></font> cell that is wrong.<br />",
    check_cellsW2: "There are <font color=\"red\"><b>%1%</b></font> cells that are wrong.<br />",
    check_cellsB1: "There is <b>1</b> cell left blank.<br />",
    check_cellsB2: "There are <b>%1%</b> cells left blank.<br />",
    puzzlenum: "Puzzle No.",
    restartconfirm: "Are you sure you want to<br />clear the board?",
    gradetext: ["","Easy","Moderate","Tough","Diabolical","Extreme"],
    highsamenum : "Highlight Compartments",
    reallyload : "Load today's new puzzle?<br />The old puzzle will be deleted.",
    nointernet : "Couldn't reach the Internet to pick up the puzzles.",
    puzloaded : "Today's puzzles are loaded.",
    newpuzzles : "New Puzzles available. Tap on New"
};

var appsites = ['tsun','syndp'];

function breakout_of_frame()
{
	if( screen.width > 748 ) return;
	if( top.location != location ) {
	    top.location.href = document.location.href ;
	}
}

function setcomphigh() {
    if( cookie.read('spch') ) {
        showcomphigh = eval(cookie.read('spch'));
    }
    if( showcomphigh==false ) {
        document.getElementById("comphigh").checked = false;
    } else {
        document.getElementById("comphigh").checked = true;
    }
    if( showcomphigh===null || showcomphigh==='' ){
        cookie.create('spch',true,7);
    }
}
function createPuzzle(divElement,langin) {
	language = langin;
	puzzle=Sudoku(divElement);
	puzzle.reload();
	puzzle.setNewState();
	//try to load the daily puzzle from the server.
	//If it succeeds, it will replace the default puzzle.
    var script = document.createElement("script");

    script.setAttribute("src",dataurl);
    script.setAttribute("type","text/javascript");
	document.body.appendChild(script);
	//success means a call to the 'loaddaily' function
}
function loaddaily(datain) {
	//see if the puzzle has changed
    servercallOK=true;
	newpuzzleready = datain;
	newAvailable = (cookie.read('pdata') != datain);
	if (newAvailable) {
		if(puzzle) puzzle.setNewState();
//		alert("New puzzles available","Ok");
	}
//	else alert("no change","Ok");
}

function Sudoku(divElement) {
	//creates and returns the Sudoku puzzle object
	//divElement - is the browser div which the puzzle should display in

	//the puzzle object
	var puzzle = {};

	//**************************************************************
	// CONSTANTS / HARDCODED VALUES
	//**************************************************************
	var text = ( language == 'de' ) ? textGerman : textEnglish;

	var MODE_NOTES = 1;
	var MODE_NORMAL = 0;

	//**************************************************************
	// INTERNAL VARIABLES
	//**************************************************************

	var data;
	var gval = new Array(9);	//puzzle given values
	var sol = new Array(9);		//puzzle solution
	var jc =  new Array(9);		//puzzle mask
	var usol = new Array(9);	//user proposed solution
	var umode = new Array(9); 	//current user mode for each cell
	var notesDown = false;
	//initialize array limits
	for (var i  = 0; i<10; i++) {
		gval[i] = new Array(9);
		sol[i] = new Array(9);
		jc[i] = new Array(9);
		usol[i] = new Array(9);
		umode[i] = new Array(9);
	}

	//Initialize to default puzzle
	var selectedCell;		//currently selected cell
	var selX = -1;
	var selY = -1;
	var undoPtr = -1;		//pointer to last entered undo item
	//cookie.erase('pdata');
	//alert(cookie.read("pdata"));

	//**************************************************************
	// SET UP/LOAD THE PUZZLE BOARD
	//**************************************************************
	createBoard(divElement);
    if (cookie.read("pdata")) {
		//load existing puzzle
		data = cookie.read('pdata');
	} else {
		//load default puzzle
		data = "g0000000040000000040000000040000000040000000040000000040000000040000000040000000049807650349807650349807650349807650349807650349807650349807650349807650349807650340010001000010001000010001000010001000010001000010001000010001000010001000010001001234";
	}
	undoPtr = cookie.read('undoPtr');
	if( undoPtr ) {
		cookie.read_serialize("undoStack");
	}
	else undoPtr = -1;
	loadPuzzle(data);

	//**************************************************************
	// PROPERTIES
	//**************************************************************
	//object properties (exposed through get/set functions)
	var puznum;	//puzzle number
	var level;	//difficulty level
	puzzle.getNumber = function(){
		return puznum;
	}
	puzzle.getLevel = function(){
		return level;
	}

	//**************************************************************
	// EXTERNAL METHODS
	//**************************************************************

	puzzle.loadFromServer = function (datain) {
		if (datain) {
			puzzle.clearboard();
			puzzle.clearState();
			data = datain;
			loadPuzzle(data);
			//save it to a cookie
			cookie.create('pdata',data,7);
		}
	}
	puzzle.reload = function () {
		var us, um;
        selY=selX=-1;
        for (var i=0; i<9; i++) {
			us = cookie.read("us"+i);
			um = cookie.read("um"+i);
			if (us!=null) {
				usol[i] = us.split("|"); //user proposed solution
			}
			if (um!=null) {
				umode[i] = um.split("|"); //current user mode for each cell
			}
			for (var j = 0; j < 9; j++) {
				setCell(i, j);
			}
		}
	}

	puzzle.saveState = function () {
		for (var i=0; i<9; i++) {
			cookie.create("us"+i,usol[i].join("|"),7);	//user proposed solution
			cookie.create("um"+i,umode[i].join("|"),7); 	//current user mode for each cell
		}
	}

	puzzle.clearState = function () {
		for (var i=0; i<9; i++) {
			cookie.erase("us"+i);
			cookie.erase("um"+i);
		}

	}
	puzzle.clearboard = function () {
		for (var j = 0; j < 9; j++) {
			for (var i = 0; i < 9; i++) {
				usol[j][i]="";
				umode[j][i]=0;
				//update the table
				el = document.getElementById('A' + (i + 1) + (j + 1));
				if (gval[j][i] > 0) {
					el.innerHTML = gval[j][i];
					el.className = (jc[j][i]==0) ? 'CellGiven' : 'CellBlack';
				}
				else {
					el.innerHTML = '';
					el.className = (jc[j][i]==0) ? 'CellNormal' : 'CellBlack';
				}
			}
		}
		cookie.erase("undoStack");
		cookie.erase("undoPtr");
		undoList.length=0;
		undoPtr=-1;
		puzzle.setNewState();
		setButtons();
        selY=selX=-1;
	}
	puzzle.setNewState = function() {
		var el = document.getElementById('btn_new');
		if( newAvailable ) {
			el.className = "btnBlack";
			//el.style.background = "url(sudoku_port.png) -24px -13px";
			el.style.opacity = 1.0;
		} else {
			el.className = "btnNormal linearBg2";
			//el.style.background = "url(new_depressed.png) no-repeat";
			el.style.opacity = 0.5;
		}
	}
	puzzle.store_comphigh = function(field) {
		showcomphigh = field.checked;
		cookie.create('spch',showcomphigh,7);
		if( !showcomphigh && selY!=-1 && selX!=-1 )
			puzzle.paint_compartment( selY, selX, 'CellNormal', 'CellGiven', true );
	}

	puzzle.paint_compartment = function( x, y, myclass, mygiven, flag ) {
		var i;
		if( !flag || x==-1 || y==-1 ) return;
 		for(i=x;i>=0 && jc[y][i]=='0';i--) document.getElementById('A'+(i+1)+(y+1)).className = (gval[y][i]==0) ? myclass : mygiven;
		for(i=x*1+1;i<9  && jc[y][i]=='0';i++) document.getElementById('A'+(i+1)+(y+1)).className = (gval[y][i]==0) ? myclass : mygiven;
		for(i=y-1;i>=0 && jc[i][x]=='0';i--) document.getElementById('A'+(x+1)+(i+1)).className = (gval[i][x]==0) ? myclass : mygiven;
		for(i=y*1+1;i<9  && jc[i][x]=='0';i++) document.getElementById('A'+(x+1)+(i+1)).className = (gval[i][x]==0) ? myclass : mygiven;
	}

	//**************************************************************
	// INTERNAL EVENTS;
	//**************************************************************
	function cell_click(cell) {
		//get the cell coord
		var i = cell.id.charAt(1) - 1;
		var j = cell.id.charAt(2) - 1;
		//is the selected cell editable? (not given)
		if (jc[j][i] == 0 && gval[j][i] == 0) {
			if (selectedCell) {
				selectedCell.className="CellNormal";
                puzzle.paint_compartment( selY, selX, 'CellNormal', 'CellGiven', showcomphigh );
			}
			selectedCell=cell;
			selX=j;
			selY=i;
			setButtons();
            puzzle.paint_compartment(i,j,'CellNormalHigh', 'CellGivenHigh', showcomphigh);
			cell.className="CellNormalHigh CellSelect";
		}
	}
	function setUndoRedo() {
		el = document.getElementById('btn_undo');
		el.style.opacity = (undoList.length && undoPtr>-1) ? 1.0 : 0.3;
		el = document.getElementById('btn_redo');
		el.style.opacity = (undoList.length && undoPtr<undoList.length-1 ) ? 1.0 : 0.5;
	}
	function setButtons() {
		//update the number selection buttons state
		var values="",el;
		if (selX!=-1) {
			if ((notesDown==true && umode[selX][selY] == MODE_NOTES) || (notesDown==false && umode[selX][selY] != MODE_NOTES)) {
				//cell display mode matches current user mode. activate appropriate buttons
				values = usol[selX][selY] || "";
			}
		}

		for (var i = 1; i < 10; i++) {
			el = document.getElementById('btn' + i);
			if (values.indexOf(i)>-1) {
				//found
				el.className = "btnNumberBtn linearBg2";
			} else {
				//not found
				el.className = "btnNumberBtn";
			}
		}

		if (selX != -1) {
			//now set the cell
			if (umode[selX][selY] == MODE_NOTES) {
				//show notes
				selectedCell.innerHTML = "";
				selectedCell.appendChild(new NotesGrid(usol[selX][selY] || ""));
			}
			else {
				//show single result
				selectedCell.innerHTML = usol[selX][selY] || "";
			}
		}
		setUndoRedo();
	}

	function setCell(x,y){
		//make sure this is a user cell
		if (jc[x][y] == 0 && gval[x][y] == 0) {
			//now set the cell
			cell = document.getElementById('A' + (y+1) + (x+1));
			if (umode[x][y] == MODE_NOTES) {
				//show notes
				cell.innerHTML = "";
				cell.appendChild(new NotesGrid(usol[x][y] || ""));
			}
			else {
				//show single result
				if (usol[x][y]) {
					cell.innerHTML = usol[x][y] || "";
				}
			}
		}
	}

	function number_click (num){
		var value = num.id.charAt(3);

		if (selectedCell) {
			undoPtr++;
			undoList.length=undoPtr; //truncate any extra 'redos'

			var oldVal = usol[selX][selY];
			var oldMode;
			if (umode[selX][selY] == MODE_NOTES) {
				oldMode = MODE_NOTES;
			} else {
				oldMode = MODE_NORMAL;
			}
			if (notesDown) {
				//notes entry mode
				if (oldMode != MODE_NOTES) {
					umode[selX][selY] = MODE_NOTES;
					cookie.create("um"+selX,umode[selX].join("|"),7); 	//current user mode
					usol[selX][selY]="";
				}
				var note = usol[selX][selY] || "";
				var loc=note.indexOf(value);
				if (loc>-1) {
					//number already highlighted, deselect it
					usol[selX][selY] = note.substr(0,loc) + note.substr(loc+1);
				}
				else {
					usol[selX][selY] = note + value;
				}
				cookie.create("us"+selX,usol[selX].join("|"),7);	//user notes

				undoList[undoPtr] = {
					mode: MODE_NOTES,
					oldmode: oldMode,
					oldval: oldVal,
					newval: usol[selX][selY],
					x: selX,
					y: selY
				};
			} else {
				//solution entry mode
				if (oldMode != MODE_NORMAL) {
					umode[selX][selY] = MODE_NORMAL;
					cookie.create("um" + selX, umode[selX].join("|"), 7); //current user mode
					usol[selX][selY] = "";
				}

				var cursol = usol[selX][selY] || "";

				if (cursol == value) {
					//number already highlighted, deselect it
					usol[selX][selY] = "";
				}
				else {
					usol[selX][selY] = value;
				}
				cookie.create("us"+selX,usol[selX].join("|"),7);	//user proposed solution
				//set undo
				undoList[undoPtr] = {
					mode: MODE_NORMAL,
					oldmode: oldMode,
					oldval: oldVal,
					newval: usol[selX][selY],
					x: selX,
					y: selY
				};
			}
			cookie.create_serialized("undoStack",7);
			cookie.create("undoPtr",undoPtr,7);
			setButtons();
			check(false);
		}
	}
	function show_menu() {
		alert("goes to the main menu which does not exist in this version. Remove this button?");
	//	document.location = 'main-full.html';
	}
	function helpwindow() {
		document.location = 'http://www.str8ts.de/anleitung';
	}
	function gotosudoku() {
		var pp = document.location.toString();
		document.location = 'sudoku_app.html';
	}
	function gotoprint() {
		var pp = document.location.toString();
		document.location = fullpath + 'Print_Str8ts.asp?lang=' + language + '&a=' + accid;
	}
	function gotoyestsol() {
		var pp = document.location.toString();
		document.location = fullpath + 'Print_Str8ts.asp?lang=' + language + '&a=' + accid + '&solution=please';
	}
	function closewindow() {
		alert("Close windows code goes here","Ok",0);
	}
	function restart() {
		myconfirm(text.restartconfirm,"yesno",1);
		//if (e) {
		//	clearboard();
		//	puzzle.clearState(cg);
		//}
	}

	function undo() {
		if (undoPtr>=0) {
			//restore the old value
			selX = undoList[undoPtr].x;
			selY = undoList[undoPtr].y;
			umode[selX][selY] = undoList[undoPtr].oldmode;
			usol[selX][selY] = undoList[undoPtr].oldval;
			cookie.create("us"+selX,usol[selX].join("|"),7);	//user proposed solution
			cookie.create("um"+selX,umode[selX].join("|"),7); 	//current user mode for each cell
			undoPtr--;
			cookie.create("undoPtr",undoPtr,7);
			//setUndoRedo();
			cell_click(document.getElementById('A'+(selY+1)+(selX+1)));
		}
	}
	function redo() {
		if (undoPtr<undoList.length-1) {
			undoPtr++;
			//restore the new value
			selX = undoList[undoPtr].x;
			selY = undoList[undoPtr].y;

			umode[selX][selY] = undoList[undoPtr].mode;
			usol[selX][selY] = undoList[undoPtr].newval;
			cookie.create("us"+selX,usol[selX].join("|"),7);	//user proposed solution
			cookie.create("um"+selX,umode[selX].join("|"),7); 	//current user mode for each cell
			cookie.create("undoPtr",undoPtr,7);
			//setUndoRedo();
			cell_click(document.getElementById('A'+(selY+1)+(selX+1)));
		}
	}
	function getnewpuzzle(btn)
	{
		if( !servercallOK ) {
			alert(text.nointernet,"Ok",0);
			return;
		}
		if (cookie.read('pdata') == newpuzzleready) {
			alert(text.puzloaded,"Ok",0);
			return;
		}
		myconfirm(text.reallyload,"yesno",3);
	}

	function notes_click(btn) {
		if (notesDown==true) {
			notesDown=false;
			document.getElementById('btn_notes').className = "btnNormal";
		} else {
			notesDown=true;
			document.getElementById('btn_notes').className = "btnNormal linearBg2";
			if (selX!=-1 && selY!=-1 && umode[selX][selY] != MODE_NOTES) {
				umode[selX][selY] = MODE_NOTES;
				cookie.create("um" + selX, umode[selX].join("|"), 7); //current user mode
				//set undo
				undoPtr++;
				undoList.length=undoPtr; //truncate any extra 'redos'
				undoList[undoPtr] = {
					mode: MODE_NOTES,
					oldmode: MODE_NORMAL,
					oldval: usol[selX][selY],
					newval: usol[selX][selY],
					x: selX,
					y: selY
				};
				cookie.create_serialized("undoStack",7);
				cookie.create("undoPtr",undoPtr,7);
			}
		}
		setButtons();
	}

	function check(showerrors) {
		var errCtr=0;
		var blankCtr=0;
		var correctCtr=0;
		var value;
		for (var j = 0; j < 9; j++) {
			for (var i = 0; i < 9; i++) {
				//compare the current values with the correct ones
				value = usol[j][i] || "";
				if (jc[j][i]==0 && gval[j][i]==0) {
					if (value == '' || umode[j][i]==MODE_NOTES) {
						//blank (no answer entered)
						blankCtr++;
					}
					else {
						if (value != sol[j][i]) {
							//wrong answer
							errCtr++;
							if( showerrors ) {
								el = document.getElementById('A' + (i + 1) + (j + 1));
								el.className = el.className + " CellError";
							}
						}
						else correctCtr++;
					}
				}
			}
		}
		if (errCtr == 0 && blankCtr==0) {
			SWStop();
			alert(text.congratulations,"Ok",0);
		}
		else if( showerrors ) {
			msg = '';
			if( correctCtr > 0 ) {
				msg = (correctCtr==1)?text.check_cellsC1:text.check_cellsC2.replace("%1%", correctCtr );
			}
			if( errCtr > 0 ) {
				msg += (errCtr==1)?text.check_cellsW1:text.check_cellsW2.replace("%1%", errCtr );
			}
			if( blankCtr > 0 ) {
				msg += (blankCtr==1)?text.check_cellsB1:text.check_cellsB2.replace("%1%", blankCtr );
			}
			alert(msg,"Ok",0);
		}
	}

	//**************************************************************
	// INTERNAL FUNCTIONS
	//**************************************************************

	function createBoard(divElement){

		var Ocell, cell;
		var Orow, row;
		var x,y;
		var iTable, iBody;
		var table = document.createElement("TABLE");
		table.className = "outertable";
		var tBody = document.createElement("TBODY");

        now = new Date;
        theYear=now.getYear()
        if (theYear < 1900) theYear=theYear+1900;

		//clear the existing div children
		divElement.innerHTML="";

		divElement.appendChild(table);
		table.appendChild(tBody);
		//create the table
		for (j = 1; j < 10; j++) {
		    row = document.createElement("tr");
		    tBody.appendChild(row);
		    for (i = 1; i < 10; i++) {
		        cell = document.createElement("td");
		        cell.id = "A" + j + i;
		        cell.className = 'CellNormal';
		        cell.style.borderLeft = (i == 1) ? bwidth : "1px solid black";
		        cell.style.borderTop = (j == 1) ? bwidth : "1px solid black";
		        if( j==9 ) cell.style.borderBottom = bwidth;
		        if( i==9 ) cell.style.borderRight = bwidth;
		        cell.onclick = function() { cell_click(this); };
		        row.appendChild(cell);
		    }
		}
		//create the number selections
		var ulist = document.createElement("ul");
		ulist.id="numberList";
		divElement.appendChild(ulist);
		for (j=1; j<10; j++) {
			var li = document.createElement("li");
			li.id="btn"+j;
			li.innerHTML=j;
			li.className="btnNumberBtn";
			li.onclick = function() { number_click(this); };
			ulist.appendChild(li);
		}

		//Create the Restart/Undo/Redo/Notes/Check buttons
		//li.innerHTML='Sudoku';
		//li.myaddOnClick(function () {gotosudoku();});
		//li.className="btnGray";

		if(accid==2244 || accid==3298) // puzzle name instead of yesterdays sol + print
		{
			var li = document.createElement("div");
			li.id="btn_title";
			li.innerHTML='Str8ts';
			//li.myaddOnClick(function () {gotostr8ts();});
			li.className="btnTitle";
			divElement.appendChild(li);
		}
		else
		{
			var li = document.createElement("div");
			li.id="btn_sudoku";
			li.innerHTML=text.yestsol;
			li.onclick = function() { gotoyestsol(); };
			li.className="btnSmall";
			divElement.appendChild(li);

			//li.innerHTML='Str8ts';
			////li.myaddOnClick(function () {gotostr8ts();});
			//li.className="btnBlack";

			var li = document.createElement("div");
			li.id="btn_str8ts";
			li.innerHTML=text.printversion;
			li.onclick = function() { gotoprint(); };
			li.className="btnSmall2";
			divElement.appendChild(li);
		}
		var li = document.createElement("div");
		li.id="btn_help";
		li.innerHTML=text.help;
		li.onclick = function() { helpwindow(); };
		li.className="btnNormal";
		divElement.appendChild(li);

		var li = document.createElement("div");
		li.id="btn_new";
		li.innerHTML='';
		li.onclick = function() { getnewpuzzle(); };
		li.className="btnNormal";
		li.innerHTML=text.new;
		divElement.appendChild(li);

		var li = document.createElement("div");
		li.id="btn_restart";
		li.onclick = function() { restart(); };
		li.className="btnNormal";
		li.innerHTML=text.restart;
		divElement.appendChild(li);

		var li = document.createElement("div");
		li.id="btn_notes";
		li.onclick = function() { notes_click(this); };
		li.className="btnNormal";
		li.innerHTML = text.notes;
		divElement.appendChild(li);

		var li = document.createElement("div");
		li.id="btn_pause";
		li.onclick = function() { pause_game(); };
		li.className="btnNormal";
		li.innerHTML = text.pause;
		divElement.appendChild(li);

		var li = document.createElement("div");
		li.id="btn_check";
		li.onclick = function() { check(true); };
		li.className="btnNormal";
		li.innerHTML = text.check;
		divElement.appendChild(li);

		var li = document.createElement("div");
		li.id="btn_undo";
		li.onclick = function() { undo(); };
		li.className="btnNormal";
		li.innerHTML = text.undo;
		divElement.appendChild(li);

		var li = document.createElement("div");
		li.id="btn_redo";
		li.onclick = function() { redo(); };
		li.className="btnNormal";
		li.innerHTML=text.redo;
		divElement.appendChild(li);

		var li = document.createElement("div");
		li.id="copyr";
		li.className="copyr";
		li.innerHTML="&copy; Copyright Syndicated Puzzles 2016, for " + ((accid==3298) ? "apa" : ((accid==2244) ? 'NOZ' : 'str8ts.de'));
		divElement.appendChild(li);

		var li = document.createElement("div");
		li.id="puzzlenum";
		li.innerHTML="Puzzle No. XXX, grade"
		divElement.appendChild(li);

		var li = document.createElement("div");
		li.id="fade";
		li.className="black_overlay";
		divElement.appendChild(li);


		//document.getElementById("comphightext").innerHTML = text.highsamenum;

		// Timer input control
		if( cookie.read2('spst') ) showTimer = eval(cookie.read2('spst'));
       // if( cookie.read2('spch') ) showcomphigh = eval(cookie.read2('spch'));
		if( showTimer==true ) {
			var li = document.createElement("div");
			li.id="theTimer";
			li.onclick = function() { pause_game(); };
			li.className="TimeBox";
			li.text = "0:00:00";
			divElement.appendChild(li);
		}
		document.onkeyup = function keyPress(event) {
			if ( typeof event == "undefined" ) event = window.event;
			wkey = event.keyCode;
			if ( document.layers ) wkey = event.which;
			if (wkey>48 && wkey<58) {
				//number key pressed
				number_click(document.getElementById('btn'+(wkey-48)));
			}
		}
		if(document.getElementById) {
			window.alert = function(txt,okyesno,action) {
				createCustomAlert(txt,okyesno,action);
			}
			window.myconfirm = function(txt,okyesno,action) {
				createCustomAlert(txt,okyesno,action);
			}
		}
	}
	function loadPuzzle(mydata){
		var el;

		//get the puzzle number
		if (mydata.length > 244) {
			puznum = mydata.substring(244, mydata.length);
		}
		if (mydata.indexOf('rror') > 0) {
			alert(mydata.substring(6, mydata.length - 8),"Ok");
			return;
		}


		switch (mydata.charAt(0)) {
			case 'g':
				level = 1;
				break;
			case 'm':
				level = 2;
				break;
			case 't':
				level = 3;
				break;
			case 'd':
				level = 4;
				break;
			default:
				level = 0;
		}
		document.getElementById("puzzlenum").innerHTML = text.puzzlenum + puznum + ", <b>" + text.gradetext[level] + "</b>";
		//plug in to board arrays
		for (var j = 0; j < 9; j++) {
			for (var i = 0; i < 9; i++) {
				usol[j][i]="";
				umode[j][i]=0;

				var c = i * 9 + j + 1;

				if (mydata.charAt(c) == '.') {
					gval[j][i] = 0;
				}
				else {
					gval[j][i] = mydata.charAt(c) * 1;
				}

				sol[j][i] = mydata.charAt(c + 81) * 1;
				jc[j][i] = mydata.charAt(c + 162) * 1;
				//update the table
				el = document.getElementById('A' + (i+1) + (j+1));

				//given values are read-only
				if (gval[j][i] > 0) {
					el.innerHTML=gval[j][i];
				} else {
					el.innerHTML="&nbsp;";
				}
				if (jc[j][i] == '0') {
					el.className = (gval[j][i] > 0) ? 'CellGiven':'CellNormal';
				} else {
					el.className= 'CellBlack';
				}
			}
		}
		SWStop();
		SWStart();
		setUndoRedo();

		if( puznum == 1 ) alert(text.newpuzzles,"Ok");
	}

	//********************************************
	//* NotesGrid CLASS
	//********************************************
	function NotesGrid(values) {
		var cell;
		var row;
		var table = document.createElement("TABLE");
		var tBody = document.createElement("TBODY");

		table.className="notesTable"
		table.appendChild(tBody);

		//create the table
		for (j = 0; j < 3; j++) {
			row = document.createElement("tr");
			tBody.appendChild(row);
			for (i = 1; i < 4; i++) {
				cell = document.createElement("td");
				if (values.indexOf(i + j * 3) > -1) {
					cell.innerHTML = i + j * 3;
				} else {
					cell.innerHTML="&nbsp;";
				}
				row.appendChild(cell);
			}
		}
		return table;
	}

	return puzzle;
}

window.onload = function() {

	var de = document.getElementById('sp_mypuzzle');
	if( de )
		var puzzle=createPuzzle(de,'de');

};

