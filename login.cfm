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
};
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
};
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
</script>

</head>
<body>
<div class="wrapper full-page-wrapper page-login text-center">
 <div class="inner-page" id="login-page">
  <div class="logo"><img src="img/IOC-CWS-logo-black.png" alt="" />
  </div> <!-- END logo -->
   <!--- Lock user from attempting login until penality time is reached --->
  <CFIF IsDefined ("URL.error") AND IsDefined ("URL.errorNumber") AND  (URL.errorNumber NEQ 21 AND URL.errorNumber GT 0)>
   <div class="col-md-8 col-md-offset-2">
    <cfinclude template="error.cfm">
   </div>
  <cfelse>
  	<CFIF IsDefined ("URL.error") AND IsDefined ("URL.errorNumber") AND  URL.errorNumber IS 21>
     <div class="row"><div class="alert alert-danger col-md-8 col-md-offset-2">
      USERNAME / PASSWORD COMBO Invalid!
     </div></div>
    </CFIF>
   <div class="login-box center-block">
   
      <cfform action="../main/login/login.cfm" method="post" enctype="application/x-www-form-urlencoded" name="LoginForm" preloader="no" class="navbar-form navbar-right" id="LoginForm" onsubmit="return validateFormOnSubmit(this)">
     <!--- Username Group --->
     <p class="title">Use your username</p>
     <div class="form-group">
     <label for="username" class="control-label sr-only">Username</label>
     <div class="col-sm-12">
     	<div class="input-group userNameContainer">
     		<cfinput type="text" name="username" class="form-control" value="#variables.username#" maxlength="255" placeholder="username">
     		<span class="input-group-addon"><i class="fa fa-user"></i></span>
     	</div>
     </div>
     </div>
     <!--- Password Group --->
     <label for="password" class="control-label sr-only">Password</label>
     <div class="form-group">
     <div class="col-sm-12">
     	<div class="input-group passwordContainer">
     		<cfinput type="password" name="password" class="form-control" value="#variables.password#" maxlength="50" placeholder="password">
     		<span class="input-group-addon"><i class="fa fa-lock"></i></span>
     	</div>
     </div>
     </div>
     <div id="messageHolder" class="hide"> The username or password you entered is incorrect.</div>
     <!--- Login Submit Group --->
     <button type="submit" name="Login" class="btn btn-custom-primary btn-lg btn-block btn-login" onClick="this.form.submit()"><i class="fa fa-arrow-circle-o-right"></i> Login</button>
    </cfform>
    <div class="links">
     <p><a href="forgot.cfm">Forgot Username or Password?</a></p>
     <p><a href="newaccount.cfm">Create New Account</a></p>
    </div>
   </div>
  </CFIF>
 </div> <!-- END Inner -->
 <div class="push-sticky-footer"></div>
</div> <!-- END wrapper -->
<cfinclude template="includes/footer.cfm">
<script src="/js/forms/login.js"></script>
