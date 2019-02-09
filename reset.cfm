<cfinclude template="includes/header.cfm">
<CFSET variables.UsersIP = CGI.REMOTE_ADDR>
<CFSET variables.NewPassword = "">
<CFSET variables.EmailToken = "">
<CFIF IsDefined ("URL.Token") AND NOT IsDefined ("form.password")>
	<CFSET variables.EmailToken = URL.Token>
<cfelseif IsDefined ("form.password")>
 <cfinvoke
  component="Security.IOCSecurity"
  method="IOCWallet"
  returnvariable="Results">
  <cfinvokeargument name="structData" value="#form#">
 </cfinvoke>

 <!--- <cfdump var="#Results#"><cfabort> --->
   <CFIF IsDefined ("Results") AND Results.Error Is 0>
      <cflocation url="message.cfm?message=SuccessResetPassword">
  </cfif>
   <CFSET variables.EmailToken = form.EmailToken>
<cfelse>
	 <cflocation url="login.cfm?error=noentry">
</cfif>

<div class="wrapper full-page-wrapper page-login text-center">
 <div class="inner-page" id="reset-page">
  <div class="logo">
   <a href="index.cfm"><img src="img/IOC-CWS-logo-black.png" alt="" /></a>
  </div> <!-- END logo -->
  <!-- ERROR CODES:
   0 = PASS (everything ok)
   1 = Email Token match was NOT found
   2 = Email Token has already been used
   3 = Password reuse violation
   200 = Password and Password confirm do not match
   1000 = Email Token match found but stored password is not BCRYPT Hash    -->
  <CFIF IsDefined ("Results") AND Results.Error neq 0>
    <div class="Row">
    <div class="col-sm-offset-3 col-sm-6">
    <div class="alert alert-danger">
       <cfif Results.Error eq 1>
        	Email Token match was NOT found
       <cfelseif Results.Error eq 2>
        	Email Token has already been used
       <cfelseif Results.Error eq 3>
        	Password reuse violation
        <cfelseif Results.Error eq 4>
        	Password Policy not met.  Password requires mixture of alpha-numerical with at least 1 special character.
        <cfelseif Results.Error GTE 5 AND Results.Error LTE 10>
        	Password Policy not met.  Password requires mixture of alpha-numerical with at least 1 special character. 
       <cfelseif Results.Error eq 200>
        	Password and Password confirm do not match
       <cfelseif Results.Error eq 1000>
        	Email Token match found but stored password is not BCRYPT Hash
       <cfelse>
        	Please Contact your admin for further notification (<cfoutput>#Results.Error#</cfoutput>).
       </cfif>
    </div>
    </div>
    </div>
   </CFIF>
  <div class="login-box center-block">
   <cfform method="post" enctype="application/x-www-form-urlencoded" preloader="no" role="form" class="form-horizontal">
    <cfinput type="hidden" name="UsersIP" value="#variables.UsersIP#">
    <cfinput type="hidden" name="EmailToken" value="#TRIM(variables.EmailToken)#">
    <cfinput type="hidden" name="AuthenticationMethod" value="6">
    <cfinput type="hidden" name="ApplicationToken" value="#application.ApplicationToken#">
    <CFIF IsDefined ("Status.error") AND Status.error IS 3>
    	<div class="alert alert-danger">
    	 <p> The password does not meet the minimum requirements. </p>
     </div>
    </CFIF>
    <CFIF IsDefined ("Status.error") AND Status.error IS 4>
    	<div class="alert alert-danger">
    	 <p> You have already reset your password with this token or the token you are using has expired.</p>
     </div>
    </CFIF>

    <!--- <label for="password" class="control-label sr-only">Password</label> --->
    <div class="form-group">
     <div class="col-sm-12">
      <div class="input-group userPassword">
       <cfinput type="password" name="password" class="form-control" value="#variables.NewPassword#" maxlength="50" placeholder="new password">
       <span class="input-group-addon"><i class="fa fa-lock"></i></span>
      </div>
     </div>
    </div>
    <label for="password" class="control-label sr-only">Confirm Password</label>
    <div class="form-group">
     <div class="col-sm-12">
      <div class="input-group userConfirmPassword">
       <cfinput type="password" name="PasswordConfirm" class="form-control" value="#variables.NewPassword#" maxlength="50" placeholder="confirm password">
       <span class="input-group-addon"><i class="fa fa-lock"></i></span>
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
    <!-- Change this to a button or input when using this as a form -->
    <button type="submit" name="ResetPassword" class="btn btn-custom-primary btn-lg btn-block btn-login"><i class="fa fa-arrow-circle-o-right"></i> Reset Password</button>
   </cfform>
   <div class="links">
    <p><a href="login.cfm">Login</a></p>
   </div>
  </div>
 </div>
 <div class="push-sticky-footer"></div>
</div>
<cfinclude template="includes/footer.cfm">
<script src="js/forms/reset.js"></script>