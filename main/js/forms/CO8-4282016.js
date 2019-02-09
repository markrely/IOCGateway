$(document).ready(function(){
 // For some reason data-tables reorder the table after it has been populated. I want the most recent audit record to be at the top; therefore I have to order the data-table by a hidden td called "order".
 $('#AuditTable').DataTable( {
        "columnDefs": [

            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            },
   {
   "order": [[ 1, "asc" ]]
            },
        ],
   "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-6'i><'col-md-6'p>>",
         "sPaginationType": "bootstrap",
         "oLanguage": {
            "sLengthMenu": "_MENU_ records per page"
             },
    });
    // If any changes to the data, change the form input text to red specific to that input
 $(':input').change(function(event){
        $(this).addClass('red');
    });
 // Determine if any changes have been made to any of the form inputs
 $(':input').change(function(event){
  var defaultValue = event.target.defaultValue;
  var newValue = event.target.value;
 if (defaultValue != newValue)
 {
  $("#IsChangedCheck").val('1');
  }
 });
 // When click on the BACK button return to the previous page and submit the BONDID as a form value which is needed.
 $(".btnCancel").on('click', function(){
   $("#co8Form").attr('action', "ManageCO8.cfm");
  $("#co8Form").submit();
  });



//END MARKS JQUERY
  $("form").bind("keypress", function(e) {
    if (e.keyCode == 13) return false;
  });

  //Disable Furure Days
  $('.date-picker-disable-future-date')
  .datepicker({
     format: 'mm/dd/yyyy',
     endDate: '+0d',
     autoclose: true
  });
  // .on('changeDate', function(e) {
  //           // Revalidate the date field
  //           $('#co8Form').formValidation('revalidateField', 'date');
  //       });

  $('#dueOndate').on('changeDate', function() {
       $('#paidOnDate').datepicker("setDate", $('#dueOndate').val());
       if(new Date($("#dueOndate").val()) > new Date()){
        $("#messageHolder").attr("class","alert alert-danger").html("You can not Enter Future date.");
        $("#messageHolderBtm").attr("class","alert alert-danger").html("You can not Enter Future date.");
        $(".dueOndate").attr("class","col-sm-9 dueOndate has-error");
        $(":submit").attr("disabled", true);
        }
        else{
          $("#messageHolder").attr("class","hide").html("");
          $("#messageHolderBtm").attr("class","hide").html("");
          $(".dueOndate").attr("class","col-sm-9 dueOndate");
          $(":submit").attr("disabled", false);
        }
  });
  $("#dueOndate").blur(function () {
     ValidateDate($('#dueOndate').val(), "dueOndate","Due On");
     if(new Date($("#dueOndate").val()) > new Date()){
      $("#messageHolder").attr("class","alert alert-danger").html("You can not Enter Future date.");
      $("#messageHolderBtm").attr("class","alert alert-danger").html("You can not Enter Future date.");
      $(".dueOndate").attr("class","col-sm-9 dueOndate has-error");
      $(":submit").attr("disabled", true);
      }
      else{
        $("#messageHolder").attr("class","hide").html("");
        $("#messageHolderBtm").attr("class","hide").html("");
        $(".dueOndate").attr("class","col-sm-9 dueOndate");
        $(":submit").attr("disabled", false);
      }
  });
  $("#paidOnDate").blur(function () {
     ValidateDate($('#paidOnDate').val(), "paidOnDate","Paid On");
     if(new Date($("#paidOnDate").val()) > new Date()){
      $("#messageHolder").attr("class","alert alert-danger").html("You can not Enter Future date.");
      $("#messageHolderBtm").attr("class","alert alert-danger").html("You can not Enter Future date.");
      $(".paidOnDate").attr("class","col-sm-9 dueOndate has-error");
      $(":submit").attr("disabled", true);
      }
      else{
        $("#messageHolder").attr("class","hide").html("");
        $("#messageHolderBtm").attr("class","hide").html("");
        $(".paidOnDate").attr("class","col-sm-9 dueOndate");
        $(":submit").attr("disabled", false);
      }
  });

  // $("#dateTrusteeReceived").blur(function () {
  //       ValidateDate($('#dateTrusteeReceived').val(), "dateTrusteeReceived", "Trustee Statement Received");
  // });
  $(":submit").click(function(event){
    if(new Date($("#dueOndate").val()) > new Date()){
          $("#messageHolder").attr("class","alert alert-danger").html("You can not Enter Future date.");
          $("#messageHolderBtm").attr("class","alert alert-danger").html("You can not Enter Future date.");
          $(".dueOndate").attr("class","col-sm-9 dueOndate has-error");
          $(":submit").attr("disabled", true);
          return false;
        }
        else if($("#forPrincipalAmt").val().replace(/\$|\,|\(|\)/g,'') == "0.00" && $("#additionalPaymentAmt").val().replace(/\$|\,|\(|\)/g,'') == "0.00" && $("#forInterestAmt").val().replace(/\$|\,|\(|\)/g,'') == "0.00"
         && $("#totalAmtOfDraws").val().replace(/\$|\,|\(|\)/g,'') == "0.00" && $("#Comment").val() == ""){
             $("#messageHolder").attr("class","alert alert-danger").html("Please Enter some comments.");
             $("#messageHolderBtm").attr("class","alert alert-danger").html("Please Enter some comments.");
             return false;
        }
        else{
          $("#messageHolder").attr("class","hide").html("");
          $("#messageHolderBtm").attr("class","hide").html("");
          $(".dueOndate").attr("class","col-sm-9 dueOndate");
          $(":submit").attr("disabled", false);
          return true;
        }




  });


  $('button[name="cancel"]').click(function(event){
    $('#BondId').val($('#BondId').val());
    console.log($('#BondId').val());
    $('#hdnDelDetailID').val(0);
    document.forms["historyForm"].submit();
  });
  $('button[name="delete"]').click(function(event){
    $('#BondId').val($('#BondId').val());
    $('#hdnDelDetailID').val($('#DetailID').val());
    document.forms["historyForm"].submit();
  });

  //forPrincipalAmt
  //additionalPaymentAmt
  //forInterestAmt
  //totalAmtOfDraws
  //hdnBondPrincipalOutstandingAmt
  $("#forPrincipalAmt").blur(function () {
      if(($("#forPrincipalAmt").val().replace(/[$,]+/g,"").indexOf('(') == "0") && ($("#forPrincipalAmt").val().replace(/[$,]+/g,"") != "0.00")){
         $("#messageHolder").attr("class","alert alert-danger").html("Principal Amount can not be negative.");
         $("#messageHolderBtm").attr("class","alert alert-danger").html("Principal Amount can not be negative.");
         $(".forPrincipalAmt").attr("class","col-sm-9 forPrincipalAmt has-error");
         $(":submit").attr("disabled", true);
      }
    else{
         var tempTotal = parseFloat(
          parseFloat(DollarFormat($("#hdnBondPrincipalOutstandingAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
          parseFloat(DollarFormat($("#hdnPrincipalgAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
          parseFloat(DollarFormat($("#forPrincipalAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
          parseFloat(DollarFormat($("#additionalPaymentAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
          parseFloat(DollarFormat($("#totalAmtOfDraws").val()).replace(/\$|\,|\(|\)/g,'')) -
          0 //parseFloat(DollarFormat($("#forPrincipalAmt").val()).replace(/\$|\,|\(|\)/g,''))
          ).toFixed(2);
         $(".forPrincipalAmt").attr("class","col-sm-9 forPrincipalAmt");
         //if($("#hdnRateType").val() === "1"){
            $("#amtBondPrincipalOutstanding").val(DollarFormat(tempTotal));
         /*}
         else{
          tempTotal = parseFloat(tempTotal.replace(/\$|\,|\(|\)/g,'') - $("#hdnPrincipalgAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
          alert(tempTotal);
             $("#amtBondPrincipalOutstanding").val(DollarFormat(tempTotal));
         }*/
         if($("#amtBondPrincipalOutstanding").val().indexOf("(") >= 0 || ($("#hdnTotalAllowedDrawdownAmount").val().replace(/\$|\,|\(|\)/g,'') !== "-1" && $("#amtBondPrincipalOutstanding").val().replace(/\$|\,|\(|\)/g,'') > $("#hdnTotalAllowedDrawdownAmount").val().replace(/\$|\,|\(|\)/g,''))){
          if($("#amtBondPrincipalOutstanding").val().indexOf("(") >= 0){
             $("#messageHolder").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be negative.");
             $("#messageHolderBtm").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be negative.");
          }
          else{
           $("#messageHolder").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be greater than Total Amount / Original Issue." + DollarFormat($("#hdnTotalAllowedDrawdownAmount").val()));
           $("#messageHolderBtm").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be greater than Total Amount / Original Issue." + DollarFormat($("#hdnTotalAllowedDrawdownAmount").val()));
          }

           $(".amtBondPrincipalOutstanding").attr("class","col-sm-9 amtBondPrincipalOutstanding has-error");
           $(":submit").attr("disabled", true);
         }
         else{
           $("#messageHolder").attr("class","hide").html("");
           $("#messageHolderBtm").attr("class","hide").html("");
           $(".amtBondPrincipalOutstanding").attr("class","col-sm-9 amtBondPrincipalOutstanding");
           $(":submit").attr("disabled", false);
         }
    }
  });

  $("#forInterestAmt").blur(function () {
      if(($("#forInterestAmt").val().replace(/[$,]+/g,"").indexOf('(') == "0") && ($("#forInterestAmt").val().replace(/[$,]+/g,"") != "0.00")){
         $("#messageHolder").attr("class","alert alert-danger").html("Interest Amount can not be negative.");
         $("#messageHolderBtm").attr("class","alert alert-danger").html("Interest Amount can not be negative.");
         $(".forInterestAmt").attr("class","col-sm-9 forInterestAmt has-error");
         $(":submit").attr("disabled", true);
      }
      else{
           $("#messageHolder").attr("class","hide").html("");
           $("#messageHolderBtm").attr("class","hide").html("");
           $(".forInterestAmt").attr("class","col-sm-9 forInterestAmt");
           $(":submit").attr("disabled", false);
      }
   });


  $("#additionalPaymentAmt").blur(function () {
      if(($("#additionalPaymentAmt").val().replace(/[$,]+/g,"").indexOf('(') == "0") && ($("#additionalPaymentAmt").val().replace(/[$,]+/g,"") != "0.00")){
         $("#messageHolder").attr("class","alert alert-danger").html("Additonal Payment Amount can not be negative.");
         $("#messageHolderBtm").attr("class","alert alert-danger").html("Additonal Payment Amount can not be negative.");
         $(".additionalPaymentAmt").attr("class","col-sm-9 additionalPaymentAmt has-error");
         $(":submit").attr("disabled", true);
      }
    else{
        var tempTotal = parseFloat(
         parseFloat(DollarFormat($("#hdnBondPrincipalOutstandingAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
         parseFloat(DollarFormat($("#hdnPrincipalgAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
         parseFloat(DollarFormat($("#forPrincipalAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
         parseFloat(DollarFormat($("#additionalPaymentAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
         parseFloat(DollarFormat($("#totalAmtOfDraws").val()).replace(/\$|\,|\(|\)/g,'')) -
         0 //parseFloat(DollarFormat($("#forPrincipalAmt").val()).replace(/\$|\,|\(|\)/g,''))
         ).toFixed(2);
        $(".additionalPaymentAmt").attr("class","col-sm-9 additionalPaymentAmt");
        $("#amtBondPrincipalOutstanding").val(DollarFormat(tempTotal));
         if($("#amtBondPrincipalOutstanding").val().indexOf("(") >= 0 || ($("#hdnTotalAllowedDrawdownAmount").val().replace(/\$|\,|\(|\)/g,'') !== "-1" && $("#amtBondPrincipalOutstanding").val().replace(/\$|\,|\(|\)/g,'') > $("#hdnTotalAllowedDrawdownAmount").val().replace(/\$|\,|\(|\)/g,''))){
          if($("#amtBondPrincipalOutstanding").val().indexOf("(") >= 0){
             $("#messageHolder").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be negative.");
             $("#messageHolderBtm").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be negative.");
          }
          else{
           $("#messageHolder").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be greater than Total Amount / Original Issue." + DollarFormat($("#hdnTotalAllowedDrawdownAmount").val()));
           $("#messageHolderBtm").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be greater than Total Amount / Original Issue." + DollarFormat($("#hdnTotalAllowedDrawdownAmount").val()));
          }
          $(":submit").attr("disabled", true);
        }
        else{
          $("#messageHolder").attr("class","hide").html("");
          $("#messageHolderBtm").attr("class","hide").html("");
          $(":submit").attr("disabled", false);
        }
     }
  });
  $("#totalAmtOfDraws").blur(function () {
      if(($("#totalAmtOfDraws").val().replace(/[$,]+/g,"").indexOf('(') == "0") && ($("#totalAmtOfDraws").val().replace(/[$,]+/g,"") != "0.00")){
         $("#messageHolder").attr("class","alert alert-danger").html("Total Amount Of Draws Amount can not be negative.");
         $("#messageHolderBtm").attr("class","alert alert-danger").html("Total Amount Of Draws Amount can not be negative.");
         $(".additionalPaymentAmt").attr("class","col-sm-9 totalAmtOfDraws has-error");
         $(":submit").attr("disabled", true);
      }
    else{
          var tempTotal = parseFloat(
           parseFloat(DollarFormat($("#hdnBondPrincipalOutstandingAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
           parseFloat(DollarFormat($("#hdnPrincipalgAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
           parseFloat(DollarFormat($("#forPrincipalAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
           parseFloat(DollarFormat($("#additionalPaymentAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
           parseFloat(DollarFormat($("#totalAmtOfDraws").val()).replace(/\$|\,|\(|\)/g,'')) -
           0 //parseFloat(DollarFormat($("#forPrincipalAmt").val()).replace(/\$|\,|\(|\)/g,''))
           ).toFixed(2);
          $(".totalAmtOfDraws").attr("class","col-sm-9 totalAmtOfDraws");
          $("#amtBondPrincipalOutstanding").val(DollarFormat(tempTotal));
         if($("#amtBondPrincipalOutstanding").val().indexOf("(") >= 0 || ($("#hdnTotalAllowedDrawdownAmount").val().replace(/\$|\,|\(|\)/g,'') !== "-1" && $("#amtBondPrincipalOutstanding").val().replace(/\$|\,|\(|\)/g,'') > $("#hdnTotalAllowedDrawdownAmount").val().replace(/\$|\,|\(|\)/g,''))){
            if($("#amtBondPrincipalOutstanding").val().indexOf("(") >= 0){
               $("#messageHolder").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be negative.");
               $("#messageHolderBtm").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be negative.");
            }
            else{
             $("#messageHolder").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be greater than Total Amount / Original Issue." + DollarFormat($("#hdnTotalAllowedDrawdownAmount").val()));
             $("#messageHolderBtm").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be greater than Total Amount / Original Issue." + DollarFormat($("#hdnTotalAllowedDrawdownAmount").val()));
            }
            $(":submit").attr("disabled", true);
          }
          else{
            $("#messageHolder").attr("class","hide").html("");
            $("#messageHolderBtm").attr("class","hide").html("");
            $(":submit").attr("disabled", false);
          }
      }
  });
  $("#amtBondPrincipalOutstanding").blur(function () {
    var tempTotal = parseFloat(
     parseFloat(DollarFormat($("#hdnBondPrincipalOutstandingAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
     parseFloat(DollarFormat($("#hdnPrincipalgAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
     parseFloat(DollarFormat($("#forPrincipalAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
     parseFloat(DollarFormat($("#additionalPaymentAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
     parseFloat(DollarFormat($("#totalAmtOfDraws").val()).replace(/\$|\,|\(|\)/g,'')) -
     0 //parseFloat(DollarFormat($("#forPrincipalAmt").val()).replace(/\$|\,|\(|\)/g,''))
     ).toFixed(2);
    $("#amtBondPrincipalOutstanding").val(DollarFormat(tempTotal));
     if($("#amtBondPrincipalOutstanding").val().indexOf("(") >= 0 || ($("#hdnTotalAllowedDrawdownAmount").val().replace(/\$|\,|\(|\)/g,'') !== "-1" && $("#amtBondPrincipalOutstanding").val().replace(/\$|\,|\(|\)/g,'') > $("#hdnTotalAllowedDrawdownAmount").val().replace(/\$|\,|\(|\)/g,''))){
       if($("#amtBondPrincipalOutstanding").val().indexOf("(") >= 0){
          $("#messageHolder").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be negative.");
          $("#messageHolderBtm").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be negative.");
       }
       else{
        $("#messageHolder").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be greater than Total Amount / Original Issue." + DollarFormat($("#hdnTotalAllowedDrawdownAmount").val()));
        $("#messageHolderBtm").attr("class","alert alert-danger").html("Amount Of Bond Principal Outstanding can not be greater than Total Amount / Original Issue." + DollarFormat($("#hdnTotalAllowedDrawdownAmount").val()));
       }
      $(":submit").attr("disabled", true);
    }
    else{
      $("#messageHolder").attr("class","hide").html("");
      $("#messageHolderBtm").attr("class","hide").html("");
      $(":submit").attr("disabled", false);
    }
  });


});

function ValidateDate(objVal,objClassName, strName) {

        var dateReg = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        //if (isNaN(oDate)) {
         if(! dateReg.test(objVal) ) {
            $("." + objClassName).attr("class","col-sm-9 dueOndate has-error");
            $(":submit").attr("disabled", true);
            //has-error
            //messageHolder
            //ObjectReference.focus();
            $("#messageHolder").attr("class","alert alert-danger").html("Please eneter Valid " + strName + " Date.");
            $("#messageHolderBtm").attr("class","alert alert-danger").html("Please eneter Valid " + strName + " Date.");
        }else{
         $("." + objClassName).attr("class","col-sm-9 dueOndate");
         $("#messageHolder").attr("class","hide").html("");
         $("#messageHolderBtm").attr("class","hide").html("");
         $(":submit").removeAttr("disabled");
        }

}


// Show or Hide the Audit information when clicked
 $(window).load( function(){
   $(document).ready(function() {
    $('#ViewAudit').click( function(event){
     $('.auditlog').toggle();
    });

   });
  });