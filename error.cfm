<cfoutput>
<CFIF IsDefined ("results.error") AND results.error EQ "1">
 <!--- New Registration Error - Email address already exist in the pending or users database --->
 <h1>
  <div class="alert alert-danger">
   <span class="clearfix title">
    <span class="text">
     Oops! <br/> The Email Address you attempted to register with already exist in our database. <br/>
     You account is either pending or is inactive. Please contact the site <a href="mailto:#application.webmasterEmail#">administrator</a> to gain access.
    </span>
   </span>
  </div>
 </h1>
 <p>
  <a href="javascript:history.go(-1)" class="btn btn-custom-primary"><i class="fa fa-arrow-left"></i> Go Back</a>
  <a href=#session.homewww# class="btn btn-primary"><i class="fa fa-home"></i> Home</a>
 </p>
<cfelseif IsDefined ("VerifyStatus")>
 <!--- New Registration Email Token verified by user who received our email and clicked to verify. --->
 <div class="">
  <h1>
   <div class="alert alert-danger">
   <span class="clearfix title">
    <span class="text">
     Oops! <br/>
     <CFIF VerifyStatus IS "NoVerificationRequired">
      Your registration was previously verified or your account is no longer in a pending status.  Contact the site <a href="mailto:#application.webmasterEmail#">administrator</a>
      if you require future assistance.
     <cfelse>
      Your registration has been verified.  The site  <a href="mailto:#application.webmasterEmail#">administrator</a> will activate your account shortly.
     </CFIF>
    </span>
   </span>
   </div>
  </h1>
 </div>
<cfelseif IsDefined ("Results.error") AND Results.error IS 1>

 <!--- New Registration Email Token verified by user who received our email and clicked to verify. --->
 <div class="">
  <h1>
   <div class="alert alert-danger">
   <span class="clearfix title">
    <span class="text">
     Oops! <br/>
       Username / password combo not found!
    </span>
   </span>
   </div>
  </h1>
 </div>
<cfelseif IsDefined ("URL.ErrorNumber") AND URL.ErrorNumber IS 2>

 <!--- New Registration Email Token verified by user who received our email and clicked to verify. --->
 <div class="">
  <h1>
   <div class="alert alert-danger">
   <span class="clearfix title">
    <span class="text">
     Oops! <br/>
       Your account has been deactivated.  Please contact system admin for further assistance!
    </span>
   </span>
   </div>
  </h1>
 </div>
<cfelseif IsDefined ("URL.ErrorNumber") AND URL.ErrorNumber IS 3>

 <!--- New Registration Email Token verified by user who received our email and clicked to verify. --->
 <div class="">
  <h1>
   <div class="alert alert-danger">
   <span class="clearfix title">
    <span class="text">
     Oops! <br/>
       Your account is Locked.  Please contact system admin for further assistance!
    </span>
   </span>
   </div>
  </h1>
 </div>
 <cfelseif IsDefined ("URL.ErrorNumber") AND URL.ErrorNumber IS 5>

 <!--- New Registration Email Token verified by user who received our email and clicked to verify. --->
 <div class="">
  <h1>
   <div class="alert alert-danger">
   <span class="clearfix title">
    <span class="text">
     Oops! <br/>
       Your Account is locked and deactivated.  Please contact system admin for further assistance!
    </span>
   </span>
   </div>
  </h1>
 </div>
 <cfelseif IsDefined ("URL.ErrorNumber") AND URL.ErrorNumber IS 20>

 <!--- New Registration Email Token verified by user who received our email and clicked to verify. --->
 <div class="">
  <h1>
   <div class="alert alert-danger">
   <span class="clearfix title">
    <span class="text">
     Oops! <br/>
      Your password has expired!
    </span>
   </span>
   </div>
  </h1>
 </div>
 <cfelseif IsDefined ("URL.ErrorNumber") AND URL.ErrorNumber IS 21>

 <!--- New Registration Email Token verified by user who received our email and clicked to verify. --->
 <div class="">
  <h1>
   <div class="alert alert-danger">
   <span class="clearfix title">
    <span class="text">
     Oops! <br/>
    The username / password combo does not exist.  Please verify that you have entered it correctly.
    </span>
   </span>
   </div>
  </h1>
 </div>

<cfelse>
		  <!--- Maximum Login Attempts reached --->
 <h1>
  <div class="alert alert-danger">
   <span class="clearfix title">
    <span class="text">
     Oops! You have exceeded the maximum number of login attempts. <br/>
     Please contact the site administrator or wait 5 minutes and try again.
    </span>
   </span>
  </div>
 </h1>
 <p>
  <a href="javascript:history.go(-1)" class="btn btn-custom-primary"><i class="fa fa-arrow-left"></i> Go Back</a>
  <a href="#session.homewww#" class="btn btn-primary"><i class="fa fa-home"></i> Home</a>
 </p>
</CFIF>
</cfoutput>