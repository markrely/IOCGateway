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
        <div class="row justify-content-center">
            <div class="col-10 col-md-8 col-lg-6 col-xl-5">
                <div class="login-box">
                    <div class="alert alert-success">
                        <cfswitch expression="#URL.Message#">
                            <cfcase value="SuccessResetPassword">You successfully reset your password <a href="login.cfm">Click here to login</a></cfcase>
                            <cfcase value="SuccessPasswordResetRequest">You successfully requested a password reset.  <BR><BR>
                            You should receive a link in your email within the <b>next 15 minutes</b>.</cfcase>
                            <cfdefaultcase>Hmmmm... you are here but I don't know why???  </cfdefaultcase>
                        </cfswitch>
                    </div>
                    <div class="text-center mt-4">
                        <a href="login.cfm" class="btn btn-primary mr-2">Login</a>
                        <a href="#session.homewww#" class="btn btn-primary">Home</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="push-sticky-footer"></div>
</div>
</cfoutput>
<cfinclude template="includes/footer.cfm">