<cfcomponent namespace="General">

<!--- User stats before delete --->
<cffunction name="UserStatsBeforeDelete" output="no" access="public" returntype="struct">
<cfargument name="userID" required="yes" type="numeric">

<CFSET UserStats.TimesLogin = 0>
<CFSET UserStats.LastDateTimeLogin = "">

<cfquery name="q1" datasource="#application.datasource#">
	SELECT COUNT(userID) AS TimesLogin
    FROM dbo.UserActivity
    WHERE dbo.UserActivity.userID = <cfqueryparam value="#userID#" cfsqltype="cf_sql_integer">
</cfquery>
<CFSET UserStats.TimesLogin = VAL(q1.TimesLogin)>

<cfquery name="q2" datasource="#application.datasource#">
	SELECT MAX(LoginDate) AS LastLoginDate
    FROM dbo.UserActivity
    WHERE dbo.UserActivity.userID = <cfqueryparam value="#userID#" cfsqltype="cf_sql_integer"> 
</cfquery>
<CFSET UserStats.LastDateTimeLogin = q2.LastLoginDate>

	<cfreturn UserStats>
</cffunction>
<!--- Delete User Login Activity Record --->
   <cffunction name="DeleteUserActivityRecord" access="public" returntype="VOID">
   <cfargument name="uaID" required="yes" type="numeric">
    	<cfquery datasource="#application.datasource#">
             DELETE FROM dbo.userActivity
             WHERE dbo.userActivity.uaID = <cfqueryparam value="#uaID#" cfsqltype="cf_sql_integer">
        </cfquery>   
   </cffunction>

<!--- Get User Login Activity --->
   <cffunction name="GetUserLoginActivity" access="public" returntype="query">
   <cfargument name="formData" required="yes" type="struct">
   <CFSET var qUA = "">
   <CFIF formData.BeginDate GT formData.EndDate>
    	<CFSET variables.BDate =  CREATEODBCDATETIME(formData.EndDate & " " & "00" & ":" & "00" & ":" & "00" & " " & "AM")>
        <CFSET variables.EDate = CREATEODBCDATETIME(formData.BeginDate & " " & "23" & ":" & "59" & ":" & "59" & " " & "PM")>
    <cfelse>
    	<CFSET variables.BDate = CREATEODBCDATETIME(formData.BeginDate & " " & "00" & ":" & "00" & ":" & "00" & " " & "AM")>
    	<CFSET variables.EDate = CREATEODBCDATETIME(formData.EndDate & " " & "23" & ":" & "59" & ":" & "59" & " " & "PM")>
    </CFIF>
   
   <cfquery name="qUA" datasource="#application.datasource#">
   		SELECT UA.*, U.firstname, U.lastname, U.username, U.Email
        FROM dbo.Users AS U
        INNER JOIN dbo.UserActivity AS UA
        	ON UA.userID = U.userID 
        
        WHERE 	UA.LoginDate BETWEEN <cfqueryparam value="#variables.BDate#" cfsqltype="cf_sql_timestamp"> AND <cfqueryparam value="#variables.EDate#" cfsqltype="cf_sql_timestamp">
        	   <CFIF formData.Filter1 IS "IP">
               		AND UA.UserIP = <cfqueryparam value="#formData.SearchValue#" cfsqltype="cf_sql_varchar" maxlength="255">
                <cfelseif formData.Filter1 IS "LastName">
                	AND U.lastname = <cfqueryparam value="#formData.SearchValue#" cfsqltype="cf_sql_varchar" maxlength="255">
                <cfelseif formData.Filter1 IS "Username">
                	AND U.username = <cfqueryparam value="#formData.SearchValue#" cfsqltype="cf_sql_varchar" maxlength="255">
               </CFIF>
       ORDER BY UA.LoginDate DESC, U.LastName, U.Firstname        
   </cfquery>

   	<cfreturn qUA/>
   </cffunction>
 

<!--- Purge Financial Information --->
<cffunction name="PurgeFinancialData" output="no" returntype="void">

