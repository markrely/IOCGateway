<cfinclude template="includes/header.cfm">
<script>
function checkPass()
{
    //Store the password field objects into variables ...
    var NewPassword = document.getElementById('NewPassword');
    var ConfirmPassword = document.getElementById('ConfirmPassword');
    //Store the Confirmation Message Object ...
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
                <CFIF IsDefined ("Results.error") AND Results.error IS 1>
                    <div class="alert alert-danger">
                         No account found matching your input.  Please contact a system administrator for further help.
                    </div>
                <cfelseif IsDefined ("Results.error") AND Results.error IS 3>
                    <div class="alert alert-danger">
                        This password has been used before.  Please enter a new unique password.
                    </div>
                <cfelseif IsDefined ("Results.error") AND Results.error IS 200>
                    <div class="alert alert-danger">
                         The password/confirm password do not match please enter them EXACTLY.
                    </div>
                <cfelseif IsDefined ("Results.error") AND Results.error IS 1000>
                    <div class="alert alert-danger">
                        The password you entered does not meet the requirements. Please try again or contact a system administrator for further help.
                    </div>
                <cfelseif IsDefined ("Results.error") AND Results.error IS NOT 0>
                    <div class="alert alert-danger">
                        Your password reset was not authorized.  Please contact a system administrator and reference this Error code:<cfoutput> #Results.error#</cfoutput>
                    </div>
                </CFIF>
                <div class="login-box">
                    <cfform action="requiredreset.cfm" method="post" enctype="application/x-www-form-urlencoded" preloader="no" class="login-form" role="form">
                        <cfinput type="hidden" name="UsersIP" value="#CGI.REMOTE_ADDR#">
                        <cfinput type="hidden" name="AuthenticationMethod" value="7">
                        <cfinput type="hidden" name="ApplicationToken" value="#application.ApplicationToken#">
                        <cfinput type="hidden" name="username" value="#variables.username#">
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

                        <div id="confirmMessage" class="confirmMessage"></div>

                        <div class="alert alert-info"> Password Policy(Eg: P@ssw0rd)
                            <ul>
                                <li>Minimum 8 characters</li>
                                <li>At least one upper case character</li>
                                <li>At least one number (0-9)</li>
                                <li>At least one special character (!,@,#,$,%,^,&,*,?,_,~,-,(,))</li>
                            </ul>
                        </div>
                        <div class="text-center mt-4">
                            <cfinput type="submit" name="ResetPassword" class="btn btn-primary" value="Reset Password">
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
