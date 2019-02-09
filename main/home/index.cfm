<cfinclude template="../includes/header_prep.cfm">
<cfinclude template="../includes/header.cfm">
<cfinclude template="../includes/titlebar.cfm">
<cfinvoke
  component="security.IOCSecurity"
  method="GetAllApplicationsUserHasAccessTo"
  returnvariable="qAllUserApps">
  <cfinvokeargument name="IncomingUserID" value="#session.userID#">
</cfinvoke>
<div class="container" align="center">
 <div class="header">
 	<p>
 	<h2>Welcome to the IOC GATEWAY</h2>
    </p>
 </div>
 <table class="table table-striped" style="width:750px;">
 <thead>
  <tr>
    <th>Application</th>
    <th>Access Level</th>
    <th>Front Page</th>
    <th>Login</th>
  </tr>
 </thead> 
 <CFIF qAllUserApps.recordcount GT 0>
 <cfoutput query="qAllUserApps">
 <tr>
    <td>#qAllUserApps.ApplicationName#</td>
    <td>#qAllUserApps.AccessLevel#</td>
    <td><a href="#qAllUserApps.AppRootURLPath#" target="_blank" class="btn btn-primary">Goto Front Page</a></td>
    <td>
    <cfform action="#qAllUserApps.LoginURLPath#" target="_blank" method="post" enctype="application/x-www-form-urlencoded" preloader="no">
    <cfinput type="hidden" name="#qAllUserApps.LoginFormUName#" value="#session.UName#">
    <cfinput type="hidden" name="#qAllUserApps.LoginFormPWord#" value="#session.password#">
    <CFIF TRIM(qAllUserApps.LoginFormHiddenName) IS NOT "">
    	<cfinput type="hidden" name="#qAllUserApps.LoginFormHiddenName#" value="#qAllUserApps.LoginFormHiddenValue#">
    </CFIF>
    <cfinput type="submit" name="Login" value="Login" class="btn btn-success">
    
    </cfform>
    
    
    </td>
  </tr>
 </cfoutput> 
 <cfelse>
  <tr>
    <td colspan="4">You do not have access to any IOC Applications</td>
  </tr>
 </CFIF> 
</table>

 
 
</div>
<cfinclude template="../includes/footer.cfm">
