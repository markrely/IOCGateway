<CFIF Not IsDefined("Session.Username")>
	<cflocation url="#application.homewww#?error=expiredsession" addtoken="no">
</CFIF>
<header>
<cfoutput>	
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
   <a class="navbar-brand" href="#application.homewww#">IOC - GATEWAY</a>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav mr-auto">
      	
      	<li class="nav-item #PageLogin#">
        	<a class="nav-link" href="#application.memberhomewww#/login/logout.cfm">Logout</a>
        </li>
      </ul>
       <ul class="nav navbar-nav navbar-right">
         <p class="navbar-text">Your are login as: #session.userName#<BR /></p> 
      </ul>
    </div>
  </nav>
</cfoutput>















</header>