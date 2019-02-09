<header class="navbar-inverse" >
<div class="container">
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
<cfoutput>	
<nav role="navigation">

  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="##bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#application.homewww#">IOC GATEWAY</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="#PageSecurity#"><a href="#application.homewww#/Security">Security</a></li>
        <li class="#PageHelp#"><a href="#application.homewww#/help">Help</a></li>
      </ul>
 
     
      <cfform action="../main/login/login.cfm" method="post" enctype="application/x-www-form-urlencoded" name="LoginForm" preloader="no" class="navbar-form navbar-right" id="LoginForm" onsubmit="return validateFormOnSubmit(this)">
             	<CFIF IsDefined("URL.error") AND URL.error is true>
                	<span class="label label-warning">Incorrect Login!</span>
                </CFIF> 
            	<cfinput type="hidden" name="loginform" value="true">
              		&nbsp;&nbsp;&nbsp;&nbsp;
              	<cfinput type="text" name="username" message="Please enter a valid username" class="formInput" id="username" size="20" maxlength="255" placeholder="Username">
              		&nbsp;&nbsp;&nbsp;&nbsp;
              	<cfinput type="password" name="password" message="Please enter a valid password" class="formInput shiftIcon" id="password" size="20" maxlength="25" placeholder="Password">
              	<cfinput type="submit" name="Login" id="Login" class="loginButton" value="Login">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#application.homewww#/forgot.cfm" class="btn btn-primary">Forgot Password?</a>
        </cfform>
     
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
</cfoutput>
</div>
</header>