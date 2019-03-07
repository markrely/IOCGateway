<CFIF IsDefined ("session.LoginData.SignEula") AND session.LoginData.SignEula IS false>
  <cflocation url="eula.cfm">  <cfabort>
</CFIF>
<CFIF IsDefined ("session.userID")>
	<cflocation url="../home/index.cfm">
</CFIF>

<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<cfoutput><title>#application.WebSiteName#</title></cfoutput>
</head>
<body>

LOGIN

</body>
</html>