<cfcomponent extends="ApplicationProxy">
<CFSET this.sessionmanagement = true>
<cfcookie name="memberwww" value="http://gateway.ioc-dev.ioc.com/main" expires="10">
<cfcookie name="rootwww" value="http://gateway.ioc-dev.ioc.com/" expires="10">
<cfsetting requesttimeout="0">
 <!--- Initialize application variables --->       
<cffunction name="onApplicationStart" returnType="any">
	<CFSET application.logindate = "#DATEFORMAT(NOW(), 'mm/dd/yyyy')#">
    <CFSET application.SecurityDataSource = "IOCUsers">
    <CFSET application.homewww =  "http://gateway.ioc-dev.ioc.com">
    <CFSET application.memberhomewww =  "http://gateway.ioc-dev.ioc.com/main">
    <CFSET application.StyleCSS = "href='http://gateway.ioc-dev.ioc.com/css/main.css' rel='stylesheet' type='text/css' name='styles'">
    <CFSET application.AutoEmail = "automessages@smtp.illinoiscomptroller.com">
    <CFSET application.webmasterEmail = "andrewp@illinoiscomptroller.gov">
    <CFSET application.WebSiteName = "IOC - Gateway">
    <CFSET application.DecodeKey = "Lxp/bIqzt9DlkT1S+Ufwpw==">
    <CFSET application.EncoderType = "Base64">
	<CFSET application.ApplicationToken = "IOCGatewayToken_DEV">
