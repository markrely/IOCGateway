<!--- Set structure data so that it can be used to query the Business Demographics --->
<CFSET StructData.DebtorAccountNumber = variables.Cookie_DebtorAccountNumber>
<CFSET StructData.FiscalYear = variables.Cookie_FiscalYear> 
<CFSET StructData.AuditorID = variables.Cookie_AuditorID>
<CFSET StructData.Licensee_Type_Code = variables.Cookie_Licensee_Type_Code>

<!--- Get Licensee Demographics --->
    <cfinvoke 
        component="main.cfc.general"
        method="GetBusinessDemographics"
        returnvariable="qD">
     <cfinvokeargument name="StructData" value="#StructData#">
    </cfinvoke>

    <CFIF qD.recordcount IS 0>
    	<cfcookie name="SValues" expires="now">
        <cflocation url="../home/index.cfm?error=norecords" addtoken="no">
    </CFIF>
<cfoutput>


   <div class="row" style="max-width:1280px;">
        <div class="col" style="width: 50%;">
            <div class="row"> 
                <div id="Demographics" class="card" style="width: 100%;">
                    <div class="card-body">
                        <h5 class="card-title" style="color:red; font-weight:bolder">Business Info:</h5>
                        <p class ="card-text">
                            <div class="row border-bottom py-1">
                                <div class="col"><strong>Business Name</strong></div>
                                    <div class="col-md-auto">
                                      #qD.Business_Name#
                                    </div>
                            </div>
							<div class="row border-bottom py-1">
                                <div class="col"><strong>Account Number</strong></div>
                                    <div class="col-md-auto" style="color:Navy;font-weight:bolder">
                                       #qD.LICENSEE_CODE#
                                    </div>
                            </div>
                            
                            <div class="row border-bottom py-1">
                                <div class="col"><strong>Fiscal Year</strong></div>
                                    <div class="col-md-auto" style="color:Navy;font-weight:bolder">
                                       #qD.Fiscal_Year#
                                    </div>
                            </div>
                             <div class="row border-bottom py-1">
                                <div class="col"><strong>Licensee</strong></div>
                                    <div class="col-md-auto">
                                       #qD.Licensee_Name#
                                    </div>
                            </div>
                             <div class="row border-bottom py-1">
                                <div class="col"><strong>FEIN</strong></div>
                                    <div class="col-md-auto">
                                       #qD.FEIN#
                                    </div>
                            </div>
                             <div class="row border-bottom py-1">
                                <div class="col"><strong>Licensee Number</strong></div>
                                    <div class="col-md-auto">
                                       #qD.Licensee_Number#
                                    </div>
                            </div>
                            <div class="row border-bottom py-1">
                                <div class="col"><strong>Licensee Type</strong></div>
                                    <div class="col-md-auto">
                                       #qD.Licensee_Description#
                                    </div>
                            </div>
                              <div class="row border-bottom py-1">
                                <div class="col"><strong>Ownership Type</strong></div>
                                    <div class="col-md-auto">
                                       #qD.Ownership_Type#
                                    </div>
                            </div>

						</p>
                    </div>
                </div>
             </div>
         </div>
         
        <div class="col-md-auto" style="width: 45%;"> <!-- Column 2 Start -->
        <div id="Contact" class="card" style="width: 100%;">
            <div class="card-body">
                <h5 class="card-title" style="color:red; font-weight:bolder">Contact Info:</h5>
                    <p class ="card-text"> 
						<div class="row border-bottom py-1">
                                <div class="col"><strong>Contact</strong></div>
                                    <div class="col-md-auto">
                                       #qD.Contact_Person_First_Name# #qD.Contact_Person_Last_Name#
                                    </div>
                        </div>
                        <div class="row border-bottom py-1">
                                <div class="col"><strong>Email</strong></div>
                                    <div class="col-md-auto">
                                     <a href="mailto:#qD.MAIN_EMAIL_ADDRESS#">#qD.MAIN_EMAIL_ADDRESS#</a>
                                    </div>
                        </div>
                         <div class="row border-bottom py-1">
                                <div class="col"><strong>Business Address</strong></div>
                                    <div class="col-md-auto">
                                       #qD.Business_Address# #qD.Business_City# #qD.Business_State#, #qD.Business_Zip#
                                    </div>
                        </div>
                        <div class="row border-bottom py-1">
                                <div class="col"><strong>Location</strong></div>
                                    <div class="col-md-auto">
                                       #qD.Licensee_Country#
                                    </div>
                        </div>
                        <div class="row border-bottom py-1">
                                <div class="col"><strong>Licensee Phone</strong></div>
                                    <div class="col-md-auto">
                                       #qD.Licensee_Phone#
                                    </div>
                        </div>
                        <div class="row border-bottom py-1">
                                <div class="col"><strong>Licensee Fax</strong></div>
                                    <div class="col-md-auto">
                                       #qD.Licensee_Fax#
                                    </div>
                        </div>
                         <div class="row border-bottom py-1">
                                <div class="col"><strong>Business Phone</strong></div>
                                    <div class="col-md-auto">
                                       #qD.Business_Phone#
                                    </div>
                        </div>
                        <div class="row border-bottom py-1">
                                <div class="col"><strong>Business Fax</strong></div>
                                    <div class="col-md-auto">
                                       #qD.Business_Fax#
                                    </div>
                        </div>
                      </p>
            </div>
         </div>
         </div>
      </div>

</cfoutput>

