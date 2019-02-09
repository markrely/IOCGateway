<cfcomponent displayname="Security">
	 <!---Get Page Access Level --->
    <cffunction access="public" name="GetPageAccessLevel" output="no" returntype="query">
     <cfargument name="varData" required="no" type="any">
      <CFSET this.pslookupsec = CGI.SCRIPT_NAME>             
        <CFIF IsDefined ("session.usercodeID")>
                <cfquery name="qPageSec" datasource="#application.datasource#">
                    SELECT PS.*, UT.usercodeID
                    FROM dbo.PageSecurity AS PS
                    	INNER JOIN dbo.UserType AS UT
                        ON PS.utID = UT.utID
                    WHERE PS.PagePath = <cfqueryparam value="#TRIM(this.pslookupsec)#" cfsqltype="cf_sql_varchar" maxlength="255">
                </cfquery>
         
                <CFIF qPageSec.recordcount GT 0>
                	  <!--- Get required access level to view this page --->
                    <CFSET this.PageusercodeID = qPageSec.usercodeID>
                <cfelse>
                	<!--- If the page is not in the database then set required access level to 3 --->
                	<CFSET this.PageusercodeID = 3>
                </CFIF>
               <CFIF IsDefined ("session.homewww")>  
                   <CFIF this.PageusercodeID LT session.usercodeID>
                        <cflocation url="#application.memberhomewww#/home/unauthorized.cfm">
                        <cfabort>
                    </CFIF>
                 <cfelse>
                 	<cflocation url="#application.homewww#/?error=nosession">
                    <cfabort>
                </CFIF>
        <cfelse>
        	<cflocation url="#application.homewww#/?error=unauthorized">  
            <cfabort>      
        </CFIF>
     
        <cfreturn qPageSec>
        </cffunction>

  <!---Get Page for security Edit--->
        
        <cffunction access="public" name="GetPages" output="no" returntype="query" verifyclient="no" securejson="false">
            <cfargument name="varData" type="any" required="no">
            <Cfset var qPS = "">
            
            <cfquery name="qPS" datasource="#application.datasource#"> 
                SELECT PS.*, UT.usercodeID, UT.usertype
                FROM dbo.PageSecurity AS PS
                INNER JOIN dbo.UserType AS UT
                	ON PS.utID = UT.utID
                WHERE 1 = 1 
                <CFIF IsDefined ("varData.search") AND IsDefined ("varData.keyword")>
                    <CFIF varData.search IS "Contains">
                        AND (PS.PagePath LIKE <cfqueryparam value="%#varData.keyword#%" cfsqltype="cf_sql_varchar" maxlength="255">)     
                    <CFELSEIF varData.search IS "EQUAL">
                       AND (PS.PagePath = <cfqueryparam value="#varData.keyword#" cfsqltype="cf_sql_varchar" maxlength="255">)
                    <CFELSEIF varData.search IS "BEGINS_WITH">
                       AND (PS.PagePath LIKE <cfqueryparam value="#varData.keyword#%" cfsqltype="cf_sql_varchar" maxlength="255">)
                    <CFELSEIF varData.search IS "ENDS_WITH">
                       AND (PS.PagePath LIKE <cfqueryparam value="%#varData.keyword#" cfsqltype="cf_sql_varchar" maxlength="255">)
                     <cfelseif varData.search is "NOT_EQUAL">
                        AND PS.PagePath <> <cfqueryparam value="#varData.keyword#" cfsqltype="cf_sql_varchar" maxlength="255">)
                    </CFIF>
                </CFIF>
                <CFIF IsDefined ("varData.psID") AND varData.psID IS NOT "">
                    AND PS.psID = <cfqueryparam value="#varData.psID#" cfsqltype="cf_sql_integer">
                </CFIF> 

                ORDER BY PS.PagePath
     
            </cfquery>
                    
            <cfreturn qPS>
        </cffunction>
        
             <!---Delete Page Security--->
        <cffunction access="public" name="DeletePageSecurity" output="no" returntype="void">
           <cfargument name="psID" type="numeric" required="yes">

             <cfquery datasource="#application.datasource#">
                DELETE FROM dbo.PageSecurity
                WHERE dbo.PageSecurity.psID = <cfqueryparam value="#psID#" cfsqltype="cf_sql_integer">
            </cfquery>

    	</cffunction>
        
        <!---Update Page Security--->
        <cffunction access="public" name="UpdatePageSecurity" output="no" returntype="void">
            <cfargument name="formData" type="struct" required="yes">
            
            <cfquery name="updatePS" datasource="#application.datasource#">
                UPDATE dbo.PageSecurity
                SET utID = <cfqueryparam value="#form.utID#" cfsqltype="cf_sql_integer">
                WHERE dbo.PageSecurity.psID = <cfqueryparam value="#form.psID#" cfsqltype="cf_sql_integer">
            </cfquery>
        
        </cffunction> 
        
         <!---Add User Type (User Access Levels) --->
        <cffunction access="public" name="AddUserType" output="no" returntype="boolean" verifyclient="no" securejson="false">
        	<cfargument name="formData" type="struct" required="yes">
            
            <CFSET var dup = "">
            <cfquery name="dup" datasource="#application.datasource#">
            	SELECT usercodeID
                FROM dbo.usertype
                WHERE usertype = <cfqueryparam value="#formData.usertype#" cfsqltype="cf_sql_varchar" maxlength="25">
            </cfquery>
            
            <CFIF dup.recordcount IS 0>
				<cfquery datasource="#application.datasource#">
                	INSERT INTO dbo.usertype
                   		(usertype, usercodeID)
                    VALUES
                     (<cfqueryparam value="#formData.usertype#" cfsqltype="cf_sql_varchar" maxlength="25">, 
                     <cfqueryparam value="#formData.usercodeID#" cfsqltype="cf_sql_integer">)
                </cfquery>
                
            	<CFSET status = "true">
			<cfelse>
            	<CFSET status = "false">
			
			</CFIF>
        
            <cfreturn status>
        </cffunction>
        
              <!---Get User Types by ID--->
        <cffunction access="public" name="GetUserTypesbyID" output="no" returntype="query">
        	<cfargument name="This_utID" type="string" required="yes">
            
            <cfquery name="qUT" datasource="#application.datasource#">
            	SELECT *
                FROM dbo.usertype
                WHERE dbo.usertype.utID = <cfqueryparam value="#This_utID#" cfsqltype="cf_sql_integer"> 
                ORDER BY dbo.usertype.usercodeID
            </cfquery>
        
        	<cfreturn qUT>
        </cffunction>
        
             <!---Get User Types by usercodeID--->
        <cffunction access="public" name="GetUserTypesbyUserCodeID" output="no" returntype="query">
        	<cfargument name="This_usercodeID" type="string" required="yes">
            
            <cfquery name="qUserCodeID" datasource="#application.datasource#">
            	SELECT *
                FROM dbo.usertype
                WHERE dbo.usertype.usercodeID = <cfqueryparam value="#This_usercodeID#" cfsqltype="cf_sql_integer"> 
                ORDER BY dbo.usertype.usercodeID
            </cfquery>
        
        	<cfreturn qUserCodeID>
        </cffunction>
        
                 <!---Get User Types --->
        <cffunction access="public" name="GetUserTypes" output="no" returntype="query">
        	
            <cfquery name="qUT" datasource="#application.datasource#">
            	SELECT *
                FROM dbo.usertype
                WHERE dbo.usertype.usercodeID >= <cfqueryparam value="#session.usercodeID#" cfsqltype="cf_sql_integer"> 
                ORDER BY dbo.usertype.usercodeID
            </cfquery>
        
        	<cfreturn qUT>
        </cffunction>
        
           <!---Delete User Types --->
        <cffunction access="public" name="DeleteUserType" output="no" returntype="void">
            <cfargument name="this_utID" type="numeric" required="yes">
            
            <cfquery datasource="#application.datasource#">
                DELETE FROM dbo.usertype
                WHERE dbo.usertype.utID = <cfqueryparam value="#this_utID#" cfsqltype="cf_sql_integer">
            </cfquery>
            
        
    	</cffunction>

		<!---Update User Access Level--->
        <cffunction access="public" name="UpdateUserAccessLevel" output="no" returntype="boolean">
        	<cfargument name="formData" type="struct" required="yes">
            
            <CFSET var dup = "">
            
            <cfquery name="dup" datasource="#application.datasource#">
            	SELECT usertype
                FROM dbo.usertype
                WHERE dbo.usertype.usertype = <cfqueryparam value="#formData.usertype#" cfsqltype="cf_sql_varchar" maxlength="25"> AND
                		dbo.usertype.utID <> <cfqueryparam value="#formData.utID#" cfsqltype="cf_sql_integer">
            </cfquery>
            
            <CFIF dup.recordcount GT 0>
				<CFSET status = "false">
            <cfelse>
            	<cfquery name="updateUT" datasource="#application.datasource#">
                	UPDATE dbo.usertype
                    SET usertype = <cfqueryparam value="#formData.usertype#" cfsqltype="cf_sql_varchar" maxlength="25">, 
                    	usercodeID = <cfqueryparam value="#formData.usercodeID#" cfsqltype="cf_sql_integer">
                	WHERE dbo.usertype.utID = <cfqueryparam value="#formData.utID#" cfsqltype="cf_sql_integer">
                </cfquery>
				<CFSET status = "true">
			
			</CFIF>
  
        	<cfreturn status>
        </cffunction>
<!--- Get Auditor Information by UserID --->
<cffunction name="GetAuditorInfoByUserID" access="public" output="no" returntype="query">
<cfargument name="IncomingAuditorID" type="numeric" required="yes">

<cfquery name="qAuditorInfo" datasource="#application.datasource#">
SELECT 
	 U.userID
	,U.firstName
	,U.middleName
	,U.lastName
	,U.homePhone
	,U.cellPhone
	,U.address1
	,U.address2
	,U.city
	,U.stateID
	,U.zipcode
	,U.datecreated
	,U.username
	,U.utID
	,U.email
	,U.workphone
	,U.EULA_receipt
	,U.EULA_IP
	,U.EULA_DateTime
	,U.LastName + ', ' + U.FirstName AS FullName
FROM dbo.Users AS U
WHERE U.userID = <cfqueryparam value="#IncomingAuditorID#" cfsqltype="cf_sql_integer">

</cfquery>

<cfreturn qAuditorInfo>
</cffunction>

</cfcomponent>