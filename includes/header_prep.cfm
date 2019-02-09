<CFSET ThisPage = CGI.PATH_TRANSLATED>
<cfset strTitle = "gateway">
<cfset strKeywords = "gateway">
<cfset strDescription = "gateway Application">

<!--- Validate if **** Home page --->
<CFIF ThisPage IS "E:\WEB\gateway\index.cfm">
	<CFSET PageHome = "active">
	<cfset strTitle = "Home page">                    
<cfelse>
	<CFSET PageHome= "">
</CFIF>
<!--- Validate if **** Security page --->
<CFIF ThisPage CONTAINS "E:\WEB\gateway\security\">
	<CFSET PageSecurity = "active">
	<cfset strTitle = "Security">                    
<cfelse>
	<CFSET PageSecurity= "">
</CFIF>
<!--- Validate if **** Help page --->
<CFIF ThisPage CONTAINS "E:\WEB\gateway\help\">
	<CFSET PageHelp = "active">
	<cfset strTitle = "Help">                    
<cfelse>
	<CFSET PageHelp= "">
</CFIF>