<cfcomponent>
<cffunction name="GetAuditInfo" access="public" output="no" returntype="query">
<cfargument name="IncomingAuditID" type="numeric" required="yes">

<cfquery name="qAudit" datasource="#application.datasource#">
  SELECT   A.AuditID
          ,A.DebtorAccountNumber
          ,A.FiscalYear
          ,A.AuditorUserID
          ,A.AuditDate
          ,A.Findings
          ,A.FindingsDueDate
          ,A.FeeSlip
          ,A.FeeAmount
          ,A.FeeCollected
          ,A.EntryDate
          ,A.DateCreated
          ,A.DateLastEdited
          ,A.LastEditedByUserID
          ,A.CreatedByUserID
		  ,IsNULL(U.FirstName,'N/A') AS FirstName
          ,U.MiddleName
          ,IsNULL(U.LastName, 'N/A') AS LastName
          ,IsNULL(U.LastName,'N/A') + ', ' + IsNULL(U.FirstName,'N/A') AS FullName
   FROM dbo.Audits AS A
   	  LEFT OUTER JOIN dbo.Users AS U
      	ON A.AuditorUserID = U.userID 
   WHERE A.AuditID = <cfqueryparam value="#IncomingAuditID#" cfsqltype="cf_sql_integer">

</cfquery>
  <cfreturn qAudit>
</cffunction>
<!--- Updated Audit Record --->
<cffunction name="UpdateAuditRecord" access="public" returntype="boolean">
<cfargument name="formData" type="struct" required="yes">
<!--- Status is for future use when there is some sort of validation that will be needed.  For example comparing the FeeAmount to FeeCollected?  --->
<CFSET Status = false>

<CFIF IsDefined("formData.Findings")>
	<CFSET SetFindings = 1>
<cfelse>
	<CFSET SetFindings = 0>
</CFIF>


<cfquery datasource="#application.datasource#">
	UPDATE dbo.Audits
    SET AuditorUserID = <cfqueryparam value="#formData.AuditorUserID#" cfsqltype="cf_sql_integer">,
    	Findings = <cfqueryparam value="#SetFindings#" cfsqltype="cf_sql_bit">,
        FindingsDueDate = <cfqueryparam value="#formData.FindingsDueDate#" cfsqltype="cf_sql_date">,
        FeeSlip = <cfqueryparam value="#formData.FeeSlip#" cfsqltype="cf_sql_varchar" maxlength="10">,
        FeeAmount = <cfqueryparam value="#VAL(formData.FeeAmount)#" cfsqltype="cf_sql_money">,
        FeeCollected = <cfqueryparam value="#VAL(formData.FeeCollected)#" cfsqltype="cf_sql_money">,
        AuditDate = <cfqueryparam value="#formData.AuditDate#" cfsqltype="cf_sql_date">,
        DateLastEdited = <cfqueryparam value="#NOW()#" cfsqltype="cf_sql_timestamp">,
        LastEditedByUserID = <cfqueryparam value="#Session.userID#" cfsqltype="cf_sql_integer">
    WHERE AuditID = <cfqueryparam value="#formData.AuditID#" cfsqltype="CF_SQL_INTEGER">
</cfquery>
<CFSET Status = true>
	<Cfreturn Status>
</cffunction>

<!--- Verify if AuditID is in use  --->
<cffunction name="VerifyAuditIDInUse" access="public" output="no" returntype="boolean">
<cfargument name="IncomingAuditID" type="numeric" required="yes">

