<!--- CSS needed for Vendor Search Auto Suggest --->
<style>
 .ui-autocomplete span.hl_results {
    background-color: #ffff66;
}

/* loading - the AJAX indicator */
.ui-autocomplete-loading {
    background: white url('../img/ui-anim_basic_16x16.gif') right center no-repeat;
}

/* scroll results */
.ui-autocomplete {
    max-height: 250px;
    overflow-y: auto;
    /* prevent horizontal scrollbar */
    overflow-x: hidden;
    /* add padding for vertical scrollbar */
    padding-right: 5px;
}

.ui-autocomplete li {
    font-size: 16px;
}

/* IE 6 doesn't support max-height
* we use height instead, but this forces the menu to always be this tall
*/
* html .ui-autocomplete {
    height: 250px;
}
  .selectb {
        margin:0px;
        background: yellow;
        color:#000;
        text-shadow:0 1px 0 rgba(0,0,0,0.4);
		font-size: 50px;
    }
    option:not(:checked) { 
        background-color: #FFF; 
    }


 </style>
<CFIF IsDefined("form.DebtorAccountNumber")>
	<CFSET variables.DebtorAccountNumber = form.DebtorAccountNumber>
    <CFIF IsDefined("form.FiscalYear")>
    	<CFSET variables.FiscalYear = form.FiscalYear>
    <cfelse>
    	<CFSET variables.FiscalYear = DATEFORMAT(NOW(),'yyyy')>	
    </CFIF>
    <CFSET variables.userID = form.userID>
<cfelse>
	<CFSET variables.DebtorAccountNumber = "">
    <CFSET variables.FiscalYear = DATEFORMAT(NOW(),'yyyy')>
    <CFSET variables.userID = session.userID>
</CFIF>
<cfinvoke 
 component="main.cfc.general"
 method="GetAllAuditors"
 returnvariable="qAuditors">
</cfinvoke>

<!--- Get Licensee Types --->
<cfinvoke 
 component="main.cfc.general"
 method="getLicenseeTypeForQuery"
 returnvariable="qLT">
</cfinvoke>
 
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>

<cfoutput>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
<link rel="stylesheet" type="text/css" href="#application.memberhomewww#/css/jquery-ui-1.10.3.custom.css">

<cfform action="index.cfm" method="post" enctype="application/x-www-form-urlencoded" preloader="no">
<table class="table" style="max-width:1280px;">
<CFIF IsDefined("URL.Error") AND URL.Error IS "norecords">
	<tr>
    	<td colspan="4">
        <div class="alert-warning col-sm-3">
          <h3>
        	NO RECORDS FOUND
          </h3>  
        </div>
        </td>
    
    </tr>
</CFIF>
  <tr>
    <td width="75">Code</td>
    <td colspan="3">

   <input type="text" name="DebtorAccountNumber" id="DebtorAccountNumber" size="60" placeholder="Enter Account Number or Business Name"  class="form-control" value="#variables.DebtorAccountNumber#" onClick="return SwitchOn()">
    </td>
   
  </tr>
  <tr>
    <td width="75">Fiscal Year:</td>
    <td>
        <cfselect name="FiscalYear"
            value="FiscalYear"
            display="FY"
            selected="#variables.FiscalYear#"
            bind="cfc:main.cfc.autosuggest.GetAllFiscalYearsPerAccountNumber({DebtorAccountNumber})"
            bindonload="true"
            class="form-control"
            style="width:200px;"
            onClick="return SwitchOn()">
        </cfselect>
    </td>
  
    <td>Auditor</td>
    <td>
    	<cfselect name="userID" 
        	class="form-control" 
            query="qAuditors" 
            value="userID" 
            display="FullName"
            selected="#variables.UserID#"
            onClick="return SwitchOn()">
         </cfselect>
    </td>
  </tr>
  <tr>
  	<td colspan="4">
    	 <table>
        	<tr id="100" style="display: none;">
        		<td height="55" align="center" width="200"><cfinput type="submit" name="Execute" value="Commit Request" onClick="return SwitchOff()" class="btn-lg btn-danger" style="width:180px"></td>
        	</tr>
            <tr id="101" style="display: block;">
            	<td height="55"></td>
            </tr>
        </table>      
    
    </td>
  </tr>
 
</table>
</cfform>
<script src="https://code.jquery.com/ui/1.10.3/jquery-ui.js"></script> 
<!--- Turn off or on the Submit --->
<script type="text/javascript">
<!--
/* Switch that changes Basic or Advance Search form options */
    function SwitchOn() {
       var e = document.getElementById(100);
        var e2 = document.getElementById(101);
	     e.style.display = 'block';
        e2.style.display = 'none';
    }
	 function SwitchOff() {
         var e = document.getElementById(100);
         var e2 = document.getElementById(101);
          e.style.display = 'none';
         e2.style.display = 'block';
    }
//-->
</script>

</cfoutput>


<script type="text/javascript">
    $("#DebtorAccountNumber").autocomplete({
        minLength:1,
        source: "<cfoutput>#application.memberhomewww#</cfoutput>/cfc/autosuggest.cfc?method=getDebtorViaBind&returnformat=json",
             
       select: function(event, ui) {
                //console.log(ui.item.label);
                $("#DebtorAccountNumber").val(ui.item.label);
                $("#DebtorAccountNumber").val(ui.item.value);
                
       return false;
            }
            
      });
</script>