<CFIF Session.utID IS 1>
<cfquery datasource="#application.datasource#">
    Truncate table CallLogs
    Truncate table Debtor
</cfquery>

</CFIF>

</cffunction>

<!--- Purge User Information --->
<cffunction name="PurgeUserData" output="no" returntype="void">

<CFIF Session.utID IS 1>
<cfquery datasource="#application.datasource#">
    Truncate table UserActivity
    Truncate table NewAccountRegistration
    Truncate table Users
    Truncate table PasswordResetRequest
</cfquery>

</CFIF>

</cffunction>

<!--- Purge Page Security  --->
<cffunction name="PurgePageSecurity" output="no" returntype="void">
<CFIF Session.utID IS 1>
<cfquery datasource="#application.datasource#">
    Truncate table PageSecurity
</cfquery>
</CFIF>
</cffunction>  

<!--- Link Security  --->
<cffunction name="PurgeLinkSecurity" output="no" returntype="void">
<CFIF Session.utID IS 1>
<cfquery datasource="#application.datasource#">
    Truncate table LinkSecuurity
    Truncate table feature_UserAccess
</cfquery>
</CFIF>
</cffunction>  

<!--- Get All Users --->
<cffunction name="GetAllAuditors" access="public" output="no" returntype="query">

<cfquery name="qAuditors" datasource="#application.datasource#">
	SELECT U.UserID, U.FirstName, U.LastName, U.LastName + ' , ' + U.FirstName AS FullName, U.homePhone, U.CellPhone, U.Address1, U.City, U.stateID, U.ZipCode, U.datecreated, U.Username, U.utID, U.Email, IsNULL(S.State,'N/A') AS State
    FROM dbo.Users AS U
    LEFT OUTER JOIN dbo.States AS S ON
    	U.StateID = S.StateID
	LEFT OUTER JOIN dbo.Countries AS C ON
    	S.CountryID = C.CountryID
  	ORDER BY U.LastName, U.FirstName
</cfquery>

	<cfreturn qAuditors>
</cffunction>

<!--- Get Business Demographics --->
<cffunction name="GetBusinessDemographics" access="public" output="no" returntype="query">
<cfargument name="structData" type="struct" required="yes">

