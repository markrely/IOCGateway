<!--- Get All Fee Slips for the Debtor Account Number --->
<cfinvoke 
    component="main.cfc.audit"
    method="GetAllFeeSlipsByDebtorAccountNumber"
    returnvariable="qAF">
 <cfinvokeargument name="IncomingDebtorAccountNumber" value="#variables.Cookie_DebtorAccountNumber#">
</cfinvoke>
<!--- Get All Findings for this Debtor Account Number--->
<cfinvoke 
    component="main.cfc.audit"
    method="GetAllAuditFindingsByDebtorAccountNumber"
    returnvariable="qAFindings">
 <cfinvokeargument name="IncomingDebtorAccountNumber" value="#variables.Cookie_DebtorAccountNumber#">
</cfinvoke>
<CFIF IsDefined("URL.HomeTab") AND URL.HomeTab IS "2">
	<CFSET variables.Tab1 = "">
    <CFSET variables.Tab2 = "active">
<cfelse>
	<CFSET variables.Tab1 = "active">
    <CFSET variables.Tab2 = "">
</CFIF>
<CFIF IsDefined("URL.Update") AND URL.Update IS true>
    <div class="alert alert-success" role="alert">
      The record was successfully updated.  
    </div>
</CFIF>
<cfoutput>
<div class="container pull-left">


<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item">
    <a class="nav-link  #variables.Tab1#" href="##Audit" role="tab" data-toggle="tab" aria-selected="true">Audit</a>
  </li>
  <li class="nav-item">
    <a class="nav-link #variables.Tab2#" href="##Findings" role="tab" data-toggle="tab">Findings</a>
  </li>
 
</ul>

<div class="tab-content">
    <div role="tabpanel" class="tab-pane #variables.Tab1#" id="Audit">
     <h3 align="center">Audit</h3>
      <table class="table table-striped" style="max-width:900px;">
        <thead class="thead-blue">
            <th>FY</th>
            <th>Auditor</th>
            <th>End Date</th>
            <th>Fee Slip</th>
            <th>Findings</th>
        </thead>
       <tbody>
         <CFIF qAF.recordcount IS 0>
          <tr>
          	<td colspan="5">No records found</td>
          </tr>

         <cfelse>
			 <cfloop query="qAF"> 
                <tr>
                    <td><a href="../workpapers/p1.cfm?ID=#qAF.AuditID#">#qAF.FiscalYear#</a></td>
                    <td>#qAF.FullName#</td>
                    <td>#DATEFORMAT(qAF.FindingsDueDate, "mm/dd/yyyy")#</td>
                    <td>#qAF.FeeSlip#</td>
                    <td>
                      <CFIF qAF.Findings IS 0>
                        NO
                      <cfelse>
                        YES
                      </CFIF>
                    </td>
                </tr>
              </cfloop>     
        </CFIF>   
        </tbody>
        </table>
    </div>
    <!--- Findings --->
   <div role="tabpanel" class="tab-pane #variables.Tab2#" id="Findings">
       <h3 align="center">Findings</h3>
	 <table class="table table-striped" style="max-width:900px;">
        <thead class="thead-blue">
            <th>FY</th>
            <th>Finding</th>
            <th>Auditor</th>
            <th>Due</th>
            <th>Resolved</th>
            <th>&nbsp;</th>
        </thead>
       <tbody>
        <CFIF qAFindings.recordcount IS 0>
          <tr>
          	<td colspan="6">No records found</td>
          </tr>
        <cfelse>
            <cfloop query="qAFindings">
            <CFIF IsDefined("URL.ID") AND URL.ID IS qAFindings.afID>
            	<tr class="table-warning">
            <cfelse>
            	<tr>
            </CFIF>
                    <td>#DATEFORMAT(qAFindings.DateCreated,"mm/dd/yyyy")#</td>
                    <td>
                        <CFIF qAFindings.NAF IS 1>
                            YES
                        <cfelse>
                            NO
                        </CFIF> 
                    </td>
                    <td>#qAFindings.FullName#</td>
                     <td>
                      <a href="../workpapers/p1.cfm?ID=#qAFindings.AuditID#&HomeTab=2">
                        <CFIF IsDate(qAFindings.FindingsDueDate)>
                            #DATEFORMAT(qAFindings.FindingsDueDate,"mm/dd/yyyy")#
                        <cfelse>
                        	NOT SPECIFIED
                        </cfif>
                      </a>  
                    </td>
                    <td>
                        <CFIF IsDate(qAFindings.ResolvedDate)>
                            #DATEFORMAT(qAFindings.ResolvedDate,"mm/dd/yyyy")#
                        </cfif>
                    </td>
                    
                    <td>
                        <a href="#application.memberhomewww#/workpapers/p3.cfm?action=edit&ID2=#qAFindings.afID#">
                        	<i class="fas fa-edit"></i>
                        </a>
                    </td>
               </tr>
            </cfloop>
          
		</CFIF>
         
        </tbody>
        </table>
    </div>
</div>
</cfoutput>

 
