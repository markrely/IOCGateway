<cflogout>
<CFSET structDelete(session, "accesslevel")>
<CFSET structDelete(session, "arcart")>
<CFSET structDelete(session, "dateinitialized")>
<CFSET structDelete(session, "decodekey")>
<CFSET structDelete(session, "encodetype")>
<CFSET structDelete(session, "password")>
<CFSET structDelete(session, "passwordexpirationdaysleft")>
<CFSET structDelete(session, "sessionid")>
<CFSET structDelete(session, "stylecss")>

<CFSET structDelete(session, "stylecss")>
<CFSET structDelete(session, "urltoken")>
<CFSET structDelete(session, "userip")>

<CFSET structDelete(session, "userID")>
<CFSET structDelete(session, "utID")>
<CFSET structDelete(session, "username")>
<CFSET structDelete(session, "websitename")>

<CFSET structDelete(session.LoginData, "AttemptNumber")>
<CFSET structDelete(session.LoginData, "Enabled")>
<CFSET structDelete(session.LoginData, "EulaApproved")>
<CFSET structDelete(session.LoginData, "expires")>
<CFSET structDelete(session.LoginData, "FoundUser")>
<CFSET structDelete(session.LoginData, "LOGINSTARTTIME")>
<CFSET structDelete(session.LoginData, "Password")>
<CFSET structDelete(session.LoginData, "Username")>
<CFSET structDelete(session, "expireDate")>
<cfcookie name="AL" expires="now">
<cfcookie name="CurrentUser" expires="now">
<cfcookie name="ID1" expires="now">
<cfcookie name="K" expires="now">
<cfcookie name="MemberWWW" expires="now">
<cfcookie name="RootWWW" expires="now">
<cfcookie name="UserEmail" expires="now">

<cflocation url="http://gateway.ioc-dev.ioc.com">