<cfquery name="qD" datasource="#application.datasource2#">
	SELECT 
       L.FISCAL_YEAR
      ,L.LICENSEE_NUMBER
      ,L.LICENSEE_CODE
      ,L.LICENSEE_TYPE
      ,L.LICENSEE_NAME
      ,L.BUSINESS_NAME
      ,L.FEIN
      ,L.STATE_TAX_ID
      ,L.MAIN_EMAIL_ADDRESS
      ,L.CONTACT_USER_PROFILE_ID
      ,L.LICENSEE_ADDRESS
      ,L.LICENSEE_CITY
      ,L.LICENSEE_STATE
      ,L.LICENSEE_ZIP
      ,L.LICENSEE_PHONE
      ,L.LICENSEE_FAX
      ,L.BUSINESS_ADDRESS
      ,L.BUSINESS_CITY
      ,L.BUSINESS_STATE
      ,L.BUSINESS_ZIP
      ,L.BUSINESS_PHONE
      ,L.BUSINESS_FAX
      ,L.OWNERSHIP_TYPE
      ,L.CORPORATE_PARENT
      ,L.CREMATORY_ADDRESS
      ,L.CREMATORY_CITY
      ,L.CREMATORY_STATE
      ,L.CREMATORY_ZIP
      ,L.CORPORATE_PARTNER_FIRST_NAME
      ,L.CORPORATE_PARTNER_LAST_NAME
      ,L.CREMATORY_PHONE
      ,L.LICENSEE_COUNTY_CODE
      ,L.ANNAUL_REPORTING_FISCAL_YEAR_END_DATE
      ,L.ANNAUL_REPORTING_DUE_DATE
      ,L.IS_EXTENDED_FLAG
      ,L.ANNAUL_REPORTING_EXTENSTION_DATE
      ,L.ANNAUL_REPORTING_RECEIPT_DATE
      ,L.ANNAUL_REPORTING_POSTAGE_DATE
      ,L.APPLICATION_DEP_DATE
      ,L.APPLICATION_CHECK_NUMBER
      ,L.APPLICATION_FEE
      ,L.APPLICATION_DATE
      ,L.REGISTRATION_FEE
      ,L.REGISTRATION_DEP_DATE
      ,L.REGISTRATION_CHECK_NUMBER
      ,L.REGISTRATION_DATE
      ,L.LICENSEE_STATUS
      ,L.AUDITOR_ID
      ,L.AGREEMENT
      ,L.AGREEMENT_SIGNED_BY
      ,L.AGREEMENT_SIGNED_DATE
      ,L.IS_EXEMPT_FLAG
      ,L.LICENSEE_REVOKED_DATE
      ,L.LICENSEE_CANCELLED_DATE
      ,L.OWNERSHIP_CHANGE
      ,L.RECORD_CREATE_DATE
      ,L.RECORD_CREATE_USER
      ,L.RECORD_UPDATE_DATE
      ,L.RECORD_UPDATE_USER
      ,L.LICENSEE_COUNTRY
      ,L.DATE_ISSUED
      ,L.CORPORATE_SUB_DIVISION
      ,L.EMAIL
      ,L.BANK_TRUSTEE
      ,L.DATE_REMOVED
      ,L.AUDITOR_NAME
      ,L.CONTACT_PERSON_FIRST_NAME
      ,L.CONTACT_PERSON_LAST_NAME
      ,L.CONTACT_PERSON_TITLE
      ,L.CONTACT_PREFIX
      ,L.COUNTY
      ,L.CONTACT_CITY
      ,L.CONTACT_STATE
      ,L.CONTACT_ADDRESS
      ,L.CONTACT_ZIP
      ,L.CONTACT_PHONE
      ,L.DISTRICT_NUMBER
      ,L.CONTRACT_FEE_REPORTABLE
      ,ISNULL(LT.Licensee_Description,'NA') AS Licensee_Description 
  FROM PLACE.dbo.LICENSEE AS L
  	LEFT OUTER JOIN PLACE.dbo.Licensee_Type AS LT
    	ON L.LICENSEE_TYPE = LT.LICENSEE_TYPE_CODE
  WHERE LICENSEE_CODE = <cfqueryparam value="#StructData.DebtorAccountNumber#" cfsqltype="cf_sql_varchar" maxlength="50"> AND
  		Fiscal_Year = <cfqueryparam value="#StructData.FiscalYear#">


</cfquery>

	<Cfreturn qD>
</cffunction>
<!--- Get Licensee Type for Query --->
<cffunction name="getLicenseeTypeForQuery" access="public" returntype="query">
 
    <cfquery name="qLT" datasource="#application.datasource2#">
    	SELECT LT.Licensee_Type_ID, LT.Licensee_Type_Code, LT.Licensee_Description
        FROM Licensee_Type AS LT
       	ORDER BY LT.Licensee_Description
       
    </cfquery>

	<Cfreturn qLT>
</cffunction>

<!--- Get License Type --->
<cffunction name="GetLicenseTypeForCookie" access="public" output="no" returntype="query">
<cfargument name="formData" type="struct" required="yes">

<cfquery name="qLT" datasource="#application.datasource2#">
	SELECT L.LICENSEE_TYPE
      
  FROM PLACE.dbo.LICENSEE AS L
  	LEFT OUTER JOIN PLACE.dbo.Licensee_Type AS LT
    	ON L.LICENSEE_TYPE = LT.LICENSEE_TYPE_CODE
  WHERE LICENSEE_CODE = <cfqueryparam value="#formData.DebtorAccountNumber#" cfsqltype="cf_sql_varchar" maxlength="50"> AND
  		Fiscal_Year = <cfqueryparam value="#formData.FiscalYear#">


</cfquery>

	<Cfreturn qLT>
</cffunction>

<cffunction name="VerifyDefaultAuditorRecordExists" access="public" output="no" returntype="boolean">
<cfargument name="varData" type="struct" required="yes">