<cfquery name="q1" datasource="#application.datasource#">
	SELECT Q.AuditID
    FROM Questionnaire AS Q
    WHERE Q.AuditID = <cfqueryparam value="#IncomingAuditID#" cfsqltype="cf_sql_integer">
   
   UNION 
   
    SELECT AF.AuditID
    FROM dbo.AuditFindings AS AF
    WHERE AF.AuditID = <cfqueryparam value="#IncomingAuditID#" cfsqltype="cf_sql_integer">
    
   UNION 
   
    SELECT AFV.AuditID
    FROM dbo.AuditFundVault AS AFV
    WHERE AFV.AuditID = <cfqueryparam value="#IncomingAuditID#" cfsqltype="cf_sql_integer"> 
    
    UNION 
   
    SELECT CA.AuditID
    FROM dbo.CemeteryAssets AS CA
    WHERE CA.AuditID = <cfqueryparam value="#IncomingAuditID#" cfsqltype="cf_sql_integer"> 
    
    UNION 
   
    SELECT CCF.AuditID
    FROM dbo.CemeteryCareFund AS CCF
    WHERE CCF.AuditID = <cfqueryparam value="#IncomingAuditID#" cfsqltype="cf_sql_integer"> 
    
    UNION 
   
    SELECT AN.AuditID
    FROM dbo.AuditNotes AS AN
    WHERE AN.AuditID = <cfqueryparam value="#IncomingAuditID#" cfsqltype="cf_sql_integer"> 

</cfquery>
<CFIF q1.recordcount GT 0>
	<CFSET AuditIDExists = true>
<cfelse>
	<CFSET AuditIDExists = false>
</CFIF>
	<cfreturn AuditIDExists>
</cffunction>
<!--- Record Type Selected to Delete --->
<cffunction name="GetRecordTypeSelectedToDelete" access="public" output="no" returntype="struct">
<cfargument name="reference" type="string" required="yes">
<!--- Reset Workpaper and Description to blank --->
<CFSET DeleteOutputs.Workpaper = "">
<CFSET DeleteOutputs.Description = "">
<!--- Fee Slip/Audit Info --->
<CFIF reference IS "p1">
	<CFSET DeleteOutputs.Workpaper = "Fee Slip/Audit Info">
	<CFSET DeleteOutputs.Description = "This will delete the Audit Info record along with all the child records (this includes: Questinnaire, Audit Findings, Net Assets, Care Fund, 30 Day Rule Test, ARL, Confirmation Letter, Proof of Cash and Inv Rec, Analysis Allocated Amsts, Notes, Table of Contents, etc..">
<cfelseif reference IS "p2">
	<CFSET DeleteOutputs.Workpaper = "Questionnaire">
	<CFSET DeleteOutputs.Description = "This will delete only the questionnaire record">
<cfelseif reference IS "p3">
	<CFSET DeleteOutputs.Workpaper = "Audit Finding - PAF/NAF">
	<CFSET DeleteOutputs.Description = "This will delete only the selected Audit Finding Record">    
</cfif>
  <cfreturn DeleteOutputs>
</cffunction>
<!--- Delete Worksheet Data --->
<cffunction name="DeleteWorksheetRecords" access="public" output="no" returntype="void">
<cfargument name="formData" type="struct" required="yes">

<!--- Delete Audit Worksheet --->
<CFIF formData.reference IS "p1">
<cfquery datasource="#application.datasource#">
	DELETE FROM dbo.Audits
    WHERE AuditID = <cfqueryparam value="#formData.ID#" cfsqltype="cf_sql_integer">
    
    DELETE FROM dbo.AuditFindings
    WHERE AuditID = <cfqueryparam value="#formData.ID#" cfsqltype="cf_sql_integer">
    
    DELETE FROM dbo.AuditFundVault
    WHERE AuditID = <cfqueryparam value="#formData.ID#" cfsqltype="cf_sql_integer">
    
    DELETE FROM dbo.AuditNotes
    WHERE AuditID = <cfqueryparam value="#formData.ID#" cfsqltype="cf_sql_integer">
    
    DELETE FROM dbo.CemeteryAssets
    WHERE AuditID = <cfqueryparam value="#formData.ID#" cfsqltype="cf_sql_integer">
    
    DELETE FROM dbo.CemeteryCareFund
    WHERE AuditID = <cfqueryparam value="#formData.ID#" cfsqltype="cf_sql_integer">

	DELETE FROM Questionnaire
    WHERE AuditID = <cfqueryparam value="#formData.ID#" cfsqltype="cf_sql_integer">
