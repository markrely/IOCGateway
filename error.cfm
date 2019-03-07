<cfoutput>
<CFIF IsDefined ("results.error") AND results.error EQ "1">
 <!--- New Registration Error - Email address already exist in the pending or users database --->

  <div class="alert alert-danger">
     Oops! <br/> The Email Address you attempted to register with already exist in our database. <br/>
     You account is either pending or is inactive. Please contact the site <a href="mailto:#application.webmasterEmail#">administrator</a> to gain access.
  </div>

 <div class="text-center mt-3">
  <a href="javascript:history.go(-1)" class="btn btn-primary mr-2">Go Back</a>
  <a href="#session.homewww#" class="btn btn-primary">Home</a>
 </div>
<cfelseif IsDefined ("VerifyStatus")>
 <!--- New Registration Email Token verified by user who received our email and clicked to verify. --->

   <div class="alert alert-danger">
     Oops! <br/>
     <CFIF VerifyStatus IS "NoVerificationRequired">
      Your registration was previously verified or your account is no longer in a pending status.  Contact the site <a href="mailto:#application.webmasterEmail#">administrator</a>
      if you require future assistance.
     <cfelse>
      Your registration has been verified.  The site  <a href="mailto:#application.webmasterEmail#">administrator</a> will activate your account shortly.
     </CFIF>
   </div>

<cfelseif IsDefined ("Results.error") AND Results.error IS 1>
 <!--- New Registration Email Token verified by user who received our email and clicked to verify. --->
   <div class="alert alert-danger">
      Oops! <br/>
       Username / password combo not found!
   </div>
<cfelseif IsDefined ("URL.ErrorNumber") AND URL.ErrorNumber IS 2>
 <!--- New Registration Email Token verified by user who received our email and clicked to verify. --->
   <div class="alert alert-danger">
     Oops! <br/>
       Your account has been deactivated.  Please contact system admin for further assistance!
   </div>
<cfelseif IsDefined ("URL.ErrorNumber") AND URL.ErrorNumber IS 3>
 <!--- New Registration Email Token verified by user who received our email and clicked to verify. --->
   <div class="alert alert-danger">
     Oops! <br/>
       Your account is Locked.  Please contact system admin for further assistance!
   </div>
 <cfelseif IsDefined ("URL.ErrorNumber") AND URL.ErrorNumber IS 5>

 <!--- New Registration Email Token verified by user who received our email and clicked to verify. --->
   <div class="alert alert-danger">
     Oops! <br/>
       Your Account is locked and deactivated.  Please contact system admin for further assistance!
   </div>
 <cfelseif IsDefined ("URL.ErrorNumber") AND URL.ErrorNumber IS 20>

 <!--- New Registration Email Token verified by user who received our email and clicked to verify. --->
   <div class="alert alert-danger">
     Oops! <br/>
      Your password has expired!
   </div>
 <cfelseif IsDefined ("URL.ErrorNumber") AND URL.ErrorNumber IS 21>

 <!--- New Registration Email Token verified by user who received our email and clicked to verify. --->
   <div class="alert alert-danger">
     Oops! <br/>
    The username / password combo does not exist.  Please verify that you have entered it correctly.
   </div>

<cfelse>
		  <!--- Maximum Login Attempts reached --->

  <div class="alert alert-danger">
     Oops! You have exceeded the maximum number of login attempts. <br/>
     Please contact the site administrator or wait 5 minutes and try again.
   </div>
 <div class="text-center mt-3">
  <a href="javascript:history.go(-1)" class="btn btn-primary mr-2">Go Back</a>
  <a href="#session.homewww#" class="btn btn-primary">Home</a>
 </div>
</CFIF>
</cfoutput>