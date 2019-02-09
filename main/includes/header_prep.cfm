<CFSET ThisPage = CGI.PATH_TRANSLATED>
<cfset strTitle = "IOC - Place Audit">
<cfset strKeywords = "IOC - Place Audit">
<cfset strDescription = "IOC - Place Audit Application">

<!--- Validate if **** Home page --->
<CFIF ThisPage CONTAINS "E:\WEB\gateway\main\home">
	<CFSET PageHome = "active">
	<cfset strTitle = "Home">                    
<cfelse>
	<CFSET PageHome= "">
</CFIF>
<!--- Validate if **** Reports page --->
<CFIF ThisPage CONTAINS "E:\WEB\gateway\main\Reports\">
	<CFSET PageReports = "active">
	<cfset strTitle = "Reports">                    
<cfelse>
	<CFSET PageReports= "">
</CFIF>
<!--- Validate if **** Admin page --->
<CFIF ThisPage CONTAINS "E:\WEB\gateway\main\admin\">
	<CFSET PageAdmin = "active">
	<cfset strTitle = "Admin">                    
<cfelse>
	<CFSET PageAdmin = "">
</CFIF>
<!--- Validate if *** Login page --->
<CFIF ThisPage CONTAINS "E:\WEB\gateway\main\login\">
	<CFSET PageLogin = "active">
	<cfset strTitle = "Login">                     
<cfelse>
	<CFSET PageLogin = "">
</CFIF>


<!--- Validate if *** EULA page --->
<CFIF ThisPage IS "E:\WEB\gateway\main\login\eula.cfm">
	<CFSET RemoveLinks = "true">
	<cfset strTitle = "EULA">                     

</CFIF>