</cfquery>
<cfelseif formData.reference IS "p2">
	<!--- Delete Questionnaire only --->
    <cfquery datasource="#application.datasource#">
        DELETE FROM Questionnaire
        WHERE AuditID = <cfqueryparam value="#formData.ID#" cfsqltype="cf_sql_integer">
    </cfquery>
<cfelseif formData.reference IS "p3">
	<!--- Delete Audit Finding only --->
    <cfquery datasource="#application.datasource#">
        DELETE FROM AuditFindings
        WHERE afID = <cfqueryparam value="#formData.ID#" cfsqltype="cf_sql_integer">
    </cfquery>
<cfelseif formData.reference IS "p3">

</CFIF>

</cffunction>
<!--- Get Questionnaire by AuditID --->
<cffunction name="GetQuestionnaireByAuditID" access="public" output="no" returntype="query">
<cfargument name="IncomingAuditID" type="numeric" required="yes">

<cfquery name="qq" datasource="#application.datasource#">
	 SELECT  
       Q.qID
      ,Q.AuditID
      ,Q.LicenseDisplay
      ,Q.MausoleumPresent
      ,Q.Donantions
      ,Q.ReturnOfCapital
      ,Q.SecuritiesExam
      ,Q.SecuritiesTitle
      ,Q.DeductFlag
      ,Q.InvestFlag
      ,Q.OutofStateDep
      ,Q.LoanInvToCemAuth
      ,Q.InsuffRecrods
      ,Q.CapGainPayments
      ,Q.CremOperation
      ,Q.LastAuditDate
      ,Q.BondIncrease
      ,Q.OwnerChange
      ,Q.TransRightsDep
      ,Q.PenaltyPd
      ,Q.PNSales
      ,Q.CremOpReg
      ,Q.CreatedbyUserID
      ,Q.DateCreated
      ,Q.LastUpdatedUserID
      ,Q.LastUpdated
      ,IsNULL(U.LastName, 'N/A') AS LastName
      ,IsNULL(U.LastName,'N/A') + ', ' + IsNULL(U.FirstName,'N/A') AS FullName

     FROM Questionnaire AS Q
     JOIN dbo.Audits AS A 
        ON Q.AuditID = A.AuditID
     LEFT OUTER JOIN dbo.Users AS UC
     	ON Q.CreatedbyUserID = UC.UserID
     LEFT OUTER JOIN dbo.Users AS UE
     	ON Q.LastUpdatedUserID = UE.UserID
      LEFT OUTER JOIN dbo.Users AS U
      	ON A.AuditorUserID = U.userID 
    WHERE Q.AuditID = <cfqueryparam value="#IncomingAuditID#" cfsqltype="cf_sql_integer">
    
</cfquery>

	<cfreturn qq>
</cffunction>

<!--- Get Yes No NA  --->
<cffunction name="GetYesNoNA" access="public" output="no" returntype="query">

<cfquery name="qYNNA" datasource="#application.datasource#">
	SELECT ID, YNNA, Description
    FROM dbo.YesNoNA
    ORDER BY ID
</cfquery>

 <cfreturn qYNNA>
</cffunction>
<!--- Update Questionnaire --->
<cffunction name="UpdateQuestionnaireRecord" access="public" returntype="boolean">
<cfargument name="formData" type="struct" required="yes">
<!--- Status is for future use when there is some sort of validation that will be needed. --->
<CFSET Status = false>

<!--- Record exists or not check --->
<cfquery name="q1" datasource="#application.datasource#">
	SELECT qID
    FROM dbo.Questionnaire
    WHERE AuditID = <cfqueryparam value="#formData.AuditID#" cfsqltype="CF_SQL_INTEGER">

