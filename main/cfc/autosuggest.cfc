<cfcomponent>
<cffunction name="getAutoSuggest" access="remote" returntype="any">
<cfargument name="searchPhrase" type="string" required="yes">
  <CFSET  ResultsArray = ArrayNew(1)>
    <cfquery name="q1" datasource="#application.datasource#">
    	SELECT userID, LastName, FirstName
        FROM dbo.Users
        WHERE LastName LIKE <cfqueryparam value="%#searchPhrase#%" cfsqltype="cf_sql_varchar" maxlength="255"> OR
        	  FirstName LIKE <cfqueryparam value="%#searchPhrase#%" cfsqltype="cf_sql_varchar" maxlength="255">
    </cfquery>

<cfloop query="q1">
	<CFSET SearchResults = StructNew()>
    <CFSET SearchResults.key = q1.userID>
    <CFSET SearchResults.ShortDisplay = q1.LastName  & ", " & q1.FirstName>
    <CFSET SearchResults.DescriptionName = "Full Name:" & ' ' & q1.FirstName & ' ' & q1.LastName>
    <CFSET ArrayAppend(ResultsArray,SearchResults)>
</cfloop>

	<Cfreturn ResultsArray>
</cffunction>

<cffunction name="getDebtorAndInstrumentViaBind" access="remote" returntype="array">
<cfargument name="FiscalYear" type="string" required="yes">
<cfargument name="SystemCode" type="string" required="yes">
<cfargument name="SearchPhrase" type="string" required="yes">
  <CFSET  ResultsArray = ArrayNew(1)>
    <cfquery name="q1" datasource="#application.datasource#">
    	SELECT D.DebtorID, DD.Debt_ID, D.DebtorAccountNumber, D.DebtorName + ' ' + D.BusinessName + ' ' + DD.Instrument AS DebtorInfo
        FROM dbo.Debtor_Debt AS DD
        	INNER JOIN dbo.Debtor AS D
            	ON DD.DebtorID = D.DebtorID
        WHERE DD.DebtStatus = 'Y' AND
        	  DD.FiscalYear = <cfqueryparam value="#FiscalYear#" cfsqltype="cf_sql_varchar" maxlength="4"> AND
        	  DD.DebtSystemCode = <cfqueryparam value="#SystemCode#" cfsqltype="cf_sql_varchar" maxlength="2"> AND
              (D.DebtorName LIKE <cfqueryparam value="%#SearchPhrase#%" cfsqltype="cf_sql_varchar" maxlength="255"> OR
        	  D.BusinessName LIKE <cfqueryparam value="%#SearchPhrase#%" cfsqltype="cf_sql_varchar" maxlength="255">)
    </cfquery>


<cfloop query="q1">
    <cfset ContainerStruct = StructNew() />
    <cfset ContainerStruct["label"] = q1.DebtorInfo />
    <cfset ContainerStruct["value"] = q1.Debt_ID />
    <cfset ArrayAppend(ResultsArray,ContainerStruct) />
</cfloop>

	<Cfreturn ResultsArray>
</cffunction>

<!--- Get Instrument  --->
<cffunction name="getInstrumentViaBind" access="remote">
<cfargument name="FiscalYear" type="string" required="yes">
<cfargument name="SystemCode" type="string" required="yes">
<cfargument name="DebtorID" type="numeric" required="yes">
<cfargument name="qDebt_ID" type="numeric" required="no">
<CFSET var arDebt_ID = "">
<CFSET var q1 = "">
<CFSET var arDebt_ID = ArrayNew(2)>
    <cfquery name="q1" datasource="#application.datasource#">
    	SELECT DD.Debt_ID, DD.Instrument
        FROM dbo.Debtor_Debt AS DD

        WHERE DD.DebtStatus = 'Y' AND
        	  DD.FiscalYear = <cfqueryparam value="#FiscalYear#" cfsqltype="cf_sql_varchar" maxlength="4"> AND
        	  DD.DebtSystemCode = <cfqueryparam value="#SystemCode#" cfsqltype="cf_sql_varchar" maxlength="2"> AND
              DD.DebtorID = <cfqueryparam value="#DebtorID#" cfsqltype="cf_sql_integer"> AND
              DD.DebtApproval = 'Yes'
    </cfquery>
  <cfoutput>
  <select id="Instrument" name="Instrument" class="form-control">
   <option value="" selected >Select a Instrument</option>
   <cfloop query="q1">
   <CFIF IsDefined("qDebt_ID") and q1.Debt_ID IS qDebt_ID>
   		<option value="#q1.Debt_ID#" selected>#q1.Instrument#</option>
   	<cfelse>
    	<option value="#q1.Debt_ID#">#q1.Instrument#</option>
    </CFIF>
   </cfloop>
  </select>
 </cfoutput>

