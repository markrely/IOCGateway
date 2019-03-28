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
  method="CheckCapchaAnswer"
  returnvariable="IsBot">
  <cfinvokeargument name="formData" value="#form#">
 </cfinvoke>
	<CFIF IsBot IS "false">
        
        <cfinvoke
            component="security.IOCSecurity"
            method="GetUsernameForReovery"
            returnvariable="qUsers">
            <cfinvokeargument name="formData" value="#form#">
        </cfinvoke>
        
	</CFIF>
<cfelseif IsDefined("form.SendUsername") AND IsDefined("form.ID") AND IsNumeric(form.ID)>

	   <cfinvoke
            component="security.IOCSecurity"
            method="SendForgottenUsername">
            <cfinvokeargument name="userID" value="#form.ID#">
        </cfinvoke>


</CFIF>

<!--- Get Random Captcha word --->
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
 <cfset variables.Email = form.Email>
</cfif>

<div class="wrapper full-page-wrapper page-login">
    <div class="logoX">
        <a href="index.cfm"><img src="images/website-logo_sized-big.png" alt="Susana A.Mendoza - State of Illinois Comptroller" title="Susana A.Mendoza - State of Illinois Comptroller" class="img-fluid"/></a>
    </div>
    <div class="container-fluid inner-page text-center">
        <div class="page-title">
            <h1>IOC Gateway - Recover Username</h1>
        </div>
        <div class="row justify-content-center">
            <div class="col-10 col-lg-8 col-xl-6">
            <CFIF NOT IsDefined("IsBot") OR (IsDefined("IsBot") AND IsBot IS true)>
                <div class="login-box" id="forgot-password">
                    <cfform method="post" enctype="application/x-www-form-urlencoded" name="ForgotUsername" preloader="no" role="form"  class="login-form">
                        <cfinput type="hidden" name="captcha_check" value="#CaptchaArray[3][1][2]#">
                        <cfinput type="hidden" name="captcha_check2" value="#CaptchaArray[3][1][3]#">
                        <cfinput type="hidden" name="UsersIP" value="#variables.UsersIP#">
                        <cfinput type="hidden" name="ApplicationToken" value="#application.ApplicationToken#">
                        <!--- Email  --->
                        <div class="form-group row">
                            <label for="FirstName" class="col-sm-12 col-md-3 col-form-label">Email</label>
                            <div class="col-sm-12 col-md-9">
                                <div class="firstname">
     		                        <cfinput type="text" name="Email" message="Please enter a valid email" validateat="onSubmit" validate="email" required="yes" class="form-control" value="#variables.Email#" maxlength="255" placeholder="Enter your email">
     		                    </div>
                            </div>
                        </div>
                        
                        <!--- Captcha Group --->
                        <cfoutput>
                            <div class="form-group">
                	            Select the <b>#CaptchaArray[1][1][3]#</b> : <a href="captchahelp.cfm" onclick="return openCaptchaDictionary('captchahelp.cfm')"><b>(What is this?)</b></a>
                                <div class="usercaptcha mt-1">
                                    <cfloop index="i" from="1" to="#ListLen(NameList)#">
                                        <CFSET ThisID = ListGetAt(IDList,i)>
                                        <span class="input-group-addon pull-center">
                                            <cfinput type="radio" name="CaptchaWord" value="#ThisID#">&nbsp;<i class="#ListGetAt(NameList,i)#"></i>
                                        </span>
                                    </cfloop>
                                </div>
     	                    </div>
                        </cfoutput>
                        
                        <CFIF IsDefined("form.SendUsername") AND IsDefined("form.ID") AND IsNumeric(form.ID)>
                        	 <div class="alert alert-success">
                                You should receive your username by email within 30 minutes.  If you do not see it, make sure to check your spam
                             </div>
                        </CFIF>
					
                        <CFIF (IsDefined ("IsBot") AND IsBot IS "true") OR IsDefined ("form.Captcha_Check") AND NOT IsDefined("IsBot")>
                        	
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
                        <div class="text-center mt-4">
                            <button type="submit" name="FindUserName" class="btn btn-primary">Find Username</button>
                        </div>
                    </cfform>
                    <div class="text-center mt-3">
                        <a href="login.cfm" class="small">Login</a>
                    </div>
                </div>
            <cfelse>
            	<!--- ****************************************** --->
            	<!--- ****************************************** --->
                <div class="login-box" id="forgot-password">
              <cfoutput> 
               <CFIF qUsers.recordcount GT 0>
              		<cfform method="post" enctype="multipart/form-data" preloader="no"> 
                      <cfinput type="hidden" name="ID" value="#qUsers.userID#">
                     
                        <div class="form-group row">
                            <div class="col-sm-12 col-md-9 alert alert-success">
                                 Your email address was found.  <strong>Click "Recover"</strong> to receive an email with your username. 
                            </div>
                        </div>
                         <div class="form-group row">
                         <div class="col-sm-12 col-md-9">
                                <cfinput type="submit" name="SendUsername" value="Recover" class="btn btn-primary">&nbsp;&nbsp;&nbsp;
                                <a href="ur.cfm" class="btn btn-primary">Try again?</a>
                           </div>
                          </div>
                      </cfform>
                  <cfelse>
               	  <div class="form-group row">
                  	 <div class="col-sm-12 col-md-9">
                     	No accounts with the email address  "<strong>#Form.Email#</strong>" were found. <BR>
                        <a href="ur.cfm" class="btn btn-primary">Try again?</a>
                     </div>
                  </div>
               </CFIF>         
			  </cfoutput>
              </div>
            </CFIF>    
            </div>
        </div>
    </div>
    <div class="push-sticky-footer"></div>
</div>
<cfinclude template="includes/footer.cfm">