</cfquery>

<CFIF q1.recordcount IS 0>
	<cfquery datasource="#application.datasource#">
    	INSERT INTO dbo.Questionnaire
        (
        	 AuditID
            ,LicenseDisplay
            ,MausoleumPresent
            ,Donantions
            ,ReturnOfCapital
            ,SecuritiesExam
            ,SecuritiesTitle
            ,DeductFlag
            ,InvestFlag
            ,OutofStateDep
            ,LoanInvToCemAuth
            ,InsuffRecrods
            ,CapGainPayments
            ,CremOperation
            ,LastAuditDate
            ,BondIncrease
            ,OwnerChange
            ,TransRightsDep
            ,PenaltyPd
            ,PNSales
            ,CremOpReg
            ,CreatedbyUserID
            ,DateCreated
            ,LastUpdatedUserID
            ,LastUpdated
          )
    VALUES (
    	    <cfqueryparam value="#formData.AuditID#" cfsqltype="CF_SQL_INTEGER">
           ,<cfqueryparam value="#formData.LicenseDisplay#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.MausoleumPresent#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.Donantions#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.ReturnOfCapital#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.SecuritiesExam#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.SecuritiesTitle#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.DeductFlag#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.InvestFlag#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.OutofStateDep#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.LoanInvToCemAuth#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.InsuffRecrods#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.CapGainPayments#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.CremOperation#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.LastAuditDate#" cfsqltype="CF_SQL_DATE">
           ,<cfqueryparam value="#formData.BondIncrease#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.OwnerChange#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.TransRightsDep#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.PenaltyPd#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.PNSales#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#formData.CremOpReg#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,<cfqueryparam value="#session.userID#" cfsqltype="CF_SQL_INTEGER">
           ,<cfqueryparam value="#NOW()#" cfsqltype="CF_SQL_TIMESTAMP">
           ,<cfqueryparam value="#session.userID#" cfsqltype="CF_SQL_INTEGER">
           ,<cfqueryparam value="#NOW()#" cfsqltype="CF_SQL_TIMESTAMP">
    	  )
    
    </cfquery>
	<CFSET Status = true>
<cfelse>
	<cfquery datasource="#application.datasource#">
            UPDATE dbo.Questionnaire
            SET LicenseDisplay = <cfqueryparam value="#formData.LicenseDisplay#" cfsqltype="CF_SQL_VARCHAR" maxlength="2">
           ,MausoleumPresent = <cfqueryparam value="#formData.MausoleumPresent#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,Donantions = <cfqueryparam value="#formData.Donantions#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,ReturnOfCapital = <cfqueryparam value="#formData.ReturnOfCapital#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,SecuritiesExam = <cfqueryparam value="#formData.SecuritiesExam#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,SecuritiesTitle = <cfqueryparam value="#formData.SecuritiesTitle#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,DeductFlag = <cfqueryparam value="#formData.DeductFlag#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,InvestFlag = <cfqueryparam value="#formData.InvestFlag#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,OutofStateDep = <cfqueryparam value="#formData.OutofStateDep#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,LoanInvToCemAuth = <cfqueryparam value="#formData.LoanInvToCemAuth#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,InsuffRecrods = <cfqueryparam value="#formData.InsuffRecrods#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,CapGainPayments = <cfqueryparam value="#formData.CapGainPayments#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,CremOperation = <cfqueryparam value="#formData.CremOperation#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,LastAuditDate = <cfqueryparam value="#formData.LastAuditDate#" cfsqltype="CF_SQL_DATE">
           ,BondIncrease = <cfqueryparam value="#formData.BondIncrease#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,OwnerChange = <cfqueryparam value="#formData.OwnerChange#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,TransRightsDep = <cfqueryparam value="#formData.TransRightsDep#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,PenaltyPd = <cfqueryparam value="#formData.PenaltyPd#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,PNSales = <cfqueryparam value="#formData.PNSales#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,CremOpReg = <cfqueryparam value="#formData.CremOpReg#" cfsqltype="cf_sql_varchar" maxlength="2">
           ,LastUpdatedUserID = <cfqueryparam value="#session.userID#" cfsqltype="CF_SQL_INTEGER">
           ,LastUpdated = <cfqueryparam value="#NOW()#" cfsqltype="CF_SQL_TIMESTAMP">
               
            WHERE AuditID = <cfqueryparam value="#formData.AuditID#" cfsqltype="CF_SQL_INTEGER">
   </cfquery>
   <CFSET Status = true>