<CFSET AuditorRecordCheck = 0>
	<cfquery name="q1" datasource="#application.datasource#">
    	SELECT A.AuditID
        FROM dbo.Audits AS A
        WHERE A.DebtorAccountNumber = <cfqueryparam value="#varData.Cookie_DebtorAccountNumber#" cfsqltype="cf_sql_varchar"> AND
        	  A.FiscalYear = <cfqueryparam value="#varData.Cookie_FiscalYear#" cfsqltype="cf_sql_integer"> AND
              A.AuditorUserID = <cfqueryparam value="#varData.Cookie_AuditorID#" cfsqltype="cf_sql_integer">
    
    </cfquery>
  <CFIF q1.recordcount GT 0>
  	  <CFSET AuditorRecordCheck = 1>
  </CFIF>
	<cfreturn AuditorRecordCheck>
</cffunction>

<cffunction name="initializeAuditorRecord" access="public" returntype="numeric">
<cfargument name="varData" type="struct" required="yes">

	<!--- Verify not already setup --->
	<cfquery name="q1" datasource="#application.datasource#">
    	SELECT A.AuditID
        FROM dbo.Audits AS A
        WHERE A.DebtorAccountNumber = <cfqueryparam value="#varData.Cookie_DebtorAccountNumber#" cfsqltype="cf_sql_varchar"> AND
        	  A.FiscalYear = <cfqueryparam value="#varData.Cookie_FiscalYear#" cfsqltype="cf_sql_integer"> AND
              A.AuditorUserID = <cfqueryparam value="#varData.Cookie_AuditorID#" cfsqltype="cf_sql_integer">
    
    </cfquery>
  <CFIF q1.recordcount IS 0>
      <cfquery name="q2" datasource="#application.datasource#">
         INSERT INTO dbo.Audits
         (DebtorAccountNumber, FiscalYear, AuditorUserID, DateCreated, DateLastEdited, LastEditedByUserID, CreatedByUserID)
         VALUES (
         	<cfqueryparam value="#varData.Cookie_DebtorAccountNumber#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#varData.Cookie_FiscalYear#" cfsqltype="cf_sql_integer">,
            <cfqueryparam value="#varData.Cookie_AuditorID#" cfsqltype="cf_sql_integer">,
            <cfqueryparam value="#NOW()#" cfsqltype="cf_sql_timestamp">,
            <cfqueryparam value="#NOW()#" cfsqltype="cf_sql_timestamp">,
            <cfqueryparam value="#Session.userID#" cfsqltype="cf_sql_integer">,
         	<cfqueryparam value="#Session.userID#" cfsqltype="cf_sql_integer">
         )
      	 SELECT SCOPE_IDENTITY() AS AuditID
      
      </cfquery>
      <CFSET SetAuditID = q2.AuditID>	
   <cfelse>  
     	<CFSET SetAuditID = q1.AuditID>
  </CFIF>
	<cfreturn SetAuditID>
</cffunction>
<!--- Get AuditID --->
<cffunction name="GetAuditID" access="public" output="no" returntype="boolean">
<cfargument name="formData" type="struct" required="yes">

<CFSET ThisAuditID = 0>
	<cfquery name="q1" datasource="#application.datasource#">
    	SELECT A.AuditID
        FROM dbo.Audits AS A
        WHERE A.DebtorAccountNumber = <cfqueryparam value="#formData.DebtorAccountNumber#" cfsqltype="cf_sql_varchar"> AND
        	  A.FiscalYear = <cfqueryparam value="#formData.FiscalYear#" cfsqltype="cf_sql_integer"> AND
              A.AuditorUserID = <cfqueryparam value="#formData.userID#" cfsqltype="cf_sql_integer">
    
    </cfquery>
  <CFIF q1.recordcount IS 0>
  	  <CFSET ThisAuditID = 1>
   <cfelse>
   	 <CFSET ThisAuditID = q1.AuditID>
  </CFIF>
	<cfreturn ThisAuditID>
</cffunction>

</cfcomponent>