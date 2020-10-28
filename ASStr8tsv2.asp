<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html><head>
<!--=============================================================
// Daily Str8ts by Andrew Stuart
//
// Copyright Syndicated Puzzles 2008-2010
//
// This script is for distribution to any web site participating
// in the Syndicated Puzzles Daily Str8ts Subscription
//
// Version 2.03 29-Oct-2010
// =============================================================-->

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link href="ASStr8ts-Dateien/ASStr8ts.css" type="text/css" rel="stylesheet">
<script type="text/javascript">    var doasym = false;</script>
<script type="text/javascript" src="ASStr8ts.js?v=2.03"></script>
<script type="text/javascript" src="http://files1.derwesten.de/js/click.js"></script>  
<title>Das tägliche Str8ts von Andew Stuart</title>
</head>
<body leftmargin="0" topmargin="0" onload="javascript: load_board(false);" alink="#ffff00" bgcolor="#ffcccc" text="#000000" link="#0000ff" marginheight="0" marginwidth="0" vlink="#0000ff">
<table border="0" cellpadding="0" cellspacing="0" width="430">
<tbody>
<tr>
	<td rowspan="2" width="10"></td>
	<td align=center style="padding: 9px 10px 0 0; font-size:12px; line-height:16px; color:#000; font-family: Arial" valign="top" width="100%">
		<b>
		<span id="playertitle" style="color:#990000; font-size:22px; line-height:30px">#3680, <font size=2>27. Okt. 2020</font></span></b>
		<br>

		<table border="0" cellpadding="0" cellspacing="0" width="80%" align=center>
		<tr><td width="50%" align=center>
			<b>Schwierigkeitsgrad:</b>
			<br>
			<img id="star1" src="ASStr8ts-Dateien/star.gif" alt="Star">
			<img id="star2" src="ASStr8ts-Dateien/star.gif" alt="Star">
			<img id="star3" src="ASStr8ts-Dateien/star.gif" alt="Star">
			<img id="star4" src="ASStr8ts-Dateien/star.gif" alt="Star">
		</td>
		<td width="50%" align=center>
			<input class="TimeBox" readonly="readonly" size="7" name="theTimer" id="theTimer" value="0:03:21" type="text">
			<input value="Pause" class="TimeBox" onclick="javascript:pause_game();" id="Button1" name="loadeasy" type="button">&nbsp;&nbsp;
		</td></tr></table>
		<br>
		<div style="background-color: #fff; padding:0px 6px 10px 0px">
		Ich möchte erst mal ein leichtes spielen: <br>
		<input value="Mein Erstes Str8ts" class="YButton" style="width: 125px;" onclick="javascript:load_easy(false);" id="loadeasy" name="loadeasy" type="button">
		<input value="Auflösung Erstes Str8ts" class="YButton" onclick="javascript:print_yesterdays_solution(1);" id="yesol" name="yesol" type="button">
		</div>

	</td>
	<td width="10"></td>
</tr>
<tr>
	<td valign="top" width="410">

		<table border="0" cellpadding="0" cellspacing="0" width="400">
		<tbody><tr>
			<td class="coords">1</td>
			<td class="coords">2</td>
			<td class="coords">3</td>
			<td class="coords">4</td>
			<td class="coords">5</td>
			<td class="coords">6</td>
			<td class="coords">7</td>
			<td class="coords">8</td>
			<td class="coords">9</td>
		</tr>
		</tbody></table>

	</td>
</tr>
<tr>
	<td width="10">
		<table border="0" cellpadding="0" cellspacing="0">
		<tbody><tr><td style="height: 43px;" class="coords" valign="middle">A</td></tr>
		<tr><td style="height: 43px;" class="coords" valign="middle">B</td></tr>
		<tr><td style="height: 44px;" class="coords" valign="middle">C</td></tr>
		<tr><td style="height: 44px;" class="coords" valign="middle">D</td></tr>
		<tr><td style="height: 46px;" class="coords" valign="middle">E</td></tr>
		<tr><td style="height: 44px;" class="coords" valign="middle">F</td></tr>
		<tr><td style="height: 44px;" class="coords" valign="middle">G</td></tr>
		<tr><td style="height: 43px;" class="coords" valign="middle">H</td></tr>
		<tr><td style="height: 43px;" class="coords" valign="middle">J</td></tr>
		</tbody></table>

	</td>
	<td valign="top" width="410">

