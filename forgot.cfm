<cfinclude template="includes/header.cfm">
<script language="javascript" type="text/javascript">
<!--
function openCaptchaDictionary(url) {
	newwindow=window.open(url,'name','height=400,width=350');
	if (window.focus) {newwindow.focus()}
	return false;
}

// -->
</script>
<CFIF IsDefined ("form.CaptchaWord")>

 <cfinvoke
  component="security.IOCSecurity"
  method="RequestPasswordReset"
  returnvariable="IsBot">
  <cfinvokeargument name="formData" value="#form#">
 </cfinvoke>
	<CFIF IsBot IS "false">
  		<cflocation url="message.cfm?message=SuccessPasswordResetRequest">
	</CFIF>
</CFIF>
<!--- Get Random Captcha word --->
<!--- Fancy Captcha --->
<cfinvoke
 component="security.IOCSecurity"
 method="FancyCaptcha"
 returnvariable="CaptchaArray">
</cfinvoke>

<!--- <cfdump var="#CaptchaArray#"> --->
<CFSET IDList = CaptchaArray[2][1][1]>
<CFSET NameList = CaptchaArray[2][1][2]>
<CFSET DescriptionList = CaptchaArray[2][1][3]>

<cfparam name="variables.Email" default="">
<cfparam name="variables.UsersIP" default="#CGI.REMOTE_ADDR#">
<!--- <cfparam name="variables.ApplicationID" default=""> --->
<cfif IsDefined ("form.CaptchaWord") and IsBot IS "true">
 <cfset variables.Email = form.EMAIL>
</cfif>
<div class="wrapper full-page-wrapper page-login text-center">
 <div class="inner-page" id="forgot-password">
  <div class="logo"><a href="index.cfm"><img src="img/IOC-CWS-logo-black.png" alt="" /></a></div>
   <div class="login-box center-block">
    <cfform method="post" enctype="application/x-www-form-urlencoded" name="ForgotPassword" preloader="no" role="form"  class="form-horizontal">
     <cfinput type="hidden" name="captcha_check" value="#CaptchaArray[3][1][2]#">
     <cfinput type="hidden" name="captcha_check2" value="#CaptchaArray[3][1][3]#">
     <cfinput type="hidden" name="UsersIP" value="#variables.UsersIP#">
     <cfinput type="hidden" name="ApplicationToken" value="#application.ApplicationToken#">
     <p class="title" align="center">PASSWORD RESET REQUEST</p>
     <!--- Email Group --->
     <div class="form-group">
     <label for="ResetPassword" class="control-label sr-only">Reset Password</label>
     	<div class="col-sm-12">
     		<div class="input-group useremail">
     		<cfinput type="text" name="email" class="form-control" value="#variables.email#" maxlength="255" placeholder="Enter your email address here">
     		<span class="input-group-addon"><i class="fa fa-user"></i></span>
     		</div>
     	</div>
     </div>

     <!--- Captcha Group --->
      <cfoutput>
     <label for="Captcha" class="control-label sr-only">Captcha</label>
     <div class="form-group">
     	<div class="col-sm-12">
         <div class="col-sm-offset-1 col-sm-12">
                	Select the <b>#CaptchaArray[1][1][3]#</b> : <a href="captchahelp.cfm" onclick="return openCaptchaDictionary('captchahelp.cfm')"><b>(What is this?)</b></a>
         </div>
     		<p align="center">

           <cfloop index="i" from="1" to="#ListLen(NameList)#">
           		<CFSET ThisID = ListGetAt(IDList,i)>
            	   <span class="input-group-addon pull-center">
                   	<cfinput type="radio" name="CaptchaWord" value="#ThisID#">&nbsp;<i class="#ListGetAt(NameList,i)#"></i></center>
                   </span>
            </cfloop>

            </p>
     	</div>
     </div>
     </cfoutput>
     <!--- WARNINGS --->
     <div id="messageHolder" class="hide"></div>
      <CFIF IsDefined ("IsBot") AND IsBot IS "true">
       <div class="alert alert-danger">
        The captcha selected is incorrect.  Please select captcha correctly.
       </div>
      </CFIF>
      <CFIF IsDefined ("IsBot") AND IsBot IS "NoEmailMatch">
      <div class="alert alert-danger">
       There is no account with the email address you entered.
      </div>
      </CFIF>
     <!--- Reset Submit --->
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
<script src="js/forms/forgot.js"></script>