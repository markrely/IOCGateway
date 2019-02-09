<cfinclude template="includes/header.cfm">
<cfparam name="variables.Pending_firstName" default="">
<cfparam name="variables.Pending_MiddleName" default="">
<cfparam name="variables.Pending_LastName" default="">
<cfparam name="variables.Pending_email" default="">
<cfparam name="variables.Pending_PostalCode" default="">
<cfparam name="variables.Pending_Message" default="">
<cfparam name="variables.Pending_UserIP" default="#CGI.REMOTE_ADDR#">

<CFIF IsDefined ("form.Pending_Email")>

<CFSET structData.applicationToken = application.ApplicationToken>
<CFSET structData.firstName = form.Pending_FirstName>
<CFSET structData.middleName = form.Pending_MiddleName>
<CFSET structData.lastName = form.Pending_LastName>
<CFSET structData.email = form.Pending_Email>
<CFSET structData.postalCode = form.Pending_PostalCode>
<CFSET structData.message = form.Pending_Message>
<CFSET structData.AuthenticationMethod = 4>

 <cfinvoke
  component="security.IOCSecurity"
  method="IOCWallet"
  returnvariable="Results">
  <cfinvokeargument name="structData" value="#structData#">
</cfinvoke>
<!--- <cfdump var="#Results#">
<cfdump var="#structData#"> --->
</CFIF>
<div class="wrapper full-page-wrapper page-login text-center">
 <div class="inner-page" id="newaccount-page">
  <div class="logo"><a href="index.cfm"><img src="img/IOC-CWS-logo-black.png" alt="" /></a></div>
  <div class="Row">
   <CFIF IsDefined ("Results") AND IsDefined ("Results.Error") AND  Results.Error GT 0>
   <div class="col-md-8 col-md-offset-2">
   <cfinclude template="error.cfm"> <cfabort>
   </div>
   </CFIF>
  <div>


  <CFIF IsDefined ("Results") AND Results.Error Is 0>
   <div class="Row"><div class="col-sm-offset-3 col-sm-6">
   <div class="alert alert-success">
      CONGRATS! You successfully registered.  Check your email for more information!
   </div>
   </div></div><br/><br/><br/><br/>
  </CFIF>
  <div class="login-box center-block">
   <CFIF (IsDefined ("results.error") AND results.error is "duplicate") OR IsDefined ("VerifyStatus")>
   	<cfinclude template="alerts/index.cfm">
   <cfelse>
    <cfform method="post" enctype="application/x-www-form-urlencoded"  preloader="no" role="form" class="form-horizontal">

     <!--- First Name Group --->
     <p class="title">First Name</p>
     <div class="form-group">
     <label for="Pending_FirstName" class="control-label sr-only">First Name</label>
     <div class="col-sm-12">
     	<div class="input-group userFirstName">
     		<cfinput type="text" name="Pending_FirstName" message="Please first name" class="form-control" value="#variables.Pending_FirstName#" maxlength="55" placeholder="first name">
     		<span class="input-group-addon"><i class="fa fa-user"></i></span>
     	</div>
     </div>
     </div>
     <!--- Middle Name Group --->
     <p class="title">Middle Name (Optional)</p>
     <div class="form-group">
     <label for="Pending_MiddleName" class="control-label sr-only">Middle Name</label>
     <div class="col-sm-12">
     	<div class="input-group">
     		<cfinput type="text" name="Pending_MiddleName" message="Please middle name" class="form-control" value="#variables.Pending_MiddleName#" maxlength="25" placeholder="middle name">
     		<span class="input-group-addon"><i class="fa fa-user"></i></span>
     	</div>
     </div>
     </div>
     <!--- Last Name Group --->
     <p class="title">Last Name</p>
     <div class="form-group">
     <label for="Pending_LastName" class="control-label sr-only">Last Name</label>
     <div class="col-sm-12">
     	<div class="input-group userLastName">
     		<cfinput type="text" name="Pending_LastName" message="Please last name" class="form-control" value="#variables.Pending_LastName#" maxlength="55" placeholder="last name">
     		<span class="input-group-addon"><i class="fa fa-user"></i></span>
     	</div>
     </div>
     </div>
     <!--- Email --->
     <p class="title">Email</p>
     <div class="form-group">
     <label for="Pending_Email" class="control-label sr-only">Email</label>
     <div class="col-sm-12">
     	<div class="input-group userEmail">
     		<cfinput type="text" name="Pending_Email" message="Please enter a valid email address" required="no" class="form-control" value="#variables.Pending_Email#" maxlength="255" placeholder="Email">
     		<span class="input-group-addon"><i class="fa fa-envelope-o"></i></span>
     	</div>
     </div>
     </div>
     <!--- Postal Code --->
     <p class="title">Postal Code</p>
     <div class="form-group">
     <label for="Pending_PostalCode" class="control-label sr-only">Postal Code</label>
     <div class="col-sm-12">
     	<div class="input-group userPostalCode">
     		<cfinput type="text" name="Pending_PostalCode" message="Please enter a valid postal code" class="form-control" value="#variables.Pending_PostalCode#" maxlength="20" placeholder="Postal Code">
     		<span class="input-group-addon"><i class="fa fa-barcode"></i></span>
     	</div>
     </div>
     </div>
     <!--- Message --->
     <p class="title">Message (Optional)</p>
     <div class="form-group">
     <label for="Pending_Message" class="control-label sr-only">Message</label>
     <div class="col-sm-12">
     	<div class="input-group">
       <cftextarea
       	name="Pending_Message"
           enabled="no"
           class="form-control" rows="4" data-toggle="tooltip" data-original-title="Please enter any special request that you would like to request while resgistration / Any information regaring your access to specific Agency">
       </cftextarea>
     		<span class="input-group-addon"><i class="fa fa-comment-o"></i></span>
     	</div>
     </div>
     </div>
     <div id="messageHolder" class="hide"> The username or password you entered is incorrect.</div>
     <!--- Login Submit Group --->
     <button type="submit" name="RequestAccount" class="btn btn-custom-primary btn-lg btn-block btn-login"><i class="fa fa-arrow-circle-o-right"></i> Request Account</button>
    </cfform>
    <div class="links">
    <p><a href="login.cfm">Login</a></p>
    </div>
   </cfif>
  </div>
 </div>
 <div class="push-sticky-footer"></div>
</div>
<cfinclude template="includes/footer.cfm">
<script src="/js/forms/newaccount.js"></script>