<CFIF IsDefined ("session.LoginData.SignEula") AND session.LoginData.SignEula IS false>
  <cflocation url="eula.cfm">  <cfabort>
</CFIF>
<CFIF IsDefined ("session.userID")>
	<cflocation url="../home/index.cfm">
</CFIF>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<cfoutput><title>#application.WebSiteName#</title></cfoutput>
</head>
<body>

LOGIN

</body>
</html>