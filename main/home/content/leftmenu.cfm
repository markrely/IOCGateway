<cfoutput>
<div class="card" style="width:225px;">
<div class="card-body" style="width:225px;">
  <h6>Workpapers</h6>
  <a href="#application.memberhomewww#/workpapers/p1.cfm" class="btn btn-primary" style="width:184px;font-size:12px;">Fee Slip/Audit Info</a>
  <a href="#application.memberhomewww#/workpapers/p2.cfm" class="btn btn-primary mt-1" style="width:184px;font-size:12px;">Questionnaire</a>
  <a href="#application.memberhomewww#/workpapers/p3.cfm" class="btn btn-primary mt-1" style="width:184px;font-size:12px;">Audit Findings - PAF/NAF</a>
 <!--- Funeral, Net Assets --->
<CFIF variables.Cookie_Licensee_Type_Code IS "F">
	<a href="#application.memberhomewww#/workpapers/p4a.cfm" class="btn btn-primary mt-1" style="width:184px;font-size:12px;">Funeral Funds</a>
<cfelseif variables.Cookie_Licensee_Type_Code IS "P"> 
	<a href="#application.memberhomewww#/workpapers/p4b.cfm" class="btn btn-primary mt-1" style="width:184px;font-size:12px;">Net Assets-Merch</a>  
<cfelse>
	<a href="#application.memberhomewww#/workpapers/p4.cfm" class="btn btn-primary mt-1" style="width:184px;font-size:12px;">Net Assets</a>
</CFIF>
<!--- 30 Day Rule, Pre Constr, Care Fund --->
<CFIF variables.Cookie_Licensee_Type_Code IS "F">
	<a href="#application.memberhomewww#/workpapers/p6.cfm" class="btn btn-primary mt-1" style="width:184px;font-size:12px;">30 Day Rule Test</a>
	
<cfelseif variables.Cookie_Licensee_Type_Code IS "P">
	<a href="#application.memberhomewww#/workpapers/p5b.cfm" class="btn btn-primary mt-1" style="width:184px;font-size:12px;">Net Assets-Pre Constr</a>
<cfelse>
	<a href="#application.memberhomewww#/workpapers/p5.cfm" class="btn btn-primary mt-1" style="width:184px;font-size:12px;">Care Fund</a>
</cfif>
<!--- 30 day Rule (for F or P)  --->
<CFIF NOT ListFindNoCase('F,P',variables.Cookie_Licensee_Type_Code)> 
	<a href="#application.memberhomewww#/workpapers/p6.cfm" class="btn btn-primary mt-1" style="width:184px;font-size:12px;">30 Day Rule Test</a>
</CFIF>
<!--- 30 Day, ARL --->
<CFIF variables.Cookie_Licensee_Type_Code IS "P">
	<a href="#application.memberhomewww#/workpapers/p6.cfm" class="btn btn-primary mt-1" style="width:92px;font-size:12px;">30 Day</a><a href="#application.memberhomewww#/workpapers/p7.cfm" class="btn btn-primary mt-1" style="width:92px;font-size:12px;">ARL</a>
<cfelse>
	<a href="#application.memberhomewww#/workpapers/p7.cfm" class="btn btn-primary mt-1" style="width:184px;font-size:12px;">ARL</a>
</cfif>
<!--- Insurance, Confirmation Letter --->
<CFIF variables.Cookie_Licensee_Type_Code IS "F">
	<a href="#application.memberhomewww#/workpapers/p8.cfm" class="btn btn-primary mt-1" style="width:92px;font-size:12px;">Confirm Ltr</a><a href="#application.memberhomewww#/workpapers/p14.cfm" class="btn btn-primary mt-1" style="width:92px;font-size:12px;">Insurance</a>
 <cfelse>
	<a href="#application.memberhomewww#/workpapers/p8.cfm" class="btn btn-primary mt-1" style="width:184px;font-size:12px;">Confirmation Letter</a>
 </cfif>
<!--- New Acct Trust, Proof Cash, Proof of Cash ---> 
<CFIF variables.Cookie_Licensee_Type_Code IS "F">
	<a href="#application.memberhomewww#/workpapers/p15.cfm" class="btn btn-primary mt-1"  style="width:184px;font-size:12px;">New Acc-Trust</a>
<cfelseif variables.Cookie_Licensee_Type_Code IS "P">
	<a href="#application.memberhomewww#/workpapers/p9b.cfm" class="btn btn-primary mt-1"  style="width:184px;font-size:12px;">Proof Cash - Merch</a>
<cfelse>
	<a href="#application.memberhomewww#/workpapers/p9.cfm" class="btn btn-primary mt-1"  style="width:184px;font-size:12px;">Proof of Cash and Inv Rec</a>
</cfif>
<!--- New acct Insurance, Proof Cash, Analysis allocated --->
<CFIF variables.Cookie_Licensee_Type_Code IS "F">
	<a href="#application.memberhomewww#/workpapers/p16.cfm" class="btn btn-primary mt-1"  style="width:184px;font-size:12px;">New Acc-Ins</a>
<cfelseif variables.Cookie_Licensee_Type_Code IS "P">
	<a href="#application.memberhomewww#/workpapers/p17.cfm" class="btn btn-primary mt-1"  style="width:184px;font-size:12px;">Proof Cash -PreConstr</a>
<cfelse>
	<a href="#application.memberhomewww#/workpapers/p10.cfm" class="btn btn-primary mt-1"  style="width:184px;font-size:12px;">Analysis Allocated Amts</a>
</cfif>
<!--- Burial, Cancellation --->
 <CFIF variables.Cookie_Licensee_Type_Code IS "F">
    <a href="#application.memberhomewww#/workpapers/p18.cfm" class="btn btn-primary mt-1" style="width:92px;font-size:12px;">Burial</a><a href="#application.memberhomewww#/workpapers/p19.cfm" class="btn btn-primary mt-1" style="width:92px;font-size:12px;">Cancellation</a>
</cfif>
<!--- Vault Test, Random File --->
<CFIF variables.Cookie_Licensee_Type_Code IS "F">
	<a href="#application.memberhomewww#/workpapers/p20.cfm" class="btn btn-primary mt-1" style="width:92px;font-size:12px;">Vault Test</a><a href="#application.memberhomewww#/workpapers/p21.cfm" class="btn btn-primary mt-1" style="width:92px;font-size:12px;">Random File</a>
</cfif>
<!--- Liability Ck, contracts --->
 <CFIF variables.Cookie_Licensee_Type_Code IS "P">
		<a href="#application.memberhomewww#/workpapers/p22.cfm" class="btn btn-primary mt-1" style="width:92px;font-size:12px;">Liability Ck</a><a href="#application.memberhomewww#/workpapers/p23.cfm" class="btn btn-primary mt-1" style="width:92px;font-size:12px;">Contracts Ck</a>
</cfif>
<!--- Merch/Serv Test check --->
<CFIF variables.Cookie_Licensee_Type_Code IS "P">
	<a href="#application.memberhomewww#/workpapers/p24.cfm" class="btn btn-primary mt-1" style="width:184px;font-size:12px;">Merch/Serv Test Check</a>
</cfif>
<a href="#application.memberhomewww#/workpapers/p11.cfm" class="btn btn-primary mt-1" style="width:184px;font-size:12px;">Notes</a>
<a href="#application.memberhomewww#/workpapers/p12.cfm" class="btn btn-primary mt-1" style="width:184px;font-size:12px;">Table Of Contents</a>  
</div>
</div>
      
          

</cfoutput>