</CFIF>



	<Cfreturn Status>
</cffunction>

<!--- Get All Audit Findings Per Account --->

<cffunction name="GetAllFeeSlipsByDebtorAccountNumber" access="public" output="no" returntype="query">
<cfargument name="IncomingDebtorAccountNumber" type="string" required="yes">

<cfquery name="qAF" datasource="#application.datasource#">
  SELECT   A.AuditID
          ,A.DebtorAccountNumber
          ,A.FiscalYear
          ,A.AuditorUserID
          ,A.AuditDate
          ,IsNULL(A.Findings,0) AS Findings
          ,A.FindingsDueDate
          ,A.FeeSlip
          ,A.FeeAmount
          ,A.FeeCollected
          ,A.EntryDate
          ,A.DateCreated
          ,A.DateLastEdited
          ,A.LastEditedByUserID
          ,A.CreatedByUserID
		  ,IsNULL(U.FirstName,'N/A') AS FirstName
          ,U.MiddleName
          ,IsNULL(U.LastName, 'N/A') AS LastName
          ,IsNULL(U.LastName,'N/A') + ', ' + IsNULL(U.FirstName,'N/A') AS FullName
   FROM dbo.Audits AS A
   	  LEFT OUTER JOIN dbo.Users AS U
      	ON A.AuditorUserID = U.userID 
   WHERE A.DebtorAccountNumber = <cfqueryparam value="#IncomingDebtorAccountNumber#" cfsqltype="CF_SQL_VARCHAR" maxlength="12">
   ORDER BY A.FiscalYear, U.LastName, U.FirstName
</cfquery>
  <cfreturn qAF>
</cffunction>
<cffunction name="GetAllAuditFindingsByDebtorAccountNumber" access="public" output="no" returntype="query">
<cfargument name="IncomingDebtorAccountNumber" type="string" required="yes">

<cfquery name="qAF" datasource="#application.datasource#">

             SELECT      
             AF.afID
            ,AF.AuditID
            ,AF.ftID
            ,AF.FindingDescription
            ,AF.ResolvedDate
            ,IsNULL(AF.NAF,0) AS NAF
            ,AF.DateCreated
            ,AF.CreatedByUserID
            ,AF.DateModified
            ,AF.ModifiedByUserID
          ,IsNULL(U.FirstName,'N/A') AS FirstName
          ,U.MiddleName
          ,IsNULL(U.LastName, 'N/A') AS LastName
          ,IsNULL(U.LastName,'N/A') + ', ' + IsNULL(U.FirstName,'N/A') AS FullName
          ,IsNULL(UEdit.FirstName,'N/A') AS FirstName_Editor
          ,IsNULL(UEdit.LastName, 'N/A') AS LastName_Editor
          ,FT.FindingType
          ,A.FindingsDueDate
   FROM dbo.AuditFindings AS AF
   	      INNER JOIN dbo.Audits AS A
        	ON AF.AuditID = A.AuditID
          INNER JOIN dbo.FindingTypes AS FT
            	ON AF.ftID = FT.ftID  
   	     LEFT OUTER JOIN dbo.Users AS U
      		ON A.AuditorUserID = U.userID 
        LEFT OUTER JOIN dbo.Users AS UEdit
      		ON AF.ModifiedByUserID = UEdit.userID 
   WHERE AF.AuditID  IN (SELECT AuditID
                     FROM dbo.Audits
                     WHERE DebtorAccountNumber = <cfqueryparam value="#IncomingDebtorAccountNumber#" cfsqltype="CF_SQL_VARCHAR" maxlength="12">)
   ORDER BY A.FiscalYear, U.LastName, U.FirstName
