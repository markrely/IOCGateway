<cfinclude template="includes/header.cfm">
<script>
function checkPass()
{
    //Store the password field objects into variables ...
    var NewPassword = document.getElementById('NewPassword');
    var ConfirmPassword = document.getElementById('ConfirmPassword');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field
    //and the confirmation field
    if(NewPassword.value == ConfirmPassword.value){
        //The passwords match.
        //Set the color to the good color and inform
        //the user that they have entered the correct password
        ConfirmPassword.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords Match!"
    }else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        ConfirmPassword.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!"
    }
}

</script>
<CFSET variables.UsersIP = CGI.REMOTE_ADDR>
<CFSET variables.NewPassword = "">
<CFIF IsDefined ("form.NewPassword")>
	<CFSET variables.password = form.NewPassword>
    <CFSET variables.passwordconfirm = form.ConfirmPassword>
    <CFSET variables.username = form.username>
    <CFSET variables.AuthenticationMethod = form.AuthenticationMethod>
    <CFSET variables.ApplicationToken = form.ApplicationToken>
    <CFSET variables.IPAddress = CGI.REMOTE_ADDR>

	<cfinvoke
        component="security.IOCSecurity"
        method="IOCWallet"
        returnvariable="Results">
        <cfinvokeargument name="structData" value="#variables#">
     </cfinvoke>

   <CFIF IsDefined ("Results") AND Results.Error Is 0>
      <cflocation url="message.cfm?message=SuccessResetPassword">
  </cfif>

<cfelseif IsDefined ("URL.error") AND IsDefined ("cookie.k") AND IsDefined ("cookie.ID1") AND NOT IsDefined ("form.Notpassword")>
	<!--- Get username AND Agency Code --->
    <CFSET variables.k = cookie.k>
    <CFSET variables.ID1 = cookie.ID1>
     <cfinvoke
        component="security.IOCSecurity"
        method="GetUserPK"
        returnvariable="Results">
        <cfinvokeargument name="structData" value="#variables#">
     </cfinvoke>
       <CFIF Results.Success IS false>
      		<cflocation url="#session.applicationURL#?error=noentry2">
      </CFIF>
      <CFSET variables.username = results.username>
<cfelse>
	 <cflocation url="login.cfm?error=noentry">
</cfif>
<div class="wrapper full-page-wrapper page-login text-center">
 <div class="inner-page" id="reset-page">
  <div class="logo">
   <a href="index.cfm"><img src="img/IOC-CWS-logo-black.png" alt="" /></a>
  </div> <!-- END logo -->
  <div <CFIF IsDefined ("Results.error")> class="Row spacer"<cfelse> class="Row"</CFIF>><div class="col-sm-offset-2 col-sm-8">
    <CFIF IsDefined ("Results.error") AND Results.error IS 1>
     <div class="alert alert-danger">
      <p> No account found matching your input.  Please contact a system administrator for further help. </p>
     </div>
    <cfelseif IsDefined ("Results.error") AND Results.error IS 3>
     <div class="alert alert-danger">
      <p> This password has been used before.  Please enter a new unique password. </p>
     </div>

    <cfelseif IsDefined ("Results.error") AND Results.error IS 200>
     <div class="alert alert-danger">
      <p> The password/confirm password do not match please enter them EXACTLY.</p>
        </div>
   <cfelseif IsDefined ("Results.error") AND Results.error IS 1000>
     <div class="alert alert-danger">
      <p> The password you entered does not meet the requirements. Please try again or contact a system administrator for further help.</p>
        </div>
    <cfelseif IsDefined ("Results.error") AND Results.error IS NOT 0>
     <div class="alert alert-danger">
      <p> Your password reset was not authorized.  Please contact a system administrator and reference this Error code:<cfoutput> #Results.error#</cfoutput></p>
        </div>
    </CFIF>
  </div></div>
  <div class="login-box center-block">
   <cfform action="requiredreset.cfm" method="post" enctype="application/x-www-form-urlencoded" preloader="no" class="form-horizontal" role="form">
    <cfinput type="hidden" name="UsersIP" value="#CGI.REMOTE_ADDR#">
    <cfinput type="hidden" name="AuthenticationMethod" value="7">
    <cfinput type="hidden" name="ApplicationToken" value="#application.ApplicationToken#">
    <cfinput type="hidden" name="username" value="#variables.username#">

    <!--- <label for="password" class="control-label sr-only">Password</label> --->
    <div class="form-group">
     <div class="col-sm-12">
      <div class="input-group userPassword">
       <cfinput type="password" name="NewPassword" message="Please enter a NEW password" class="form-control" value="#variables.NewPassword#" maxlength="50" placeholder="new password">
       <span class="input-group-addon"><i class="fa fa-lock"></i></span>
      </div>
     </div>
    </div>
    <label for="password" class="control-label sr-only">Confirm Password</label>
    <div class="form-group">
     <div class="col-sm-12">
      <div class="input-group userConfirmPassword">
       <cfinput type="password" name="ConfirmPassword" message="Please confirm your NEW password by typing it exactly" class="form-control" value="#variables.NewPassword#" maxlength="50" placeholder="confirm password" onkeyup="checkPass(); return false;">
       <span class="input-group-addon"><i class="fa fa-lock"></i></span>
      </div>
     </div>
    </div>
    <div class="form-group">
     <div class="col-sm-12">
      <div class="fieldWrapper">
      <span id="confirmMessage" class="confirmMessage"></span>
      </div>
     </div>
    </div>

    <div id="messageHolder" class="hide"> The username or password you entered is incorrect.</div>
    <div class="alert alert-info"> Password Policy(Eg: P@ssw0rd)
     <li>Minimum 8 characters</li>
     <li>At least one upper case character</li>
     <li>At least one number (0-9)</li>
     <li>At least one special character (!,@,#,$,%,^,&,*,?,_,~,-,(,))</li>
    </div>
  <cfinput type="submit" name="ResetPassword" class="btn btn-custom-primary btn-lg btn-block btn-login" value="Reset Password">
   </cfform>
   <div class="links">
    <p><a href="login.cfm">Login</a></p>
   </div>
  </div>
 </div>
 <div class="push-sticky-footer"></div>
</div>
<cfinclude template="includes/footer.cfm">
<script src="/js/forms/requiredreset.js"></script>