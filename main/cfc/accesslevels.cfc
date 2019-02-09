<cfcomponent displayname="accesslevels">
<cfparam name="Cookie.al" default="61">

	<!---Get the login users access utID by the cookie set in the application.cfc page --->
	<cffunction name="getAccessLevels" access="public" returntype="query">
		<cfset var qGetAccesslvls = "" >
  		<cfquery name="qGetAccesslvls" datasource="#application.datasource#">
            SELECT utID, usercodeID, usertype
            FROM dbo.usertype 
            Where usercodeID >= <cfqueryparam value="#session.usercodeID#" cfsqltype="cf_sql_integer">
            ORDER BY usercodeID
    	</cfquery>
  	   <cfreturn qGetAccesslvls>
	</cffunction>
    
    <!---Get the queried users access level.  Display level name --->   
    <cffunction access="public" name="getAccessLevelByID" returntype="query">
    	<cfargument name="utID" required="yes" type="numeric">
        <CFSET var qAccessLevel = "">
        <cfquery name="qAccessLevel" datasource="#application.datasource#">
        	SELECT utID, usercodeID, usertype 
            FROM usertype
            WHERE utID = <cfqueryparam value="#utID#" cfsqltype="cf_sql_integer">
        </cfquery>
        
        <cfreturn qAccessLevel>
    </cffunction>
    
    <!---Get Access Levels avaiable for the retail Products assignment --->
	<cffunction name="GetRetailAccessLevels" access="public" returntype="query">
		<cfset var qRAL = "" >
        <CFIF cookie.al LTE 30>
        	<CFSET MaxUserCodeID = 30>
        <cfelse>
        	<CFSET MaxUserCodeID = cookie.al>
        </CFIF> 
  		<cfquery name="qRAL" datasource="#application.datasource#">
		SELECT utID, usercodeID, usertype
		FROM dbo.usertype 
        Where usercodeID >= <cfqueryparam value="#MaxUserCodeID#" cfsqltype="cf_sql_integer">
        ORDER BY usercodeID
    	</cfquery>
    
  <cfreturn qRAL>
	</cffunction>
    
    
</cfcomponent>