<!--- <cfloop index="i" from="1" to="#q1.recordcount#">
	<CFSET arDebt_ID[i][1] = q1.Debt_ID[i]>
    <CFSET arDebt_ID[i][2] = q1.Instrument[i]>
</cfloop> --->

	<!--- <Cfreturn arDebt_ID> --->
</cffunction>



<cffunction name="getDebtorViaBind" access="remote" returntype="array">
<cfargument name="term" type="string" required="yes">

  <CFSET  ArDebtorID = ArrayNew(1)>
  
  
     <!--- CARRS DATABASE --->
    <!--- <cfquery name="q1" datasource="#application.datasource3#">
    	SELECT D.DebtorID, D.DebtorName + ' ' + D.BusinessName + ' ------ ' +  D.DebtorAccountNumber AS DebtorInfo, D.DebtorAccountNumber
        FROM dbo.Debtor AS D
        WHERE D.DebtorName LIKE <cfqueryparam value="%#term#%" cfsqltype="cf_sql_varchar" maxlength="255"> OR
        	  D.BusinessName LIKE <cfqueryparam value="%#term#%" cfsqltype="cf_sql_varchar" maxlength="255"> OR
              D.DebtorAccountNumber LIKE <cfqueryparam value="%#term#%" cfsqltype="cf_sql_varchar" maxlength="255">
    </cfquery> --->
    
    
    <!--- PLACE DATABASE --->
	<cfquery name="q1" datasource="#application.datasource2#">
    	SELECT ISNULL(LT.Licensee_Description,'NA') + ' -- ' + L.Licensee_Name  + ' ------ ' +  L.LICENSEE_CODE AS DebtorInfo, L.LICENSEE_CODE AS DebtorAccountNumber, L.LICENSEE_CODE, LT.Licensee_Description
        FROM dbo.Licensee AS L
        	LEFT OUTER JOIN dbo.Licensee_Type AS LT
            	ON L.LICENSEE_TYPE = LT.LICENSEE_TYPE_CODE
        
        WHERE L.Licensee_Name LIKE <cfqueryparam value="%#term#%" cfsqltype="cf_sql_varchar" maxlength="255"> OR
              L.LICENSEE_CODE LIKE <cfqueryparam value="%#term#%" cfsqltype="cf_sql_varchar" maxlength="255">
        GROUP BY L.LICENSEE_CODE, L.Licensee_Name, LT.Licensee_Description
        ORDER BY LT.Licensee_Description, L.Licensee_Name, L.LICENSEE_CODE
    </cfquery>

<cfloop query="q1">
    <cfset ContainerStruct = StructNew() />
    <cfset ContainerStruct["label"] = q1.DebtorInfo />
    <cfset ContainerStruct["value"] = q1.DebtorAccountNumber /> 
    <!--- <cfset ContainerStruct["value"] = q1.DebtorID /> --->
    <cfset ArrayAppend(ArDebtorID,ContainerStruct) />
</cfloop>

	<Cfreturn ArDebtorID>
</cffunction>
<!--- Get Binded System Code --->
<cffunction access="remote" name="qSystemCodesPerDebtorIDViaBind">
<cfargument name="DebtorID" type="numeric">
<cfargument name="qSystemCode" type="string">

<!--- <CFSET var ArSC = "">
<CFSET var q1 = "">
<CFSET var ArSC = ArrayNew(2)> --->

<cfquery name="q1" datasource="#application.datasource#">

    SELECT Distinct(DD.DebtSystemCode) AS SystemCode, SI.SystemCode + ' --- ' + SI.SystemCodeName AS FullSystemCodeName
     FROM dbo.Debtor_Debt AS DD
     	INNER JOIN dbo.SystemInput AS SI
        	ON DD.DebtSystemCode = SI.SystemCode
     WHERE DD.DebtorID = <cfqueryparam value="#DebtorID#" cfsqltype="cf_sql_integer"> AND
     	 DD.DebtStatus = 'Y'

	ORDER BY DD.DebtSystemCode
</cfquery>

  <select id="SystemCode" name="SystemCode" class="form-control">
		<option value="" selected>Select a System Code</option>
    <cfoutput query="q1">
		 <CFIF IsDefined ("qSystemCode") AND q1.SystemCode EQ qSystemCode>
           <option value="#q1.SystemCode#" selected>#q1.FullSystemCodeName#</option>
         <cfelse>
          <option value="#q1.SystemCode#">#q1.FullSystemCodeName#</option>
         </CFIF>
      </cfoutput>
 </select>



