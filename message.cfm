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
   <h1>
    <div class="alert alert-success">
     <span class="clearfix title">
      <span class="text">
  
       <cfswitch expression="#URL.Message#">
        <cfcase value="SuccessResetPassword">You successfully reset your password <a href="login.cfm">Click here to login</a></cfcase>
        <cfcase value="SuccessPasswordResetRequest">You successfully requested a password reset.  <BR><BR>
         You should receive a link in your email within the <b>next 15 minutes</b>.</cfcase>
        <cfdefaultcase>Hmmmm... you are here but I don't know why???  </cfdefaultcase>
       </cfswitch>
    
      </span>
     </span>
    </div>
   </h1>
   <p>
    <a href="login.cfm" class="btn btn-custom-primary"><i class="fa fa-arrow-left"></i> Login</a>
    <a href="#session.homewww#" class="btn btn-primary"><i class="fa fa-home"></i> Home</a>
   </p>
  </div>
 </div>
 <div class="push-sticky-footer"></div>
</div>
</cfoutput>
<cfinclude template="includes/footer.cfm">