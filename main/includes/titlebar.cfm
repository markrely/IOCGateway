<CFIF Not IsDefined("Session.Username")>
	<cflocation url="#application.homewww#?error=expiredsession" addtoken="no">
</CFIF>

<cfinvoke
        component="security.IOCSecurity"
        method="GetAllApplicationsUserHasAccessTo"
        returnvariable="qAllUserApps">
        <cfinvokeargument name="IncomingUserID" value="#session.userID#">
</cfinvoke>
<cfoutput>
    <div class="wrapper-inner">
    <header>
        <nav class="navbar navbar-expand-md navbar-light topmenu">
            <div class="container">
                <a class="navbar-brand logo" href="https://illinoiscomptroller.gov/"><img class="img-fluid" src="#application.homewww#/images/website-logo_sized.png" title="Susana A.Mendoza - State of Illinois Comptroller" alt="Susana A.Mendoza - State of Illinois Comptroller"></a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="##gateWayNavbar" aria-controls="gateWayNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="gateWayNavbar">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="##" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-user fa-lg mr-2"></i>#session.username#
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#application.memberhomewww#/login/logout.cfm">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <div class="container">
        <h1 class="pageTitle">
            <img src="#application.memberhomewww#/images/Gateway.png" alt="IOC Gateway">
            <span>IOC Gateway</span>
        </h1>
        <p class="paragraph mb-4">The Illinois Office of the Comptroller (IOC) Gateway provides access to most of your IOC authorized applications.  If your authorized IOC application is not displayed, please continue to use your previously provided web address.
        <div class="navbar navbar-expand-md navbar-dark mymenu">
            <span class="navbar-brand">Number of Applications  - <b><cfoutput>#qAllUserApps.recordcount#</cfoutput></b></span>
        </div>

</cfoutput>