</cffunction> 

    
    <!--- OnRequest Start --->
	<cffunction name="onRequestStart" access="public">
        <CFSET session.homewww = "http://gateway.ioc-dev.ioc.com">
  		<CFSET session.memberhomewww = "http://gateway.ioc-dev.ioc.com/main">
        <CFSET Session.LoginData.enabled = "NA">
        <CFSET Session.LoginData.expirationDate = "NA">
        <CFSET Session.LoginData.expires = "NA">
        <CFSET Session.LoginData.FoundUser = "NA">
        <CFSET Session.LoginData.EULAApproved = "NA">
        <CFSET Session.WebsiteName = "IOC - Gateway">
		<CFSET Session.DecodeKey = "Lxp/bIqzt9DlkT1S+Ufwpw==">
        <CFSET Session.EncoderType = "Base64">
        <cfset REQUEST.RootDirectory = GetDirectoryFromPath(GetCurrentTemplatePath()) />
        <cfinvoke
          component="security.IOCSecurity"
          method="GetApplicationSecuritySettings"
          returnvariable="qConfigSettings">
          <cfinvokeargument name="IncomingApplicationToken" value="#application.ApplicationToken#">
        </cfinvoke>

        <CFSET this.pslookup = CGI.SCRIPT_NAME>
        <CFIF IsDefined ("qAppSettings.LoginPenanceTime") AND qAppSettings.recordcount GT 0>
			<CFSET LoginPenanceTime = VAL(qAppSettings.LoginPenanceTime)>
            <CFSET LoginAttemptLimit = VAL(qAppSettings.PasswordAttemptLimit)>
            <CFSET application.webmasterEmail = qAppSettings.WebmasterEmail>
        <cfelse>
			<CFSET LoginPenanceTime = 5>
            <CFSET LoginAttemptLimit = 5>
        </CFIF>
        <CFIF IsDefined ("Session.LoginData.AttemptNumber") AND IsDefined ("Session.LoginData.LoginStartTime")>
         	<CFIF IsDefined ("Session.userID")>
            	<CFSET Session.LoginData.AttemptNumber = 1>
             <cfelseif Not IsDefined ("form.username") AND Not IsDefined ("session.username") AND IsDefined ("Session.LoginData.AttemptNumber")>
				<CFSET Session.LoginData.AttemptNumber = VAL(Session.LoginData.AttemptNumber) + 1>
             <cfelseif IsDefined ("Session.LoginData.AttemptNumber") AND Not IsDefined ("form.username") AND Not IsDefined ("session.username")>
             	<CFSET Session.LoginData.AttemptNumber = VAL(Session.LoginData.AttemptNumber) + 1>	
            <cfelse>
        		<CFSET Session.LoginData.AttemptNumber = Session.LoginData.AttemptNumber + 1>
			 	<CFIF Session.LoginData.AttemptNumber GTE LoginAttemptLimit>
                        <!--- Check how long it has been since the user last attempted to login --->
                        <CFIF NOT IsDefined ("Session.LoginData.LoginStartTime")>
                        	<CFSET Session.LoginData.LoginStartTime = NOW()>
                        </CFIF>
                        <CFSET var LoginAttemptPenance = DATEDIFF('n', Session.LoginData.LoginStartTime, NOW())>
                        <!--- If Login penality time has been reached then reset and allow to attempt login again --->
                        <CFIF LoginAttemptPenance GTE LoginPenanceTime>
                                <CFSET Session.LoginData.AttemptNumber = 0>
                                <CFSET Session.LoginData.LoginStartTime = NOW()>
                        <cfelse>
                            <!--- Login penality time has not been reached redirect to holding --->
                            <CFSET Session.LoginData.LoginStartTime = NOW()>
                            <cflocation url="#session.homewww#?error=true&ErrorNumber=10" addtoken="no">
                        </CFIF>
                 </CFIF>
             </CFIF>
        <cfelse>
        	<CFSET Session.LoginData.AttemptNumber = 1>
            <CFSET Session.LoginData.LoginStartTime = NOW()>
        </CFIF>

        <cflogin>
		<!--- Delete any Access Level Cookies (al) --->
        <cfcookie name="al" value="10" expires="now">
        	<cfif IsDefined("form.username") AND IsDefined ("form.password") AND TRIM(form.username) IS NOT "" AND TRIM(form.password) IS NOT "">
                 
					  <CFSET structData.username = form.username>
                      <CFSET structData.password = form.password>
                      <CFSET structData.email = "">
                      <CFSET structData.applicationToken = application.ApplicationToken>
                      <CFSET structData.AuthenticationMethod = 1>
                      <CFSET structData.CreatorsID = 1>
                      <CFSET structData.LoginAttempts = Session.LoginData.AttemptNumber>
                      <cfinvoke
                          component="security.IOCSecurity"
                          method="IOCWallet"
                          returnvariable="Results">
                          <cfinvokeargument name="structData" value="#structData#">
                      </cfinvoke>
           			
           			 <cftry>       
						   <CFIF IsDefined ("Results.Error") AND Results.Error GT 0>
                				<CFSET var Authenticated = false>
            			   <cfelseif IsDefined ("Results") AND Results.recordcount IS 0>
            					<CFSET var Authenticated = false>
             			   <cfelse>
             					<CFSET var Authenticated = true>
            				</CFIF>
                            
            				<cfcatch type="any"><CFSET var Authenticated = false></cfcatch> 
                            
        			</cftry>  
                          
  								<CFIF NOT IsDefined ("Results.Error") AND IsDefined ("Results.PasswordResetRequired") AND Results.PasswordResetRequired IS true>

                                	<CFSET Session.LoginData.AttemptNumber = 1>
                                     <cfcookie name="k" value="" expires="now">
                              		 <cfcookie name="ID1" value="" expires="now">
                                	<cfscript>
                                         theKey=generateSecretKey("AES");
                                        //Encrypt the string
                                        encrypted=encrypt(VAL(Results.userID), theKey, "AES",
                                            "Base64");
                                        //Decrypt it incase I want to debug
                                        decrypted=decrypt(encrypted, theKey, "AES", "Base64");
                                    </cfscript>
                                    <cfcookie name="k" value="#theKey#" expires=".1">
                              		<cfcookie name="ID1" value="#encrypted#" expires=".1">
                                  	<!--- K = Key, ID1 = UserID --->
                                	<cflocation url="#session.homewww#/requiredreset.cfm?error=required" addtoken="false">
                                    <cfabort>
                         
                                <!--- Everything good .. Successful user --->
								
                              <cfelseif Authenticated IS true>
                                  <cfloginuser name="#Results.firstName# #Results.LastName#" password="#form.password#" roles="user">
                                  <cfcookie name="al" value="#Results.aID#" expires="1">
                                  <CFSET session.userID = Results.userID>
                                  <CFSET session.accesslevel = Results.aID>
                                  <CFSET session.utID = Results.aID>
                                 
                                  <CFSET session.userName = "#Results.FirstName# #Results.LastName#">
                                  <CFSET session.UName = form.username>
                                  <CFSET session.password = form.password>
                                  <CFSET session.PasswordExpirationDaysLeft = Results.RemainingPasswordDays>
                                  <cfcookie name="CurrentUser" value="#TRIM(Results.firstName)# #TRIM(Results.LastName)#" expires="2">
                                  <Cfcookie name="useremail" value="#TRIM(Results.email)#" expires="2">
                                  <!--- Create a key to secure the UserID (ID)  --->
									<cfscript>
                                         theKey=generateSecretKey("AES");
                                        //Encrypt the string
                                        encrypted=encrypt(Results.userID, theKey, "AES", "Base64");
                                        //Decrypt it incase I want to debug
                                        decrypted=decrypt(encrypted, theKey, "AES", "Base64");
                                    </cfscript>
                                  	<!--- K = Key, ID1 = UserID --->
                                  	<cfcookie name="k" value="#theKey#" expires="2">
                              		<cfcookie name="ID1" value="#encrypted#" expires="2">
                              	 <CFIF Results.PasswordResetRequired IS 1>
                            			<cflocation url="#application.homewww#/requiredreset.cfm?error=1">
                                </CFIF>
                               
                                
                                 <cflocation url="../home/index.cfm?pass=true">  
                                 <cfabort> 
                               
            <cfelseif Authenticated IS false>
            		<!---If the logging user is not in our database relocate to main site --->
                    
                <CFSET Session.LoginData.FoundUser = "no">
                <CFSET Session.LoginData.AttemptNumber = Session.LoginData.AttemptNumber>
                <CFSET Session.LoginData.Username = form.username>
                <CFSET Session.LoginData.Password = form.password>
				<CFSET session.userName = "TBD">
                <CFSET session.AccessLevel = 20>
                  <CFIF IsDefined ("Results.error") AND Results.error GT 0>
                	<CFSET ErrorNumber = Results.error>
                 <cfelse>
                 	<CFSET ErrorNumber = 0>
                </CFIF>
                <cflocation url="#session.homewww#?error=true&count=#Session.LoginData.AttemptNumber#&ErrorNumber=#ErrorNumber#" addtoken="no">
        	<cfabort>
            <cfelse>
            	<cflocation url="#session.homewww#?error=noentry" addtoken="no">
            </cfif>
         </cfif>
      
        </cflogin>
        <cfreturn true>
	</cffunction>
<!--- On error handling --->
 <!--- <cffunction name="onError">
	<cfargument name="exception" required="yes">
    <cfargument name="EventName" type="string" required="yes">
    
    <cfmail to="mark@gimproductions.com" from="#application.webmasterEmail#" subject="IOC - GATEWAY - Error Handler" type="html">
          Event Name: #Arguments.Eventname# <BR><BR>
          Message:  #Arguments.Exception.message# <BR><BR>
         <CFIF IsDefined ("Arguments.Exception.rootcause")> 
           Root Cause Message: #Arguments.Exception.rootcause.message# <BR><BR>
 		 </CFIF> 
        <cfdump var="#cookie#" label="Cookies">
    	<cfdump var="#exception#" label="Exception">
        <cfdump var="#cgi#" label="cgi">
        <Cfdump var="#variables#" label="variables">
    </cfmail>
	 
<cflocation url="#session.homewww#/request_err.cfm">
</cffunction>   --->
     
</cfcomponent>