<cfinclude template="includes/header.cfm">
<!--- Must be sent here from another page.  This page is a message handler --->
<CFIF NOT IsDefined ("URL.message")>
	<cflocation url="index.cfm?error=3">
</CFIF>
<cfoutput>
<div class="wrapper full-page-wrapper page-login text-center">
<div class="inner-page">
<div class="logo"><a href="index.cfm"><img src="img/kingadmin-logo.png" alt="" /></a></div>
<div class="col-md-6 col-md-offset-3">

    
                 <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">INFO</h3>
                    </div>
                    <div class="panel-body">
					<cfswitch expression="#URL.Message#">
                    	<cfcase value="SuccessResetPassword">You successfully reset your password</cfcase>
                        <cfcase value="SuccessPasswordResetRequest">You successfully requested to reset your password.  You should receive a link in your email within the next 15 minutes.  Make sure to check your spam folder if you cannot find it.</cfcase>
                        <cfcase value="true">You successfully registered! The site <a href="mailto:#application.webmasterEmail#">administrator</a> needs to activate your account. </cfcase>
                        <cfcase value="verify">Thank you for registering. An Email with a verification link will be sent to you within the next 15 minutes.</cfcase>
                    	<cfdefaultcase>Hmmmm... you are here but I don't know why???  </cfdefaultcase>
                    </cfswitch>
  
                    </div>
                  </div>
<div class="links">
<p><a href="index.cfm">Home</a></p>
<p><a href="login.cfm">Login</a></p>
</div>

</div>
</div>
	<div class="push-sticky-footer"></div>
</div>
</cfoutput>
 <cfinclude template="includes/footer.cfm">