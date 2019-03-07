<cfinclude template="../includes/header_prep.cfm">
<cfinclude template="../includes/header.cfm">
<cfinclude template="../includes/titlebar.cfm">
<cfinvoke
  component="security.IOCSecurity"
  method="GetAllApplicationsUserHasAccessTo"
  returnvariable="qAllUserApps">
  <cfinvokeargument name="IncomingUserID" value="#session.userID#">
</cfinvoke>

    <div class="card mb-5">
        <div class="card-body">
            <!---<p>Number of applications found: <b><cfoutput>#qAllUserApps.recordcount#</cfoutput></b></p>--->
            <div class="row justify-content-center">
                <CFIF qAllUserApps.recordcount GT 0>
                    <cfoutput query="qAllUserApps">
                        <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                            <cfform action="#qAllUserApps.LoginURLPath#" target="_blank" method="post" enctype="application/x-www-form-urlencoded" preloader="no">
                                <cfinput type="hidden" name="#qAllUserApps.LoginFormUName#" value="#session.UName#">
                                <cfinput type="hidden" name="#qAllUserApps.LoginFormPWord#" value="#session.password#">
                                <CFIF TRIM(qAllUserApps.LoginFormHiddenName) IS NOT "">
                                    <cfinput type="hidden" name="#qAllUserApps.LoginFormHiddenName#" value="#qAllUserApps.LoginFormHiddenValue#">
                                </CFIF>
                                <cfinput type="submit" name="Login" value="#qAllUserApps.ApplicationName#" class="btn btn-primary btn-block mb-3">
                            </cfform>
                        </div>
                    </cfoutput>
                <cfelse>
                    <div class="col-12">You do not have access to any IOC Applications</div>
                </CFIF>
            </div>
        </div>
    </div>
</div>
<div class="push-sticky-footer-inner"></div>
</div>
<cfinclude template="../includes/footer.cfm">
