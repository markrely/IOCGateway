<cfcomponent namespace="Application">
<cfset THIS.javaSettings = {LoadPaths = ["/classfiles"],reloadOnChange=true,watchInterval=30}/>
		<!---Turn on Session Variables--->
		<CFSET this.name="IOC_GATEWAY">
		<CFSET this.sessionManagement = true>
        <!--- NOTE: Timespan specs: CreatetimeSpan(days, hours, minutes, seconds) --->
        <CFSET this.sessiontimeout = createtimespan(0,3,0,90)>   
        <CFSET this.ApplicationTimeout = createtimespan(0,3,0,90)>
        <!--- Do not use Client Cookies. No need since we are not doing cross site transfers.---> 
        <CFSET This.SetClientCookies = false>    
          <cfsetting requesttimeout="0">
        <cfset executionStartTime = getTickCount() />

<cfif not isdefined("Request.PasswordKey")>
     <cfparam name="Request.PasswordKey" default="!0hy1A1HE[K91et">
</cfif>  
 <!--- Initialize application variables --->       
<cffunction name="onApplicationStart" returnType="any">

	<CFSET application.logindate = "#DATEFORMAT(NOW(), 'mm/dd/yyyy')#">
    <CFSET application.SecurityDataSource = "IOCUsers">
    <CFSET application.homewww =  "http://gateway.ioc-dev.ioc.com"> 
    <CFSET application.memberhomewww =  "http://gateway.ioc-dev.ioc.com/main">
    <CFSET application.StyleCSS = "href='http://gateway.ioc-dev.ioc.com/css/main.css' rel='stylesheet' type='text/css' name='styles'">
    <CFSET application.AutoEmail = "automessages@smtp.illinoiscomptroller.com">
    <CFSET application.webmasterEmail = "andrewp@illinoiscomptroller.gov">
    <CFSET application.WebSiteName = "IOC - GATEWAY">
    <CFSET application.ApplicationToken = "IOCGatewayToken_DEV">
   
</cffunction> 
        
<!---Initialize the session and set all session variables --->
<cffunction name="onSessionStart" returntype="void" output="no">
	<CFSET var thispage = CGI.SCRIPT_NAME>
    <CFSET Session.UserIP = CGI.REMOTE_ADDR>
    <CFSET Session.DateInitialized = NOW()/>
    <CFSET Session.arCart = ArrayNew(1)>
    <CFSET session.StyleCSS = "href='http://gateway.ioc-dev.ioc.com/css/main.css' rel='stylesheet' type='text/css' name='styles'">
    <CFSET session.WebSiteName = "IOC - GATEWAY">
    <CFSET session.homewww =  "http://gateway.ioc-dev.ioc.com"> 
</cffunction>
<!--- On error handling --->
<!---  <cffunction name="onError">
	<cfargument name="exception" required="yes">
    <cfargument name="EventName" type="string" required="yes">
    <cfsetting requesttimeout="#(((getTickCount()-executionStartTime)/1000)+10)#" />
    <cfmail to="andrewp@illinoiscomptroller.gov" from="#application.AutoEmail#" subject="Error- IOC - PLACE AUDIT Application" type="html">
          Event Name: #Arguments.Eventname# <BR><BR>
          Message:  #Arguments.Exception.message# <BR><BR>
         <CFIF IsDefined ("Arguments.Exception.rootcause")> 
           Root Cause Message: #Arguments.Exception.rootcause.message# <BR><BR>
 		 </CFIF> 
        <CFIF IsDefined ("cookie")>
        	<cfdump var="#cookie#" label="Cookies">
        </CFIF>
    	<cfdump var="#exception#" label="Exception">
        <cfdump var="#cgi#" label="cgi">
        <Cfdump var="#variables#" label="variables">
    </cfmail>
	 
<cflocation url="#session.homewww#/request_err.cfm">
</cffunction>  ---> 

</cfcomponent>