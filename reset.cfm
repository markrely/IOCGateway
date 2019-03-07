<cfinclude template="includes/header.cfm">
<script>
function togglePassword(el){
var obj=document.getElementById('password');
var toggleTextObj =document.getElementById('toggleTextPwd');
// Checked State
var checked = el.checked;

if(checked){
// Changing type attribute
obj.type = 'text';
// Change the Text
toggleTextObj.textContent= "Hide";
} else{
// Changing type attribute
obj.type = 'password';
// Change the Text
toggleTextObj.textContent= "Show";
}
}

function togglePassword1(el){
var obj=document.getElementById('confirmpassword');
var toggleTextObj =document.getElementById('toggleTextPwd1');
// Checked State
var checked = el.checked;

if(checked){
// Changing type attribute
obj.type = 'text';
// Change the Text
toggleTextObj.textContent= "Hide";
} else{
// Changing type attribute
obj.type = 'password';
// Change the Text
toggleTextObj.textContent= "Show";
}
}

</script>

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

<div class="wrapper full-page-wrapper page-login">
    <div class="logoX">
        <a href="index.cfm"><img src="images/website-logo_sized-big.png" alt="Susana A.Mendoza - State of Illinois Comptroller" title="Susana A.Mendoza - State of Illinois Comptroller" class="img-fluid"/></a>
    </div>
    <div class="container-fluid inner-page text-center">
        <div class="page-title">
            <h1>IOC Gateway - Reset Password</h1>
        </div>
        <div class="row justify-content-center">
            <div class="col-10 col-lg-8 col-xl-6" id="reset-page">
                <!-- ERROR CODES:
                0 = PASS (everything ok)
                1 = Email Token match was NOT found
                2 = Email Token has already been used
                3 = Password reuse violation
                200 = Password and Password confirm do not match
                1000 = Email Token match found but stored password is not BCRYPT Hash    -->
                <CFIF IsDefined ("Results") AND Results.Error neq 0>
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
                </CFIF>
                <div class="login-box">
                    <cfform method="post" enctype="application/x-www-form-urlencoded" preloader="no" role="form" class="login-form">
                        <cfinput type="hidden" name="UsersIP" value="#variables.UsersIP#">
                        <cfinput type="hidden" name="EmailToken" value="#TRIM(variables.EmailToken)#">
                        <cfinput type="hidden" name="AuthenticationMethod" value="6">
                        <cfinput type="hidden" name="ApplicationToken" value="#application.ApplicationToken#">
                        <CFIF IsDefined ("Status.error") AND Status.error IS 3>
                            <div class="alert alert-danger">
                                The password does not meet the minimum requirements.
                            </div>
                        </CFIF>
                        <CFIF IsDefined ("Status.error") AND Status.error IS 4>
                            <div class="alert alert-danger">
                                You have already reset your password with this token or the token you are using has expired.
                            </div>
                        </CFIF>

                        <div class="form-group row">
                            <label class="col-12 col-md-3 col-form-label">Password</label>
                            <div class="col-12 col-md-7">
                                <cfinput type="password" name="NewPassword" message="Please enter a NEW password" class="form-control" value="#variables.NewPassword#" maxlength="50" placeholder="new password" id="password">
                            </div>
                            <div class="col-12 col-md-2 pl-0">
                                <div class="custom-control custom-checkbox mt-2">
                                    <input type="checkbox" class="custom-control-input" onChange="togglePassword(this);" id="customControlInline">
                                    <label  class="custom-control-label showlabel" for="customControlInline">Show</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-12 col-md-3 col-form-label">Confirm Password</label>
                            <div class="col-12 col-md-7">
                                <cfinput type="password" name="ConfirmPassword" id="confirmpassword" message="Please confirm your NEW password by typing it exactly" class="form-control" value="#variables.NewPassword#" maxlength="50" placeholder="confirm password" onkeyup="checkPass(); return false;">
                            </div>
                            <div class="col-12 col-md-2 pl-0">
                                <div class="custom-control custom-checkbox mt-2">
                                    <input type="checkbox" class="custom-control-input" onChange="togglePassword1(this);" id="customControlInline1">
                                    <label  class="custom-control-label showlabel" for="customControlInline1">Show</label>
                                </div>
                            </div>
                        </div>

                        <div class="alert alert-info"> Password Policy(Eg: P@ssw0rd)
                            <ul>
                                <li>Minimum 8 characters</li>
                                <li>At least one upper case character</li>
                                <li>At least one number (0-9)</li>
                                <li>At least one special character (!,@,#,$,%,^,&,*,?,_,~,-,(,))</li>
                            </ul>
                        </div>
                        <!-- Change this to a button or input when using this as a form -->
                        <div class="text-center mt-4">
                            <button type="submit" name="ResetPassword" class="btn btn-primary">Reset Password</button>
                        </div>
                    </cfform>
                    <div class="text-center mt-3">
                        <span class="small"><a href="login.cfm">Login</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="push-sticky-footer"></div>
</div>
<cfinclude template="includes/footer.cfm">
