<!--- Validate username and password length and remove # symbols  --->
<script>
function validateFormOnSubmit(theForm) {
var reason = "";

  reason += validateUsername(theForm.username);
  reason += validatePassword(theForm.password);
      
  if (reason != "") {
    alert("Some fields need correction:\n" + reason);
    return false;
  }

  return true;
}
function validateUsername(fld) {
    var error = "";
    var illegalChars = /#/; // do not allow pound
 
    if (fld.value == "") {
        fld.style.background = 'lightYellow'; 
        error = "You didn't enter a username.\n";
    } else if ((fld.value.length < 2) || (fld.value.length > 255)) {
        fld.style.background = 'lightYellow'; 
        error = "The username is the wrong length.\n";
    } else if (illegalChars.test(fld.value)) {
        fld.style.background = 'lightYellow'; 
        error = "The username contains illegal characters.\n";
    } else {
        fld.style.background = 'White';
    } 
    return error;
}

function validatePassword(fld) {
    var error = "";
    var illegalChars = /#/; // do not allow pound 
 
    if (fld.value == "") {
        fld.style.background = 'lightYellow';
        error = "You didn't enter a password.\n";
    } else if ((fld.value.length < 3) || (fld.value.length > 55)) {
        error = "The password is the wrong length. \n";
        fld.style.background = 'lightYellow';
    } else if (illegalChars.test(fld.value)) {
        error = "The password contains illegal characters.\n";
        fld.style.background = 'lightYellow';
    } else {
        fld.style.background = 'White';
    }
   return error;
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

</script>
<cfoutput>
    <div class="wrapper full-page-wrapper page-login">
        <div class="logoX">
            <a href="index.cfm"><img src="images/website-logo_sized-big.png" alt="Susana A.Mendoza - State of Illinois Comptroller" title="Susana A.Mendoza - State of Illinois Comptroller" class="img-fluid"/></a>
        </div>
        <div class="container-fluid inner-page text-center">
            <div class="page-title">
                <h1>IOC Gateway - Login</h1>
            </div>
            <div class="row justify-content-center">
                <div class="col-10 col-lg-8 col-xl-6">
                    <div class="login-box">
                        <cfform action="../main/login/login.cfm" method="post" enctype="application/x-www-form-urlencoded" name="LoginForm" preloader="no" class="login-form" id="LoginForm" onsubmit="return validateFormOnSubmit(this)">
                            <CFIF IsDefined("URL.error") AND URL.error is true>
                                    <div class="alert alert-danger">Incorrect Login!</div>
                            </CFIF>
                            <cfinput type="hidden" name="loginform" value="true">
                            <div class="form-group row">
                                <label class="col-12 col-md-3 col-form-label">Username</label>
                                <div class="col-12 col-md-7">
                                    <cfinput type="text" name="username" message="Please enter a valid username" class="form-control" id="username" size="20" maxlength="255" placeholder="Username">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-12 col-md-3 col-form-label">Password</label>
                                <div class="col-12 col-md-7">
                                    <cfinput type="password" name="password" message="Please enter a valid password" class="form-control" id="password" size="20" maxlength="25" placeholder="Password">
                                </div>
                                <div class="col-12 col-md-2 pl-0">
                                    <div class="custom-control custom-checkbox mt-2">
                                        <input type="checkbox" class="custom-control-input" onChange="togglePassword(this);" id="customControlInline">
                                        <label  class="custom-control-label showlabel" for="customControlInline">Show</label>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center mt-4">
                                <cfinput type="submit" name="Login" id="Login" class="btn btn-primary loginButton" value="Login">

                                <div class="small mt-3"><a href="#application.homewww#/forgot.cfm">Forgot Password?</a>&nbsp;&nbsp;&nbsp;<a href="#application.homewww#/ur.cfm">Forgot Username?</a></div>
                            </div>
                        </cfform>
                    </div>
                </div>
            </div>
        </div>
        <div class="push-sticky-footer"></div>
    </div>
</cfoutput>