</cfquery>
  <cfreturn qAF>
  
  
</cffunction>
<!--- Get Finding Types --->
<cffunction name="GetFindingTypes" access="public" output="no" returntype="query">

<cfquery name="qFT" datasource="#application.datasource#">
	SELECT ftID, FindingType, FindingTypeAbbreviation
    FROM dbo.FindingTypes
    ORDER BY FindingType
</cfquery>
	<cfreturn qFT>
</cffunction>

<cffunction name="UpdatedAuditFindingPAF" access="public" returntype="struct">
<cfargument name="formData" type="struct" required="yes">
<!--- Status is for future use when there is some sort of validation that will be needed. --->
<CFSET Results.Status = false>
<CFSET Results.afID = 0>

<CFIF IsDefined("form.NAF")>
	<CFSET formData.NAF = 1>
<cfelse>
	<CFSET formData.NAF = 0>
</CFIF>

<CFIF formData.Action IS "Add">
	
	<!--- Record exists or not check --->
    <cfquery name="q1" datasource="#application.datasource#">
        SELECT afID
        FROM dbo.AuditFindings
        WHERE AuditID = <cfqueryparam value="#formData.AuditID#" cfsqltype="CF_SQL_INTEGER"> AND
              ftID = <cfqueryparam value="#formData.AuditID#" cfsqltype="CF_SQL_INTEGER"> AND
              FindingDescription = <cfqueryparam value="#formData.FindingDescription#" cfsqltype="CF_SQL_VARCHAR" maxlength="1000"> AND
              NAF = <cfqueryparam value="#formData.NAF#" cfsqltype="CF_SQL_BIT">
    
    </cfquery>
	<CFIF q1.recordcount IS 0>
        <cfquery name="q2" datasource="#application.datasource#">
            INSERT INTO dbo.AuditFindings
            (
                 AuditID
                ,ftID
                ,FindingDescription
                ,ResolvedDate
                ,NAF
                ,DateCreated
                ,CreatedbyUserID
                ,DateModified
                ,ModifiedByUserID
               
              )
        VALUES (
                <cfqueryparam value="#formData.AuditID#" cfsqltype="CF_SQL_INTEGER">
               ,<cfqueryparam value="#formData.ftID#" cfsqltype="CF_SQL_INTEGER">
               ,<cfqueryparam value="#formData.FindingDescription#" cfsqltype="CF_SQL_VARCHAR" maxlength="1000">
               ,<cfqueryparam value="#formData.ResolvedDate#" cfsqltype="CF_SQL_DATE">
               ,<cfqueryparam value="#formData.NAF#" cfsqltype="CF_SQL_BIT">
               ,<cfqueryparam value="#NOW()#" cfsqltype="CF_SQL_TIMESTAMP">
               ,<cfqueryparam value="#session.userID#" cfsqltype="CF_SQL_INTEGER">
               ,<cfqueryparam value="#NOW()#" cfsqltype="CF_SQL_TIMESTAMP">
               ,<cfqueryparam value="#session.userID#" cfsqltype="CF_SQL_INTEGER">
              )
              
            SELECT SCOPE_IDENTITY() AS afID 
        
        </cfquery>
    </CFIF>   
	<CFSET Results.afID = q2.afID>
	<CFSET Results.Status = true>
