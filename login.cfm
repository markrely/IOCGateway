<cfinclude template="includes/header.cfm">
<cfparam name="variables.username" default="">
<cfparam name="variables.password" default="">
<cfparam name="variables.UsersIP" default="#CGI.REMOTE_ADDR#">
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
    var toggleTextObj =document.getElementById('toggleLabelText');
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

<body>
<div class="wrapper full-page-wrapper page-login">
    <div class="logoX">
        <a href="index.cfm"><img src="images/website-logo_sized-big.png" alt="Susana A.Mendoza - State of Illinois Comptroller" title="Susana A.Mendoza - State of Illinois Comptroller" class="img-fluid"/></a>
    </div>
    <div class="container-fluid inner-page text-center">
        <div class="page-title">
            <h1>IOC Gateway - Login</h1>
        </div>
        <!--- Lock user from attempting login until penality time is reached --->
        <CFIF IsDefined ("URL.error") AND IsDefined ("URL.errorNumber") AND  (URL.errorNumber NEQ 21 AND URL.errorNumber GT 0)>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <cfinclude template="error.cfm">
                </div>
            </div>
        <cfelse>
        <CFIF IsDefined ("URL.error") AND IsDefined ("URL.errorNumber") AND  URL.errorNumber IS 21>
            <div class="alert alert-danger">
                USERNAME / PASSWORD COMBO Invalid!
            </div>
        </CFIF>
        <div class="row justify-content-center">
            <div class="col-10 col-lg-8 col-xl-6">
                <div class="login-box">
                    <cfform action="../main/login/login.cfm" method="post" enctype="application/x-www-form-urlencoded" name="LoginForm" preloader="no" class="login-form" id="LoginForm" onsubmit="return validateFormOnSubmit(this)">
                    <!--- Username Group --->
                    <div class="form-group row">
                        <label class="col-12 col-md-3 col-form-label">Username</label>
                        <div class="col-12 col-md-7">
                            <cfinput type="text" name="username" class="form-control" value="#variables.username#" maxlength="255" placeholder="username">
                        </div>
                    </div>
                    <!--- Password Group --->
                    <div class="form-group row">
                        <label class="col-12 col-md-3 col-form-label">Password</label>
                        <div class="col-12 col-md-7">
                            <cfinput type="password" name="password" class="form-control" value="#variables.password#" maxlength="50" placeholder="password" id="password">
                        </div>
                        <div class="col-12 col-md-2 pl-0">
                            <div class="custom-control custom-checkbox mt-2">
                                <input type="checkbox" class="custom-control-input" onChange="togglePassword(this);" id="customControlInline">
                                <label  class="custom-control-label showlabel" for="customControlInline" id="toggleLabelText">Show</label>
                            </div>
                        </div>
                    </div>
                    <!--- Login Submit Group --->
                    <div class="text-center mt-4">
                        <button type="submit" name="Login" class="btn btn-primary" onClick="this.form.submit()">Login</button>
                    </div>
                    </cfform>
                    <div class="text-center mt-3">
                        <span class="small"><a href="forgot.cfm">Forgot Password?</a></span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="small"><a href="ur.cfm">Forgot Username?</a></span>
                    </div>
                </div>
            </div>
        </div>
        </CFIF>
    </div> <!-- END Inner -->
    <div class="push-sticky-footer"></div>
</div> <!-- END wrapper -->
<cfinclude template="includes/footer.cfm">