<table id="sudoku" class="VeryOuter" border="0" cellpadding="0" cellspacing="0">
<tbody><tr>
	<td class="OuterT">

		<table border=0 cellpadding=0 cellspacing=0 id="A1"><tbody>
		<tr>
			<td id="C00" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A00" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C01" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A01" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C02" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A02" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C03" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A03" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C04" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A04" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C05" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A05" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C06" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A06" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C07" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A07" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C08" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A08" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
		</tr>
		<tr>
			<td id="C10" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A10" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C11" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A11" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C12" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A12" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C13" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A13" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C14" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A14" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C15" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A15" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C16" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A16" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C17" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A17" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C18" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A18" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
		</tr>
		<tr>
			<td id="C20" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A20" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C21" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A21" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C22" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A22" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C23" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A23" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C24" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A24" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C25" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A25" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C26" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A26" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C27" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A27" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C28" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A28" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
		</tr>
		<tr>
			<td id="C30" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A30" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C31" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A31" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C32" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A32" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C33" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A33" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C34" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A34" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C35" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A35" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C36" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A36" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C37" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A37" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C38" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A38" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
		</tr>
		<tr>
			<td id="C40" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A40" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C41" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A41" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C42" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A42" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C43" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A43" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C44" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A44" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C45" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A45" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C46" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A46" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C47" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A47" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C48" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A48" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
		</tr>
		<tr>
			<td id="C50" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A50" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C51" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A51" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C52" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A52" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C53" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A53" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C54" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A54" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C55" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A55" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C56" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A56" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C57" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A57" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C58" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A58" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
		</tr>
		<tr>
			<td id="C60" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A60" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C61" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A61" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C62" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A62" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C63" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A63" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C64" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A64" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C65" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A65" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C66" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A66" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C67" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A67" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C68" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A68" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
		</tr>
		<tr>
			<td id="C70" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A70" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C71" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A71" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C72" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A72" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C73" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A73" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C74" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A74" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C75" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A75" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C76" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A76" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C77" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A77" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C78" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A78" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
		</tr>
		<tr>
			<td id="C80" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A80" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C81" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A81" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C82" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A82" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C83" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A83" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C84" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A84" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C85" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A85" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C86" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A86" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C87" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A87" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
			<td id="C88" class="CellT"><input type="text" value="" size=2 class="SQW" maxlength=9 id="A88" onclick="javascript:focyell(this);" onchange="javascript:Sudoku1(this);"></td>
		</tr></tbody>
		</table>
	</td>
</tr>
</tbody></table>
	</td>
</tr>
<tr>
	<td colspan="5" height="10" width="100%"></td>
</tr>
<tr>
	<td width="10"></td>
	<td align="center" valign="top" width="410">
<!--		<input value="Zurück" style="width: 55px;" class="Sbutton" onclick="javascript:back_step();" id="backone" name="backone" type="button">
		<input value="Neustart" class="Sbutton" onclick="javascript:if( window.confirm('Wollen Sie wirklich das Spielfeld leeren?') ) load_board(false);" id="restart" name="restart" type="button">
		<input value="Druckversion" class="SButton" style="width: 105px;" onclick="javascript:print_todays_board();" id="pboard" name="pboard" title="Druckversion des aktuellen Rätsels" type="button">

-->
        
        <br>
		<input type="image" border="0" src="ASStr8ts-Dateien/zurueck.gif" onclick="javascript:back_step();" id="backone" name="backone" />
		<input type="image" border="0" src="ASStr8ts-Dateien/neu.gif" onclick="javascript:if( window.confirm('Wollen Sie wirklich das Spielfeld leeren?') ) load_board(false);" id="restart" name="restart" />
		<input type="image" border="0" src="ASStr8ts-Dateien/druck.gif" onclick="javascript:print_todays_board();" id="pboard" name="pboard" title="Druckversion des aktuellen Rätsels" />
        <br>
        <br>
		<input type="image" border="0" src="ASStr8ts-Dateien/aufl.gif" onclick="javascript:print_yesterdays_solution(0);" id="ysol" name="ysol" title="Auflösung von gestern" />

<!--		<input value="Auflösung von gestern" class="SButton" style="width: 170px;" onclick="javascript:print_yesterdays_solution(0);" id="ysol" name="ysol" type="button">
-->
        <br> <br>
	</td>
