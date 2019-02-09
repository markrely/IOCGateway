<cfcomponent displayname="User">


<!--- Search Users for Edit --->
<cffunction name="SearchUserForEdit" access="public" returntype="query">
<cfargument name="formData" required="yes" type="struct">

<CFIF formData.focus IS "LastName"> 
	<CFSET ORDERBY = "dbo.users.LastName, dbo.users.FirstName">
  <cfelseif formData.focus IS "username">
    <CFSET ORDERBY = "dbo.users.username">
  <cfelseif formData.focus IS "zip">
    <CFSET ORDERBY = "dbo.users.zipcode, dbo.users.LastName, dbo.users.FirstName,">
  <cfelseif formData.focus IS "email">
    <CFSET ORDERBY = "dbo.users.email, dbo.users.LastName">  
  <cfelse>
    <CFSET ORDERBY = "dbo.users.LastName, dbo.users.FirstName, dbo.states.State">
</cfif>



<cfquery name="qU" datasource="#application.datasource#">
	SELECT dbo.users.*, IsNULL(dbo.States.state,'No match found') AS state, IsNULL(dbo.usertype.usertype,'Lowest') AS usertype, IsNULL(dbo.usertype.usercodeID, 20) AS usercodeID
    FROM dbo.users
    	LEFT OUTER JOIN dbo.States
        	ON dbo.users.stateID = dbo.states.stateID
         LEFT OUTER JOIN dbo.usertype
         	ON dbo.users.utID = dbo.usertype.utID
     
    WHERE 1 = 1
     
         
          <CFIF formData.utID IS NOT 0>
           		AND dbo.Users.utID = <cfqueryparam value="#formData.utID#" cfsqltype="cf_sql_integer">
          </CFIF>
    	  <CFIF formData.search IS "Contains">
            	<CFIF formdata.focus is "LastName"> 
                	AND
                	(dbo.Users.LastName LIKE <cfqueryparam value="%#formData.keyword#%" cfsqltype="cf_sql_varchar" maxlength="55">)
                <cfelseif formdata.focus is "username">
                	AND
                    (dbo.Users.username LIKE <cfqueryparam value="%#formData.keyword#%" cfsqltype="cf_sql_varchar" maxlength="255">)
               <cfelseif formdata.focus is "email">
                	AND
                    (dbo.Users.email LIKE <cfqueryparam value="%#formData.keyword#%" cfsqltype="cf_sql_varchar" maxlength="255">)     
                <cfelseif formdata.focus is "ZipCode">
                	AND
                    (dbo.Users.ZipCode LIKE <cfqueryparam value="%#formData.keyword#%" cfsqltype="cf_sql_varchar" maxlength="15">)
                <cfelseif formData.focus IS "state">
                	AND
                    (dbo.states.state LIKE <cfqueryparam value="%#formData.keyword#%" cfsqltype="cf_sql_varchar" maxlength="55">)
				</CFIF>
			<CFELSEIF formData.search IS "EQUAL">
              <CFIF formdata.focus is "LastName"> 
                	AND
                	(dbo.Users.LastName = <cfqueryparam value="#formData.keyword#" cfsqltype="cf_sql_varchar" maxlength="55">)
                <cfelseif formdata.focus is "username">
                	AND
                    (dbo.Users.username = <cfqueryparam value="#formData.keyword#" cfsqltype="cf_sql_varchar" maxlength="255">)
               <cfelseif formdata.focus is "email">
                	AND
                    (dbo.Users.email LIKE <cfqueryparam value="#formData.keyword#" cfsqltype="cf_sql_varchar" maxlength="255">)  
                <cfelseif formdata.focus is "ZipCode">
                	AND
                    (dbo.Users.ZipCode = <cfqueryparam value="#formData.keyword#" cfsqltype="cf_sql_varchar" maxlength="15">)
                <cfelseif formData.focus IS "state">
                	AND
                    (dbo.states.state = <cfqueryparam value="#formData.keyword#" cfsqltype="cf_sql_varchar" maxlength="55">)
				</CFIF>  
			<CFELSEIF formData.search IS "BEGINS_WITH">
				 <CFIF formdata.focus is "LastName"> 
                	AND
                	(dbo.Users.LastName LIKE <cfqueryparam value="#formData.keyword#%" cfsqltype="cf_sql_varchar" maxlength="55">)
                <cfelseif formdata.focus is "username">
                	AND
                    (dbo.Users.username LIKE <cfqueryparam value="#formData.keyword#%" cfsqltype="cf_sql_varchar" maxlength="255">)
                <cfelseif formdata.focus is "email">
                	AND
                    (dbo.Users.email LIKE <cfqueryparam value="#formData.keyword#%" cfsqltype="cf_sql_varchar" maxlength="255">)  
                <cfelseif formdata.focus is "ZipCode">
                	AND
                    (dbo.Users.ZipCode LIKE <cfqueryparam value="#formData.keyword#%" cfsqltype="cf_sql_varchar" maxlength="15">)
                <cfelseif formData.focus IS "state">
                	AND
                    (dbo.states.state LIKE <cfqueryparam value="#formData.keyword#%" cfsqltype="cf_sql_varchar" maxlength="55">)
				</CFIF>   
			<CFELSEIF formData.search IS "ENDS_WITH">
				 <CFIF formdata.focus is "LastName"> 
                	AND
                	(dbo.Users.LastName LIKE <cfqueryparam value="%#formData.keyword#" cfsqltype="cf_sql_varchar" maxlength="55">)
                <cfelseif formdata.focus is "username">
                	AND
                    (dbo.Users.username LIKE <cfqueryparam value="%#formData.keyword#" cfsqltype="cf_sql_varchar" maxlength="255">)
                <cfelseif formdata.focus is "email">
                	AND
                    (dbo.Users.email LIKE <cfqueryparam value="%#formData.keyword#" cfsqltype="cf_sql_varchar" maxlength="255">)  
                <cfelseif formdata.focus is "ZipCode">
                	AND
                    (dbo.Users.ZipCode LIKE <cfqueryparam value="%#formData.keyword#" cfsqltype="cf_sql_varchar" maxlength="15">)
                <cfelseif formData.focus IS "state">
                	AND
                    (dbo.states.state LIKE <cfqueryparam value="%#formData.keyword#" cfsqltype="cf_sql_varchar" maxlength="55">)
				</CFIF>   
			<cfelseif formData.search is "NOT_EQUAL">
				 <CFIF formdata.focus is "LastName"> 
                	AND
                	(dbo.Users.LastName <> <cfqueryparam value="#formData.keyword#" cfsqltype="cf_sql_varchar" maxlength="55">)
                <cfelseif formdata.focus is "username">
                	AND
                    (dbo.Users.username <> <cfqueryparam value="#formData.keyword#" cfsqltype="cf_sql_varchar" maxlength="255">)
                <cfelseif formdata.focus is "email">
                	AND
                    (dbo.Users.email <> <cfqueryparam value="#formData.keyword#" cfsqltype="cf_sql_varchar" maxlength="255">)  
                <cfelseif formdata.focus is "ZipCode">
                	AND
                    (dbo.Users.ZipCode <> <cfqueryparam value="#formData.keyword#" cfsqltype="cf_sql_varchar" maxlength="15">)
                <cfelseif formData.focus IS "state">
                	AND
                    (dbo.states.state <> <cfqueryparam value="#formData.keyword#" cfsqltype="cf_sql_varchar" maxlength="55">)
				</CFIF>  
			
			</CFIF>

     ORDER BY #ORDERBY#    


