<cfinclude template="includes/header.cfm">
<!--- Must be sent here from another page.  This page is a message handler --->
<CFIF NOT IsDefined ("URL.message")>
	<cflocation url="index.cfm?error=3">
</CFIF>

<cfoutput>
<div class="wrapper full-page-wrapper page-login">
    <div class="logoX">
        <a href="index.cfm"><img src="images/website-logo_sized-big.png" alt="Susana A.Mendoza - State of Illinois Comptroller" title="Susana A.Mendoza - State of Illinois Comptroller" class="img-fluid"/></a>
    </div>
    <div class="container-fluid inner-page text-center">
        <div class="page-title">
            <h1>IOC Gateway - INFO</h1>
        </div>
        <div class="row justify-content-center">
            <div class="col-10 col-md-8 col-lg-6 col-xl-5">
                <div class="login-box">
                    <div class="alert alert-success">
                        <cfswitch expression="#URL.Message#">
                            <cfcase value="SuccessResetPassword">You successfully reset your password</cfcase>
                            <cfcase value="SuccessPasswordResetRequest">You successfully requested to reset your password.  You should receive a link in your email within the next 15 minutes.  Make sure to check your spam folder if you cannot find it.</cfcase>
                            <cfcase value="true">You successfully registered! The site <a href="mailto:#application.webmasterEmail#">administrator</a> needs to activate your account. </cfcase>
                            <cfcase value="verify">Thank you for registering. An Email with a verification link will be sent to you within the next 15 minutes.</cfcase>
                            <cfdefaultcase>Hmmmm... you are here but I don't know why???  </cfdefaultcase>
                        </cfswitch>
                    </div>
                    <div class="text-center mt-4">
                        <a href="index.cfm" class="btn btn-primary mr-2">Home</a>
                        <a href="login.cfm" class="btn btn-primary">Login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
	<div class="push-sticky-footer"></div>
</div>
</cfoutput>
<cfinclude template="includes/footer.cfm">