<!--- <cfloop index="i" from="1" to="#q1.recordcount#">
	<CFSET ArSC[i][1] = q1.SystemCode[i]>
    <CFSET ArSC[i][2] = q1.FullSystemCodeName[i]>
</cfloop>
 --->
</cffunction>




 <!--- Year Table --->
<cffunction access="remote" name="getDebtFiscalYearsViaBind" returntype="any">
<cfargument name="SystemCode" type="string" required="yes">
<cfargument name="DebtorID" type="numeric" required="yes">
<cfargument name="qFiscalYear" type="string" required="no">
<CFSET var ArYear = "">
<CFSET var q1 = "">
<CFSET var ArYear = ArrayNew(2)>


<cfquery name="q1" datasource="#application.datasource#">
	SELECT Distinct(FiscalYear) AS FiscalYear
    FROM dbo.Debtor_Debt
    WHERE DebtSystemCode = <cfqueryparam value="#SystemCode#" cfsqltype="cf_sql_varchar" maxlength="3"> AND
    	  DebtorID = <cfqueryparam value="#DebtorID#" cfsqltype="cf_sql_integer"> AND
          DebtApproval = 'Yes' AND
          DebtStatus = 'Y'
</cfquery>



<cfoutput>
  <select id="FiscalYear" name="FiscalYear" class="form-control">
   <option value="" selected>Select Fiscal Year</option>
   <cfloop query="q1">
   <CFIF IsDefined("qFiscalYear") and q1.FiscalYear IS qFiscalYear>
   		<option value="#q1.FiscalYear#" selected>#q1.FiscalYear#</option>
   		<cfelse>
    	<option value="#q1.FiscalYear#">#q1.FiscalYear#</option>
    </CFIF>
   </cfloop>
  </select>
 </cfoutput>

  </cffunction>

<!--- Get Fiscal Years --->
<cffunction name="GetAllFiscalYearsPerAccountNumber" access="remote" returntype="array">
<cfargument name="DebtorAccountNumber" type="string" required="yes">

<CFSET var ArFY = "">
<CFSET var q1 = "">
<CFSET NextYear = DateFormat(DateAdd('y',1,NOW()), "yyyy")>
<CFSET var ArFY = ArrayNew(2)>
<CFIF LEN(DebtorAccountNumber) GT 0>

	<!--- CARRS DATABASE --->
    <!--- <cfquery name="q1" datasource="#application.datasource3#">
        SELECT Distinct(DD.FiscalYear) AS FY
        FROM dbo.Debtor_Debt AS DD
          INNER JOIN dbo.Debtor AS D
            ON DD.DebtorID = D.DebtorID
        WHERE D.DebtorAccountNumber = <cfqueryparam value="#DebtorAccountNumber#" cfsqltype="cf_sql_varchar" maxlength="50"> AND
        	  IsNULL(D.PlaceDebtor,0) = <cfqueryparam value="1">
        
        ORDER BY FY DESC
    </cfquery> --->
    
    <!--- PLACE DATABASE --->
    <cfquery name="q1" datasource="#application.datasource2#">
    	SELECT DISTINCT(L.Fiscal_Year) AS FY
        FROM dbo.Licensee AS L
        WHERE L.LICENSEE_CODE = <cfqueryparam value="#DebtorAccountNumber#" cfsqltype="cf_sql_varchar" maxlength="50">
        GROUP BY L.LICENSEE_CODE, L.Fiscal_Year
    </cfquery>

    
<cfelse>
	<CFSET q1 = QueryNew("FY")>
    <CFSET QueryAddRow(q1) />
  	<CFSET QuerySetCell(q1, "FY", DATEFORMAT(NOW(), "yyyy")) /> 
</CFIF>
<cfloop index="i" from="1" to="#q1.recordcount#">
	<CFSET ArFY[i][1] = q1.FY[i]>
    <CFSET ArFY[i][2] = q1.FY[i]>
</cfloop>
   <cfreturn ArFY>
</cffunction>
<!--- Get Licensee Type for  Autoselect --->
<cffunction name="getLicenseeType" access="remote" returntype="array">

  <CFSET  ResultsArray = ArrayNew(2)>
    <cfquery name="q1" datasource="#application.datasource2#">
    	SELECT LT.Licensee_Type_ID, LT.Licensee_Type_Code, LT.Licensee_Description
        FROM Licensee_Type AS LT
       	ORDER BY LT.Licensee_Description
       
    </cfquery>


<cfloop query="q1">
	<CFSET ResultsArray[q1.currentrow][1] = q1.Licensee_Type_Code>
    <CFSET ResultsArray[q1.currentrow][2] = q1.Licensee_Description>
</cfloop>

	<Cfreturn ResultsArray>
</cffunction>

</cfcomponent>