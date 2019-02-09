<cflogout>
<CFSET structDelete(session, "plid")>
<CFSET structDelete(session, "sessionid")>
<CFSET structDelete(session, "urltoken")>
<CFSET structDelete(session, "usercodeid")>
<CFSET structDelete(session, "userID")>
<CFSET structDelete(session, "utID")>

<CFSET structDelete(session, "LoginData.exipres")>
<CFSET structDelete(session, "expireDate")>

<cfcookie name="CurrentUser" expires="now">
<cfcookie name="nic" expires="now">
<cfcookie name="privateEmail" expires="no">
<cfcookie name="AL" expires="now">
<cfset ApplicationStop() />
<cflocation url="../?restart=true" addtoken="false" />