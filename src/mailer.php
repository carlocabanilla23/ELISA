﻿<?php
// Change the 4 variables below

$yourName = 'John Carlo Cabanilla';
$yourEmail = 'carlocabanilla23@students.highline.edu';
$yourSubject = 'REQUEST From Cubestreet - Telephone:';
$referringPage = 'contsent.html';
// No need to edit below unless you really want to. It's using a simple php mail() function. Use your own if you want
function cleanPosUrl ($str) {
return stripslashes($str);
}
	if ( isset($_POST['sendContactEmail']) )
	{
	$to = $yourEmail;
	$subject = $yourSubject.': '.$_POST['posRegard'];
	$message = cleanPosUrl($_POST['posText']);
	$headers = "From: ".cleanPosUrl($_POST['posName'])." <".$_POST['posEmail'].">\r\n";
	$headers .= 'To: '.$yourName.' <'.$yourEmail.'>'."\r\n";
	$mailit = mail($to,$subject,$message,$headers);
		if ( @$mailit ) {
		header('Location: '.$referringPage.'?success=true');
		}
		else {
		header('Location: '.$referringPage.'?error=true');
		}
	}
?>