</cfquery>

<Cfreturn qU>
</cffunction>
<!--- Get User by UserID --->
<cffunction name="GetUserbyUserID" access="public" output="no" returntype="query">
<cfargument name="userID" required="yes" type="numeric">

<cfquery name="qU1" datasource="#application.datasource#">
	SELECT U.*, U.stateID, IsNULL(S.state,'No match found') AS state, IsNULL(UT.usertype,'Lowest') AS usertype, IsNULL(UT.usercodeID, 20) AS usercodeID, IsNULL(C.countryID,0) AS countryID, IsNULL(C.country,'None selected') AS Country
    FROM dbo.users AS U
    	LEFT OUTER JOIN dbo.States AS S
        	ON U.stateID = S.stateID
         LEFT OUTER JOIN dbo.usertype AS UT
         	ON U.utID = UT.utID
	    LEFT OUTER JOIN dbo.countries AS C
        	ON S.countryID = C.countryID

    WHERE 	U.userID = <cfqueryparam value="#userID#" cfsqltype="cf_sql_integer">
</cfquery>

	<cfreturn qU1>
</cffunction>
<!--- Edit User by userID --->
<cffunction name="EditUserbyUserID" access="public" returntype="struct">
<cfargument name="formData" required="yes" type="struct">

	<CFSET EditData.Error = 0>
   
   
      <!--- Check if email address is already in use --->  

	 <cfquery name="q2" datasource="#application.datasource#">
     	 SELECT *
         FROM dbo.Users
         WHERE 	dbo.Users.userID <> <cfqueryparam value="#formData.userID#" cfsqltype="cf_sql_integer"> AND
         		dbo.Users.Email = <cfqueryparam value="#formData.Email#" cfsqltype="cf_sql_varchar" maxlength="255"> 
                <!--- temporarily disable this by making the utID = 0 ... remove this after all duplicate emails are removed---> AND dbo.Users.utID = '0'
                
     </cfquery>
         
 
   
     <!--- If email address is already in use set error = 2; however if both username and email are in use then error will equal 3 --->
     <CFIF q2.recordcount GT 0>
     	<CFSET EditData.Error = EditData.Error + 2>
     </CFIF>
   
     <CFIF EditData.Error IS 0>
 
      <cfquery datasource="#application.datasource#">
        	UPDATE dbo.Users
            SET firstName = <cfqueryparam value="#formData.firstName#" cfsqltype="CF_SQL_VARCHAR" maxlength="75">, 
            	middleName = <cfqueryparam value="#LEFT(formData.middleName, 75)#" cfsqltype="CF_SQL_VARCHAR" maxlength="75">, 
                LastName = <cfqueryparam value="#formData.LastName#" cfsqltype="CF_SQL_VARCHAR" maxlength="75">, 
                Address1 = <cfqueryparam value="#formData.Address1#" cfsqltype="CF_SQL_VARCHAR" maxlength="255">, 
                Address2 = <cfqueryparam value="#formData.Address2#" cfsqltype="CF_SQL_VARCHAR" maxlength="255">, 
                City = <cfqueryparam value="#formData.City#" cfsqltype="CF_SQL_VARCHAR" maxlength="255">, 
                StateID = <cfqueryparam value="#formData.StateID#" cfsqltype="CF_SQL_INTEGER">,
                ZipCode = <cfqueryparam value="#formData.ZipCode#" cfsqltype="CF_SQL_VARCHAR" maxlength="25">, 
                email = <cfqueryparam value="#formData.Email#" cfsqltype="cf_sql_varchar" maxlength="255">, 
                utID = <cfqueryparam value="#formdata.utID#" cfsqltype="CF_SQL_INTEGER">,
                homePhone = <cfqueryparam value="#formData.homePhone#" cfsqltype="cf_sql_varchar" maxlength="50">,
                workPhone = <cfqueryparam value="#formData.workPhone#" cfsqltype="cf_sql_varchar" maxlength="50">,
                cellPhone = <cfqueryparam value="#formData.cellPhone#" cfsqltype="cf_sql_varchar" maxlength="50">,
                EULA_receipt = <cfqueryparam value="#formData.EULA_receipt#" cfsqltype="cf_sql_varchar" maxlength="3">,
                EULA_IP = <CFIF formData.EULA_receipt IS "No">''<cfelse><cfqueryparam value="#formData.EULA_IP#" cfsqltype="cf_sql_varchar" maxlength="25"></CFIF>,
                EULA_DateTime = 
							<CFIF formData.EULA_Date IS ""> 
									NULL
                            <cfelseif formData.EULA_receipt IS "No">
                            		NULL        
							<cfelseif formData.EULA_Date IS formData.OriginalEULA_Date>
        							'#formData.OriginalEULA_DateTime#'
        					<cfelse>
        						<CFSET variables.DateTime = DATEFORMAT(formData.EULA_Date, "yyyy-mm-dd")& " " & "00:00:00.000">
                                   '#variables.DateTime#'
        					</CFIF>

    	   WHERE dbo.Users.userID = <cfqueryparam value="#formData.userID#" cfsqltype="cf_sql_integer">
        </cfquery> 
     </cfif>   

<cfreturn EditData>        

</cffunction>
<!--- Delete User --->
  <cffunction name="DeleteUserbyUserID" access="public" output="no" returntype="void">
    <cfargument name="formData" type="struct" required="yes">
    	 <!--- Delete Feautre UserAccess --->
        
        <cfquery datasource="#application.datasource#">
            DELETE FROM dbo.feature_UserAccess
            WHERE userID = <cfqueryparam value="#formData.userID#" cfsqltype="cf_sql_integer">
        </cfquery>
        <!--- Delete user activity --->
        
        <cfquery datasource="#application.datasource#">
            DELETE FROM dbo.UserActivity
            WHERE dbo.UserActivity.userID = <cfqueryparam value="#formData.userID#" cfsqltype="cf_sql_integer">
        </cfquery>
    
   		<!--- Delete user from users table --->
        <cfquery datasource="#application.datasource#">
            DELETE FROM dbo.users
            WHERE dbo.users.userID = '#formData.userID#'
        </cfquery>
       
  </cffunction>
  

</cfcomponent>