<cfelse>
	<cfquery datasource="#application.datasource#">
            UPDATE dbo.AuditFindings
            SET ftID = <cfqueryparam value="#formData.ftID#" cfsqltype="CF_SQL_INTEGER">
                ,FindingDescription = <cfqueryparam value="#formData.FindingDescription#" cfsqltype="CF_SQL_VARCHAR" maxlength="1000">
                ,ResolvedDate = <cfqueryparam value="#formData.ResolvedDate#" cfsqltype="CF_SQL_DATE">
                ,NAF = <cfqueryparam value="#formData.NAF#" cfsqltype="CF_SQL_BIT">
                ,DateModified = <cfqueryparam value="#NOW()#" cfsqltype="CF_SQL_TIMESTAMP">
                ,ModifiedByUserID = <cfqueryparam value="#session.userID#" cfsqltype="CF_SQL_INTEGER">
            WHERE afID = <cfqueryparam value="#formData.afID#" cfsqltype="CF_SQL_INTEGER">
   </cfquery>
  <CFSET Results.afID = formData.afID>
	<CFSET Results.Status = true>
</cfif>
  <cfreturn Results>
</cffunction>
<!--- Get Findings Per Auditor and DebtorAccountNumber --->
<cffunction name="GetAuditFindingsByDebtorAccountNumber_AuditorID" access="public" output="no" returntype="query">
<cfargument name="structData" type="struct" required="yes">

<cfquery name="qAFindings" datasource="#application.datasource#">

             SELECT      
                 AF.afID
                ,AF.AuditID
                ,AF.ftID
                ,AF.FindingDescription
                ,AF.ResolvedDate
                ,IsNULL(AF.NAF,0) AS NAF
                ,AF.DateCreated
                ,AF.CreatedByUserID
                ,AF.DateModified
                ,AF.ModifiedByUserID
                ,IsNULL(U.FirstName,'N/A') AS FirstName
                ,U.MiddleName
                ,IsNULL(U.LastName, 'N/A') AS LastName
                ,IsNULL(U.LastName,'N/A') + ', ' + IsNULL(U.FirstName,'N/A') AS FullName
                ,IsNULL(UEdit.FirstName,'N/A') AS FirstName_Editor
                ,IsNULL(UEdit.LastName, 'N/A') AS LastName_Editor
                ,FT.FindingType
                ,A.FindingsDueDate
   FROM dbo.AuditFindings AS AF
            INNER JOIN dbo.Audits AS A
            	ON AF.AuditID = A.AuditID
            INNER JOIN dbo.FindingTypes AS FT
            	ON AF.ftID = FT.ftID
            LEFT OUTER JOIN dbo.Users AS U
            	ON A.AuditorUserID = U.userID 
            LEFT OUTER JOIN dbo.Users AS UEdit
            	ON AF.ModifiedByUserID = UEdit.userID 
   WHERE AF.AuditID  IN (SELECT AuditID
                     FROM dbo.Audits
                     WHERE DebtorAccountNumber = <cfqueryparam value="#StructData.Cookie_DebtorAccountNumber#" cfsqltype="CF_SQL_VARCHAR" maxlength="12"> AND
                     	   AuditorUserID = <cfqueryparam value="#StructData.Cookie_AuditorID#" cfsqltype="cf_sql_integer">)
   ORDER BY A.FiscalYear
</cfquery>
  <cfreturn qAFindings>
</cffunction>
<!--- Get Single Audit Finding  --->
<cffunction name="GetSingleRecordAuditFindingbyAFID" access="public" output="no" returntype="query">
<cfargument name="IncomingAFID" type="numeric" required="yes">

<cfquery name="qAF2" datasource="#application.datasource#">
	SELECT 
       afID
      ,AuditID
      ,ftID
      ,FindingDescription
      ,ResolvedDate
      ,IsNULL(NAF,0) AS NAF
      ,DateCreated
      ,CreatedByUserID
      ,DateModified
      ,ModifiedByUserID
    FROM dbo.AuditFindings
   WHERE afID = <cfqueryparam value="#IncomingAFID#" cfsqltype="cf_sql_integer">

</cfquery>
 <CFRETURN qAF2>
</cffunction>
</cfcomponent>