</tr>
<tr>
	<td width="10"></td>
	<td align="center" valign="top" width="410" bgcolor="#eeeeee">
		<table border=0 width="100%" cellspacing=0 cellpadding=0><tr>
		<td align=right>Archiv:</td><td align=center>
		<select id="achivepuz" style="background-color:#eeeeee;"><option SELECTED value="0">#3680 - 27. Okt. 2020 - Mittel</option>
<option  value="1">#3679 - 26. Okt. 2020 - Leicht</option>
<option  value="2">#3678 - 25. Okt. 2020 - Teuflisch</option>
<option  value="3">#3677 - 24. Okt. 2020 - Schwer</option>
<option  value="4">#3676 - 23. Okt. 2020 - Mittel</option>
<option  value="5">#3675 - 22. Okt. 2020 - Leicht</option>
<option  value="6">#3674 - 21. Okt. 2020 - Teuflisch</option>
<option  value="7">#3673 - 20. Okt. 2020 - Schwer</option>
<option  value="8">#3672 - 19. Okt. 2020 - Mittel</option>
<option  value="9">#3671 - 18. Okt. 2020 - Leicht</option>
<option  value="10">#3670 - 17. Okt. 2020 - Teuflisch</option>
<option  value="11">#3669 - 16. Okt. 2020 - Schwer</option>
<option  value="12">#3668 - 15. Okt. 2020 - Mittel</option>
<option  value="13">#3667 - 14. Okt. 2020 - Leicht</option>
<option  value="14">#3666 - 13. Okt. 2020 - Teuflisch</option>
<option  value="15">#3665 - 12. Okt. 2020 - Schwer</option>
<option  value="16">#3664 - 11. Okt. 2020 - Mittel</option>
<option  value="17">#3663 - 10. Okt. 2020 - Leicht</option>
<option  value="18">#3662 - 9. Okt. 2020 - Teuflisch</option>
<option  value="19">#3661 - 8. Okt. 2020 - Schwer</option>
<option  value="20">#3660 - 7. Okt. 2020 - Mittel</option>
<option  value="21">#3659 - 6. Okt. 2020 - Leicht</option>
<option  value="22">#3658 - 5. Okt. 2020 - Teuflisch</option>
<option  value="23">#3657 - 4. Okt. 2020 - Schwer</option>
<option  value="24">#3656 - 3. Okt. 2020 - Mittel</option>
<option  value="25">#3655 - 2. Okt. 2020 - Leicht</option>
<option  value="26">#3654 - 1. Okt. 2020 - Teuflisch</option>
<option  value="27">#3653 - 30. Sep. 2020 - Schwer</option>
<option  value="28">#3652 - 29. Sep. 2020 - Mittel</option>
<option  value="29">#3651 - 28. Sep. 2020 - Leicht</option>
<option  value="30">#3650 - 27. Sep. 2020 - Teuflisch</option>
</select></td><td>
		<input type="image" src="ASStr8ts-Dateien/ratsel.gif" value="Rätsel laden" onclick="javascript: var o=document.getElementById('achivepuz').selectedIndex; var p=document.getElementById('achivepuz').options[o].value; document.location.replace('ASStr8tsv2.asp?d='+p);">
		</td></tr></table>
	</td>
</tr>
<tr>
	<td width="10"></td>
	<td align="center" valign="top" width="410">
		<br>
        Rätsel wechseln täglich um 5 Uhr früh (Winterzeit)</font>
		<br>(c) Syndicated Puzzles 2011. <a href="http://www.str8ts.de/" target="_blank">www.str8ts.de</a>
	</td>
</tr>
</tbody></table>
<input type="hidden" id="cmCompDate" value="27/10/2020" />
<input type="hidden" id="cmLevelLet" value="m"/>
<input type="hidden" id="cmPuzzle" value="050000800004070000000000100010000560005000008000903000000500000000000020000000400" />
<input type="hidden" id="cmColourMap" value="011001001000000001000100100001001000110000011000100100001001000100000000100100110"/>
<input type="hidden" id="cmSolution" value="350120870534276980423087156210890567005734608786943012890560231078651324067012403" />
<input type="hidden" id="puznum" value="3680" />
<script type="text/javascript">ivwext();</script>
</body>
</html>