<cfcomponent displayname="states">
<!--- Get all states --->
<cffunction name="getAllStates" access="public" returntype="query">
  <cfset var qGetAllStates = "" >
  <cfquery name="qGetAllStates" datasource="#application.datasource#">
		SELECT S.StateID, S.State, S.countryID, C.country
		FROM dbo.states AS S
        	INNER JOIN dbo.countries AS C
           ON S.countryID = C.countryID
        ORDER BY S.countryID, S.state
    </cfquery>
  <cfreturn qGetAllStates>
</cffunction>

<!--- Get all countries --->
<cffunction name="getAllcountries" access="public" returntype="query">
	<cfset var qGetAllCountries = "">
    <cfquery name="qGetAllCountries" datasource="#application.datasource#">
    	SELECT countryID, country
        FROM dbo.countries
        ORDER by country
    </cfquery>
	
<cfreturn qGetAllCountries>
</cffunction>

<!--- Get specific state info --->
<cffunction name="getStateName" access="public" returntype="query">
<cfargument name="stateID" type="numeric" required="yes">
  <cfset var qStates = "" >
  <cfquery name="qStates" datasource="#application.datasource#">
		SELECT S.StateID, S.State, S.ShortName, S.countryID, C.country, C.countryabbrev
		FROM dbo.states AS S
        	INNER JOIN dbo.countries
           ON S.countryID = C.countryID 
       	WHERE 	S.stateID = <cfqueryparam value="#stateID#" cfsqltype="cf_sql_integer">
    </cfquery>
  <cfreturn qStates>
</cffunction>

<!--- Get countries --->
<cffunction access="remote" name="GetCountries" returntype="array">
<!--- Limit Countries to ones that I have states or provinces --->
<CFSET CountryList = "1,2,4,3,5,7">
<CFSET var ArI = "">
<CFSET var qI2 = "">
<CFSET var ArI = ArrayNew(2)>

<cfquery name="qI2" datasource="#application.datasource#">
	SELECT dbo.countries.countryID, dbo.countries.country
    FROM dbo.countries
    WHERE dbo.countries.countryID IN (<cfqueryparam value="#CountryList#" cfsqltype="cf_sql_integer" list="yes">)
	ORDER BY Country
</cfquery>

<cfloop index="i" from="1" to="#qI2.recordcount#">
	<CFSET ArI[i][1] = qI2.countryID[i]>
    <CFSET ArI[i][2] = qI2.Country[i]>

</cfloop>

	<cfreturn ArI>
</cffunction>
<!--- Get States --->
<cffunction name="GetStates" access="remote" output="no" returntype="array">
<cfargument name="countryID" type="numeric" required="yes">
<CFSET var ArIS = "">
<CFSET var qIS = "">
<CFSET var ArIS = ArrayNew(2)>
<cfquery name="qIS" datasource="#application.datasource#">
	SELECT dbo.states.stateID, dbo.states.state
    FROM dbo.States, dbo.Countries
    WHERE 	dbo.States.countryID = dbo.Countries.countryID AND
    		dbo.States.countryID = <cfqueryparam value="#arguments.countryID#" cfsqltype="CF_SQL_INTEGER"> 
    ORDER BY dbo.Countries.country, dbo.states.state
</cfquery>
<cfloop index="i" from="1" to="#qIS.recordcount#">
	<CFSET ArIS[i][1] = qIS.stateID[i]>
    <CFSET ArIS[i][2] = qIS.State[i]>
</cfloop>
    <cfreturn ArIS>
</cffunction>
</cfcomponent>