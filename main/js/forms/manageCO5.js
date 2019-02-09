$(document).ready(function(){

//Diable all fields based on Status and UserRole. Only in MatuityGrid Page we have to make it read only when it is in 3(Approved) state also
// 2(Submitted), 5 (Closed)
//console.log($("#hdnCurrentstatusID").val());
// 3- 4 Normal Users.
//console.log($("#hdnUserRoleId").val());
if(($("#hdnUserRoleId").val() == "3" || $("#hdnUserRoleId").val() == "4") && ($("#hdnCurrentstatusID").val() == "2" || $("#hdnCurrentstatusID").val() == "5")){
 $("#co5Form :input:not('[name=Update]')").attr("disabled", true);
}


$("#SelectBond").on('click', function(){
   $("#IsModalShown").val(1);
   $("#co5Form").submit();
});

$("#Update").on('click', function(){
   $("#IsModalShown").val(0);
   $("#co5Form").submit();
});

//$("#IsModalShown").val(1);

//disable housing bond on page load.
if($("#agencyID").val() === null){
 $("#RateTypeID").find('option[value="4"]').attr('disabled', 'disabled');
}
else if($("#agencyID").val() != "26"){
  $("#RateTypeID").find('option[value="4"]').attr('disabled', 'disabled');
}
////$("#RateTypeID").find('option[value="4"]').attr('disabled', 'disabled');
//Enable housing bond on Issued By / Agency value 26 i.e. $("#agencyID").val() refer line 244

// For some reason data-tables reorder the table after it has been populated. I want the most recent audit record to be at the top; therefore I have to order the data-table by a hidden td called "order".
	$('#AuditTable').DataTable(

		/*{
		"sScrollX": "100%",
			"sScrollXInner": "110%",
			"bScrollCollapse": true
		}, */
{
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
    }

	);
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
	 	$("#co5Form").attr('action', "../bonds/SearchBonds.cfm");
		$("#co5Form").submit();
		});

	$(".BondListForm").on('click', function(){
	 	$("#co5Form").attr('action', "../payments/ManageCO8.cfm");
		$("#co5Form").submit();
		});

	$(".btnDelete").on('click', function(){
	 	$("#co5Form").attr('action', "ManageCO5.cfm");
		$("#co5Form").submit();
		});

//END MARKS JQUERY

 var defaultCurrentDate = new Date();
 var $manageCO5Page = $("#manageCO5"),
     $bondNameContainer = $manageCO5Page.find(".bondName"),
     $agencyContainer = $manageCO5Page.find(".agencyID"),
     $trusteeContainer = $manageCO5Page.find(".trustee"),
     $bondTypeContainer = $manageCO5Page.find(".bondType"),
     $bondSubTypeContainer = $manageCO5Page.find(".bondSubType"),
     $categoryContainer = $manageCO5Page.find(".category"),
     $secondaryCategoryContainer = $manageCO5Page.find(".secondaryCategory"),
     $issuedateContainer = $manageCO5Page.find(".issuedate"),
     $TotalIssueAmtContainer = $manageCO5Page.find(".TotalIssueAmt"),
     $maturityDateContainer = $manageCO5Page.find(".maturityDate"),
     $deliverydateContainer = $manageCO5Page.find(".deliverydate"),
     $firstPrincipaldateContainer = $manageCO5Page.find(".firstPrincipaldate"),
     $firstInterestdateContainer = $manageCO5Page.find(".firstInterestdate"),
     $numberofPrincipalPaymentsContainer = $manageCO5Page.find(".numberofPrincipalPayments"),
     $submitButton = $manageCO5Page.find(".btn-next"),
     $messageHolder = $manageCO5Page.find("#messageHolder"),
     $messageHolderBottom = $manageCO5Page.find("#messageHolderBottom"),
     $statusContainer = $manageCO5Page.find(".StatusID");


/************* Code to validate Upload file extension and size starts here**************************/
var file = $('.myFile');
file.on('change', function (e) {
 var reader = new FileReader();
 var allowedFiles = [".doc", ".docx", ".pdf"];
 var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
 var maxSize = $(this).data('size');
 var ObjCurrent = $(this).attr('id');
 reader.onload = function() {
     var data = reader.result;
     if (!regex.test($('#'+ ObjCurrent).val().toLowerCase())) {
         $('#'+ ObjCurrent).parent().find('.lblError').html(" Please upload files having extensions: <b>" + allowedFiles.join(', ') + "</b> only.");
         $submitButton.attr("disabled", "disabled");
         return false;
     }
     var fileSize = $('#'+ ObjCurrent)[0].files[0].size / 1024 / 1024
     if (fileSize > maxSize) {// Maximum File Size in Bytes - 1 or 5 MB
      $('#'+ ObjCurrent).parent().find('.lblError').html(" Please upload files having size less than 1 MB only.");
      $submitButton.attr("disabled", "disabled");
      return false;
     }
     $('#'+ ObjCurrent).parent().find('.lblError').html('');
     $submitButton.removeAttr("disabled");
     return true;
 };
 reader.readAsDataURL(file.prop('files')[0]);
});
/************* Code to validate Upload file extension and size ends here**************************/

$('#agencyID').val($('#hdnIssuedBy').val()).change();

 $('#bondName').blur(function(){
       $.ajax({
          type : 'get',
          dataType: 'json',
          url: '../cfc/ValidateBondName.cfc?method=validateBondName&bondName=' + $('#bondName').val() +'&bondID=' + $('#bondID').val()
           }).success(function(response){
              if(response != 0){
                 $bondNameContainer.attr("class","col-sm-10 has-error");
                  $messageHolder
                   .attr("class","alert alert-danger")
                    .html("This Bond name is already in use, please enter proper name.");
                  $messageHolderBottom
                     .attr("class","alert alert-danger")
                      .html("This Bond name is already in use, please enter proper name.");
                  $("#bondName").val('');
              }else
              {
               $bondNameContainer.attr("class","col-sm-10 bondName");
               $messageHolder
               .attr("class","hide")
               .html("");
               $messageHolderBottom
               .attr("class","hide")
               .html("");
              }
           }).error(function(){
              alert('Error Occured');
           });
       });

 $('#bondName').focusout(function(){
       $.ajax({
          type : 'get',
          dataType: 'json',
          url: '../cfc/ValidateBondName.cfc?method=validateBondName&bondName=' + $('#bondName').val() +'&bondID=' + $('#bondID').val()
           }).success(function(response){
              if(response != 0){
                 $bondNameContainer.attr("class","col-sm-10 has-error");
                  $messageHolder
                   .attr("class","alert alert-danger")
                    .html("This Bond name is already in use, please enter proper name.");
                  $messageHolderBottom
                     .attr("class","alert alert-danger")
                      .html("This Bond name is already in use, please enter proper name.");
                  $("#bondName").val('');
              }else
              {
               $bondNameContainer.attr("class","col-sm-10 bondName");
               $messageHolder
               .attr("class","hide")
               .html("");
               $messageHolderBottom
               .attr("class","hide")
               .html("");
              }
           }).error(function(){
              alert('Error Occured');
           });
       });


/* This is for all drop downs loading data dynamically  start*/
/* onload select Values */
if($('#hdnTrusteeID').val() !== undefined && $('#hdnTrusteeID').val() != ""){
 /*if($('#agencyID').val() !== undefined)
   { var value = 0}
  else
    {
  var value = $('#agencyID').val();
	}
  */
   var value = $('#agencyID').val();
  $.ajax({
   type : 'get',
   url:'../includes/ManageDropDowns.cfm?agencyID='+ value +'&selectedTrustee=' + $('#hdnTrusteeID').val()
  }).success(function(response){
   $('#trustee').html(response); //response as html for state drop down.
   $('#trustee').attr("class","select2");
   $('#trustee').select2();
  }).error(function(){
   alert('Error Occured1');
  });

  $.ajax({
   type : 'get',
   url:'../includes/ManageDropDowns.cfm?bondAgencyId='+value +'&selectedBondType=' + $('#hdnBondTypeID').val()
  }).success(function(response){
   $('#bondType').html(response); //response as html for state drop down.
   $('#bondType').attr("class","select2");
   $('#bondType').select2();
  }).error(function(){
   alert('Error Occured');
  });


/*if($('#agencyID').val() !== undefined)
   { var agencyValue = 0}
  else
    {
  var agencyValue = $('#agencyID').val();
	}
*/
var agencyValue = $('#agencyID').val();

  $.ajax({
   type : 'get',
   url:'../includes/ManageDropDowns.cfm?bondTypeId='+ $('#hdnBondTypeID').val() +'&subTypeagencyID=' + agencyValue +'&selectedBondSubType=' + $('#hdnBondSubTypeID').val()
  }).success(function(response){
   $('#bondSubType').html(response); //response as html for state drop down.
   $('#bondSubType').attr("class","select2");
   $('#bondSubType').select2();
  }).error(function(){
   alert('Error Occured');
  });
 }
if($('#hdnBondSubTypeID').val() !== undefined && $('#hdnBondSubTypeID').val() != ""){
  var Typevalue = $('#hdnBondSubTypeID').val();
  $.ajax({
   type : 'get',
   url:'../includes/ManageDropDowns.cfm?bondSubTypeId='+ Typevalue +'&selectedRepaymentType=' + $('#hdnRepaymenyFundID').val()
  }).success(function(response){
   $('#repaymentType').html(response); //response as html for state drop down.
   $('#repaymentType').attr("class","select2");
   $('#repaymentType').select2();
  }).error(function(){
   alert('Error Occured');
  });


  /* Below two drop down are based on the User Role code starts*/
         /* usercodeID usertype
                1          Admin
                2          IOC Users
                3          Agency Users
                4          Guest */
  if($("#hdnUserRoleId").val() !== "4"){
      value = $('#hdnBondSubTypeID').val();
       $.ajax({
        type : 'get',
        url:'../includes/ManageDropDowns.cfm?categoryBondSubTypeId='+value +'&selectedCategory=' + $('#hdnCategoryOfIssueID').val()
       }).success(function(response){
        $('#category').html(response); //response as html for state drop down.
        $('#category').attr("class","select2");
        $('#category').select2();
       }).error(function(){
        alert('Error Occured');
       });

       value = $('#hdnBondSubTypeID').val();
       $.ajax({
        type : 'get',
        url:'../includes/ManageDropDowns.cfm?secondaryCategoryBondSubTypeId='+value +'&selectedSecondarycategory=' + $('#hdnSecondaryCategoryID').val()
       }).success(function(response){
        $('#secondaryCategory').html(response); //response as html for state drop down.
        $('#secondaryCategory').attr("class","select2");
        $('#secondaryCategory').select2();
       }).error(function(){
        alert('Error Occured');
       });
  }
  /* User Role code ends*/

 }

/* onload select Values */

 $('#agencyID').change(function(){
  if($("#agencyID").val() === "26"){
    $("#RateTypeID").find('option[value="4"]').removeAttr('disabled');
  }
  else{
   $("#RateTypeID").find('option[value="4"]').attr('disabled', 'disabled');
   $("#RateTypeID").val("1").select2();
  }
  var value = $('#agencyID').val();
  $.ajax({
   type : 'get',
   url:'../includes/ManageDropDowns.cfm?agencyID='+value +'&selectedTrustee=' + $('#hdnTrusteeID').val()
  }).success(function(response){
   $('#trustee').html(response); //response as html for state drop down.
   $('#trustee').attr("class","select2");
   $('#trustee').select2();
  }).error(function(){
   alert('Error Occured');
  });

  value = $('#agencyID').val();
  $.ajax({
   type : 'get',
   url:'../includes/ManageDropDowns.cfm?bondAgencyId='+value
  }).success(function(response){
   $('#bondType').html(response); //response as html for state drop down.
   $('#bondType').attr("class","select2");
   $('#bondType').select2();
  }).error(function(){
   alert('Error Occured');
  });
 });

 $('#bondType').change(function(){
  var value = $('#bondType').val();
  var agencyValue = $('#agencyID').val();
  $.ajax({
   type : 'get',
   url:'../includes/ManageDropDowns.cfm?bondTypeId='+ value +'&subTypeagencyID=' + agencyValue
  }).success(function(response){
   $('#bondSubType').html(response); //response as html for state drop down.
   $('#bondSubType').attr("class","select2");
   $('#bondSubType').select2();
  }).error(function(){
   alert('Error Occured');
  });
 });

  $('#bondSubType').change(function(){
   var value = $('#bondSubType').val();
   $.ajax({
    type : 'get',
    url:'../includes/ManageDropDowns.cfm?bondSubTypeId='+value
   }).success(function(response){
    $('#repaymentType').html(response); //response as html for state drop down.
    $('#repaymentType').attr("class","select2");
    $('#repaymentType').select2();
   }).error(function(){
    alert('Error Occured');
   });

   value = $('#bondSubType').val();
   $.ajax({
    type : 'get',
    url:'../includes/ManageDropDowns.cfm?categoryBondSubTypeId='+value
   }).success(function(response){
    $('#category').html(response); //response as html for state drop down.
    $('#category').attr("class","select2");
    $('#category').select2();
   }).error(function(){
    alert('Error Occured');
   });

   value = $('#bondSubType').val();
   $.ajax({
    type : 'get',
    url:'../includes/ManageDropDowns.cfm?secondaryCategoryBondSubTypeId='+value
   }).success(function(response){
    $('#secondaryCategory').html(response); //response as html for state drop down.
    $('#secondaryCategory').attr("class","select2");
    $('#secondaryCategory').select2();
   }).error(function(){
    alert('Error Occured');
   });
 });

 $("#chkDrawDownBond").change(function() {
    if(this.checked) {
        //Do stuff
        $("#DrawDownBondInitialAmount").attr("disabled", false);
        $("#DrawDownMsg").removeClass('hide').addClass('show');
    }
    else{
     $("#DrawDownBondInitialAmount").val("");
     $("#DrawDownBondInitialAmount").attr("disabled", true);
     $("#DrawDownMsg").removeClass('show').addClass('hide');
    }
});


$('#fiscalYear').on('change', function() {

   var Dt = new Date($('#issuedate').val());
   var temp_FY = Dt.getFullYear();
   if(Dt.getMonth() >=6){
    temp_FY = temp_FY + 1;
   }
   if(temp_FY === $("#fiscalYear").val()){
         $issuedateContainer.attr("class","col-sm-10");
          $messageHolder
       .attr("class","hide")
        .html("");
      $messageHolderBottom
         .attr("class","hide")
          .html("");
    }
});

/* This is for all drop downs loading data dynamically end*/
// $("form").submit(function(e) {
//   if( $("#IsModalShown").val() != 1){
//     $('#myModal').find("#spanRateType").text($("#RateTypeID").find('option:selected').text());
//     $('#myModal').find("#spanTotalAmount").text($("#TotalIssueAmt").val());
//     $('#myModal').find("#spanFinalMaturity").text($("#maturityDate").val());
//     $('#myModal').find("#spanFirstPrincipal").text($("#firstPrincipaldate").val());
//     $('#myModal').find("#spanFirstInterest").text($("#firstInterestdate").val());
//     $('#myModal').find("#spanNumberOfPrincipalPayments").text($("#numberofPrincipalPayments").val());
//     $('#myModal').find("#spanCouponFrequency").text($("#couponFrequency").find('option:selected').text());
//     $('#myModal').find("#spanMaturityFrequency").text($("#maturityFrequency").find('option:selected').text());
//     $('#myModal').modal('show');
//     return false;
//   }

//  });
 //$submitButton.click(function(event){
 // event.preventDefault();
//var defaultSubmit = $.extend(true, {}, $("form").submit);
 $('.modal').on('click', '.btn-primary', function(){
     $("#IsModalShown").val(1);
     $('#co5Form').submit();
   //defaultSubmit(); // User confirmed, submit form.
 });

$("form").submit(function(e) {


 var q = new Date($('#issuedate').val());
 var tempFY = q.getFullYear();
 if(q.getMonth() >=6){
  tempFY = tempFY + 1;
 }



//$submitButton.click(function(event){

 //$("#hdnDrawDownBondInitialAmount").val($("#DrawDownBondInitialAmount").val());
// if(!$('#numberofPrincipalPayments').val().match(/^[0-9]+$/))//!(Number($('#numberofPrincipalPayments').val()) > 0))
//   alert("ENter Positive Number");
// alert(Number($('#numberofPrincipalPayments').val()));
/*
$agencyContainer = $manageCO5Page.find(".agencyID"),
$trusteeContainer = $manageCO5Page.find(".trustee"),
$bondTypeContainer = $manageCO5Page.find(".bondType"),
//$bondSubTypeContainer = $manageCO5Page.find(".bondSubType"),
$categoryContainer = $manageCO5Page.find(".category"),
$secondaryCategoryContainer = $manageCO5Page.find(".secondaryCategory"),
*/
if($("#IsModalShown").val() != 1){
    if($('#agencyID').find('option:selected').val() == "" || $('#agencyID').find('option:selected').val() === undefined)//we have to refer to the complete path to get the latest value
    {
     $agencyContainer.attr("class","col-sm-10 has-error");
     $bondNameContainer.attr("class","col-sm-10 bondName");
     $messageHolder
      .attr("class","alert alert-danger")
       .html("Please Select Issued By / Agency.");
     $messageHolderBottom
        .attr("class","alert alert-danger")
         .html("Please Select Issued By / Agency.");
     return false;
    }
    else if($('#trustee').find('option:selected').val() == "" || $('#trustee').find('option:selected').val() === undefined)//we have to refer to the complete path to get the latest value --- Need to fix it later RK
    {
     $trusteeContainer.attr("class","col-sm-10 has-error");
     $bondNameContainer.attr("class","col-sm-10 bondName");
     $agencyContainer.attr("class","col-sm-10 agency");
     $messageHolder
      .attr("class","alert alert-danger")
       .html("Please Select Trustee / Paying Agent.");
     $messageHolderBottom
        .attr("class","alert alert-danger")
         .html("Please Select Trustee / Paying Agent.");
     return false;
    }
   else if($('#bondName').val().trim() == "")//we have to refer to the complete path to get the latest value
    {
     $bondNameContainer.attr("class","col-sm-10 has-error");
     $trusteeContainer.attr("class","col-sm-10 trustee");
     $agencyContainer.attr("class","col-sm-10 agency");
     $messageHolder
      .attr("class","alert alert-danger")
       .html("Please enter Series Name.");
     $messageHolderBottom
        .attr("class","alert alert-danger")
         .html("Please enter Series Name.");
     return false;
    }
   else if($('#bondType').find('option:selected').val() == "" || $('#bondType').find('option:selected').val() === undefined)//we have to refer to the complete path to get the latest value
    {
     $bondTypeContainer.attr("class","col-sm-10 has-error");
     $bondNameContainer.attr("class","col-sm-10");
     $trusteeContainer.attr("class","col-sm-10 trustee");
     $agencyContainer.attr("class","col-sm-10 agency");

     $messageHolder
      .attr("class","alert alert-danger")
       .html("Please Select Type Of Bond.");
     $messageHolderBottom
        .attr("class","alert alert-danger")
         .html("Please Select Type Of Bond.");
     return false;
    }
   else if($('#bondSubType').find('option:selected').val() == "" || $('#bondSubType').find('option:selected').val() === undefined)//we have to refer to the complete path to get the latest value
    {
     $bondTypeContainer.attr("class","col-sm-10");
     $bondSubTypeContainer.attr("class","col-sm-10 has-error");
     $bondNameContainer.attr("class","col-sm-10");
     $trusteeContainer.attr("class","col-sm-10 trustee");
     $agencyContainer.attr("class","col-sm-10 agency");
     //$bondSubTypeContainer.attr("class","col-sm-10 bondSubType");
     $messageHolder
      .attr("class","alert alert-danger")
       .html("Please Sub-Type Bond.");
     $messageHolderBottom
        .attr("class","alert alert-danger")
         .html("Please Select Sub-Type Bond.");
     return false;
    }
  /* else if($('#category').find('option:selected').val() == "")//we have to refer to the complete path to get the latest value
    {
     $categoryContainer.attr("class","col-sm-10 has-error");
     $bondTypeContainer.attr("class","col-sm-10 bondType");
     $bondSubTypeContainer.attr("class","col-sm-10 bondSubType");
     $trusteeContainer.attr("class","col-sm-10 trustee");
     $agencyContainer.attr("class","col-sm-10 agency");
     $bondNameContainer.attr("class","col-sm-10");
     $messageHolder
      .attr("class","alert alert-danger")
       .html("Please Select Category of Issue.");
     $messageHolderBottom
        .attr("class","alert alert-danger")
         .html("Please Select Category of Issue.");
     return false;
    }

    else if($('#secondaryCategory').find('option:selected').val() == "")//we have to refer to the complete path to get the latest value
    {
     $secondaryCategoryContainer.attr("class","col-sm-10 has-error");
     $categoryContainer.attr("class","col-sm-10 category");
     $bondTypeContainer.attr("class","col-sm-10 bondType");
     $bondSubTypeContainer.attr("class","col-sm-10 bondSubType");
     $trusteeContainer.attr("class","col-sm-10 trustee");
     $agencyContainer.attr("class","col-sm-10 agency");
     $bondNameContainer.attr("class","col-sm-10");
     $messageHolder
      .attr("class","alert alert-danger")
       .html("Please Select Secondary Category.");
     $messageHolderBottom
        .attr("class","alert alert-danger")
         .html("Please Select Secondary Category.");
     return false;
    }
*/

   else if($('#issuedate').val().trim() == "" || $('#issuedate').val().length !== 10)//we have to refer to the complete path to get the latest value
    {
     $secondaryCategoryContainer.attr("class","col-sm-10 secondaryCategory");
     $categoryContainer.attr("class","col-sm-10 category");
     $bondTypeContainer.attr("class","col-sm-10 bondType");
     $bondSubTypeContainer.attr("class","col-sm-10 bondSubType");
     $categoryContainer.attr("class","col-sm-10 category");
     $bondNameContainer.attr("class","col-sm-10");
     $issuedateContainer.attr("class","col-sm-10 has-error");
     $messageHolder
        .attr("class","alert alert-danger")
         .html("Please enter Issue Date / Dated Date (mm/dd/yyyy).");
     $messageHolderBottom
          .attr("class","alert alert-danger")
           .html("Please enter Issue Date / Dated Date (mm/dd/yyyy).");
     return false;
    }
   else if(tempFY !== parseInt($("#fiscalYear").val()))//we have to refer to the complete path to get the latest value
    {
     $secondaryCategoryContainer.attr("class","col-sm-10 secondaryCategory");
     $categoryContainer.attr("class","col-sm-10 category");
     $bondTypeContainer.attr("class","col-sm-10 bondType");
     $bondSubTypeContainer.attr("class","col-sm-10 bondSubType");
     $categoryContainer.attr("class","col-sm-10 category");
     $bondNameContainer.attr("class","col-sm-10");
     $issuedateContainer.attr("class","col-sm-10 has-error");
     $messageHolder
      .attr("class","alert alert-danger")
       .html("Please enter valid Issue Date / Dated Date (mm/dd/yyyy). It is not matching to Fiscal Year.");
     $messageHolderBottom
        .attr("class","alert alert-danger")
         .html("Please enter valid Issue Date / Dated Date (mm/dd/yyyy). It is not matching to Fiscal Year.");

     return false;
    }
   else if($('#TotalIssueAmt').val().trim() == "" || $('#TotalIssueAmt').val().trim() == "$0.00")//we have to refer to the complete path to get the latest value
    {
     $bondNameContainer.attr("class","col-sm-10");
     $issuedateContainer.attr("class","col-sm-10");
     $TotalIssueAmtContainer.attr("class","col-sm-10 has-error");
     $messageHolder
      .attr("class","alert alert-danger")
       .html("Please enter Total Amount / Original Issue.");
     $messageHolderBottom
        .attr("class","alert alert-danger")
         .html("Please enter Total Amount / Original Issue.");
     return false;
    }
   else if($('#maturityDate').val().trim() == "" || $('#maturityDate').val().length !== 10)//we have to refer to the complete path to get the latest value
    {
     $bondNameContainer.attr("class","col-sm-10");
     $issuedateContainer.attr("class","col-sm-10");
     $TotalIssueAmtContainer.attr("class","col-sm-10");
     $maturityDateContainer.attr("class","col-sm-10 has-error");
     $messageHolder
      .attr("class","alert alert-danger")
       .html("Please enter Final Maturity Date (mm/dd/yyyy).");
     $messageHolderBottom
        .attr("class","alert alert-danger")
         .html("Please enter Final Maturity Date (mm/dd/yyyy).");
     return false;
    }
   else if($('#deliverydate').val().trim() == "" || $('#deliverydate').val().length !== 10)//we have to refer to the complete path to get the latest value
    {
     $bondNameContainer.attr("class","col-sm-10");
     $issuedateContainer.attr("class","col-sm-10");
     $TotalIssueAmtContainer.attr("class","col-sm-10");
     $maturityDateContainer.attr("class","col-sm-10");
     $deliverydateContainer.attr("class","col-sm-10 has-error");
     $messageHolder
      .attr("class","alert alert-danger")
       .html("Please enter Date of Delivery.");
     $messageHolderBottom
        .attr("class","alert alert-danger")
         .html("Please enter Date of Delivery.");
     return false;
    }
   else if($('#firstPrincipaldate').val().trim() == "" || $('#firstPrincipaldate').val().length !== 10)//we have to refer to the complete path to get the latest value
    {
     $bondNameContainer.attr("class","col-sm-10");
     $issuedateContainer.attr("class","col-sm-10");
     $TotalIssueAmtContainer.attr("class","col-sm-10");
     $maturityDateContainer.attr("class","col-sm-10");
     $deliverydateContainer.attr("class","col-sm-10");
     $firstPrincipaldateContainer.attr("class","col-sm-10 has-error");
     $messageHolder
      .attr("class","alert alert-danger")
       .html("Please enter First Principal Payment Date (mm/dd/yyyy).");
     $messageHolderBottom
        .attr("class","alert alert-danger")
         .html("Please enter First Principal Payment Date (mm/dd/yyyy).");
     return false;
    }
   else if($('#firstInterestdate').val().trim() == "" || $('#firstInterestdate').val().length !== 10)//we have to refer to the complete path to get the latest value
    {
     $bondNameContainer.attr("class","col-sm-10");
     $issuedateContainer.attr("class","col-sm-10");
     $TotalIssueAmtContainer.attr("class","col-sm-10");
     $maturityDateContainer.attr("class","col-sm-10");
     $deliverydateContainer.attr("class","col-sm-10");
     $firstPrincipaldateContainer.attr("class","col-sm-10");
     $firstInterestdateContainer.attr("class","col-sm-10 has-error");
     $messageHolder
      .attr("class","alert alert-danger")
       .html("Please enter First Interest Payment Date (mm/dd/yyyy).");
     $messageHolderBottom
        .attr("class","alert alert-danger")
         .html("Please enter First Interest Payment Date (mm/dd/yyyy).");
     return false;
    }
   else if($('#numberofPrincipalPayments').val().trim() == "" || !$('#numberofPrincipalPayments').val().match(/^[0-9]+$/))//we have to refer to the complete path to get the latest value
    {
     $bondNameContainer.attr("class","col-sm-10");
     $issuedateContainer.attr("class","col-sm-10");
     $TotalIssueAmtContainer.attr("class","col-sm-10");
     $maturityDateContainer.attr("class","col-sm-10");
     $deliverydateContainer.attr("class","col-sm-10");
     $firstPrincipaldateContainer.attr("class","col-sm-10");
     $firstInterestdateContainer.attr("class","col-sm-10");
     $numberofPrincipalPaymentsContainer.attr("class","col-sm-10 has-error");
     $messageHolder
      .attr("class","alert alert-danger")
       .html("Please enter Number of Principal Payments / Maturities (Only intergers eg: 20 / 5 / 30).");
     $messageHolderBottom
        .attr("class","alert alert-danger")
         .html("Please enter Number of Principal Payments / Maturities (Only intergers eg: 20 / 5 / 30).");
      return false;

    }
    //2(Submitted),3(Approved),5(Close)
    else if($("#StatusID").val() === "-1" && ( $("#hdnCurrentstatusID").val() !== "2" && $("#hdnCurrentstatusID").val() !== "3" && $("#hdnCurrentstatusID").val() !== "5")){
     $bondNameContainer.attr("class","col-sm-10");
     $issuedateContainer.attr("class","col-sm-10");
     $TotalIssueAmtContainer.attr("class","col-sm-10");
     $maturityDateContainer.attr("class","col-sm-10");
     $deliverydateContainer.attr("class","col-sm-10");
     $firstPrincipaldateContainer.attr("class","col-sm-10");
     $firstInterestdateContainer.attr("class","col-sm-10");
     $numberofPrincipalPaymentsContainer.attr("class","col-sm-10");
     $statusContainer.attr("class","col-sm-10 has-error");
     //2(Submitted),3(Approved),5(Close)
     $messageHolder
      .attr("class","alert alert-danger")
       .html("Please select Status.");
     $messageHolderBottom
        .attr("class","alert alert-danger")
        .html("Please select Status.");
      return false;
    }
    else{

if(($("#hdnUserRoleId").val() == "3" || $("#hdnUserRoleId").val() == "4") && ($("#hdnCurrentstatusID").val() == "2" || $("#hdnCurrentstatusID").val() == "5")){
 $("#co5Form :input:not('[name=Update]')").attr("disabled", false);
}

     $bondNameContainer.attr("class","col-sm-10");
     $issuedateContainer.attr("class","col-sm-10");
     $TotalIssueAmtContainer.attr("class","col-sm-10");
     $maturityDateContainer.attr("class","col-sm-10");
     $deliverydateContainer.attr("class","col-sm-10");
     $firstPrincipaldateContainer.attr("class","col-sm-10");
     $firstInterestdateContainer.attr("class","col-sm-10");
     $numberofPrincipalPaymentsContainer.attr("class","col-sm-10");
     $statusContainer.attr("class","col-sm-10");
     $messageHolder
      .attr("class","hide")
       .html("");
     $messageHolderBottom
        .attr("class","hide")
         .html("");
      if($("#hdnCO5ValidationRequired").val() == "true" && $("#IsModalShown").val() != 1){
        $('#myModal').find("#spanRateType").text($("#RateTypeID").find('option:selected').text());
        $('#myModal').find("#spanTotalAmount").text($("#TotalIssueAmt").val());
        $('#myModal').find("#spanFinalMaturity").text($("#maturityDate").val());
        $('#myModal').find("#spanFirstPrincipal").text($("#firstPrincipaldate").val());
        $('#myModal').find("#spanFirstInterest").text($("#firstInterestdate").val());
        $('#myModal').find("#spanNumberOfPrincipalPayments").text($("#numberofPrincipalPayments").val());
        $('#myModal').find("#spanCouponFrequency").text($("#couponFrequency").find('option:selected').text());
        $('#myModal').find("#spanMaturityFrequency").text($("#maturityFrequency").find('option:selected').text());


		$('#myModal').find("#spanFile1").text($("#myFile1").val());
		$('#myModal').find("#spanFile2").text($("#myFile2").val());
		$('#myModal').find("#spanFile3").text($("#myFile3").val());
		$('#myModal').find("#spanFile4").text($("#myFile4").val());
		$('#myModal').find("#spanFile5").text($("#myFile5").val());
        $('#myModal').modal('show');
        return false;
       }
       // else{
       //   $(this).closest('form').submit();
       //    $('#co5Form').submit();// User confirmed, submit form.
       // }
    }
}

 });



 $("form").bind("keypress", function(e) {
  if (e.keyCode == 13) return false;
 });
if($("#TotalIssueAmt").val() !== '')
  $("#TotalIssueAmt").val(DollarFormat($("#TotalIssueAmt").val()));
if($('#bondName').val() == ''){

}

//I) issuedate --> >= deliverydate
$('#issuedate').on('change blur', function() {
 //alert($("#fiscalYear").val());
 if($('#issuedate').val().length == 10){
    $('#issuedate').datepicker("setDate", $('#issuedate').val());
    $('#deliverydate').datepicker("setDate", $('#issuedate').val());
    $('#deliverydate').datepicker("setStartDate", $('#issuedate').val());
   }
   else{
    $('#issuedate').val('');
   }

 });
//II) maturitydate --> >= current Date when creating --> simply dont allow previous dates in the date picker
$('#maturityDate').datepicker("setStartDate", defaultCurrentDate);

$('#maturityDate').on('change blur', function(){
  if($('#maturityDate').val().length == 10){
    var varCurrentDateVal = new Date();
    var tdate = new Date();
    tdate.setDate(tdate.getDate()-1);
    varCurrentDateVal = new Date((tdate.getMonth()+1) + '/' + tdate.getDate() + '/' + tdate.getFullYear());

    var varTempMaturityDate = new Date($('#maturityDate').val());
    if(varTempMaturityDate <= varCurrentDateVal){
         $maturityDateContainer.attr("class","col-sm-10 has-error");
         $messageHolder
          .attr("class","alert alert-danger")
           .html("Maturity Date can not be less than Current Date.");
         $messageHolderBottom
            .attr("class","alert alert-danger")
             .html("Maturity Date can not be less than Current Date.");
    }
    else{
          $maturityDateContainer.attr("class","col-sm-10");
          $messageHolder
           .attr("class","hide")
            .html("");
          $messageHolderBottom
             .attr("class","hide")
              .html("");
    }
  }
  else{
   $('#maturityDate').val('');
  }

});


//III) deliverydate --> default same as Issue Date | >= issuedate
// done in the step I
$('#deliverydate').on('change blur', function() {
  if($('#deliverydate').val().length == 10){
    var varTempIssueDate =  new Date($('#issuedate').val());
    var varTempDeliveryDate = new Date($('#deliverydate').val());
    if(varTempDeliveryDate < varTempIssueDate){
          $deliverydateContainer.attr("class","col-sm-10 has-error");
          $messageHolder
           .attr("class","alert alert-danger")
            .html("Date of Delivery should be greater than or equal to Issue Date / Dated Date.");
          $messageHolderBottom
             .attr("class","alert alert-danger")
              .html("Date of Delivery should be greater than or equal to Issue Date / Dated Date.");
     }
     else{
           $deliverydateContainer.attr("class","col-sm-10");
           $messageHolder
            .attr("class","hide")
             .html("");
           $messageHolderBottom
              .attr("class","hide")
               .html("");
     }

     if($('#firstPrincipaldate').val() == ""){
       //$('#firstPrincipaldate').datepicker("setDate", $('#deliverydate').val());
       $('#firstPrincipaldate').datepicker("setStartDate", $('#deliverydate').val());
      }
     if($('#firstInterestdate').val() == ""){
        //$('#firstInterestdate').datepicker("setDate", $('#deliverydate').val());
        $('#firstInterestdate').datepicker("setStartDate", $('#deliverydate').val());
      }
     //$('#firstPrincipaldate').datepicker("setDate", $('#deliverydate').val());
     $('#firstPrincipaldate').datepicker("setStartDate", $('#deliverydate').val());
     //$('#firstInterestdate').datepicker("setDate", $('#deliverydate').val());
     $('#firstInterestdate').datepicker("setStartDate", $('#deliverydate').val());
  }
  else{
   $('#deliverydate').val('');
  }

 });



//IV)firstPrincipaldate --> >deliverydate
  $('#firstPrincipaldate').on('change blur', function() {
   if($('#firstPrincipaldate').val().length == 10){
      var varTempDeliveryDate = new Date($('#deliverydate').val());
      var varTempFirstPrincipalDate =  new Date($('#firstPrincipaldate').val());
      if(varTempFirstPrincipalDate < varTempDeliveryDate){
            $firstPrincipaldateContainer.attr("class","col-sm-10 has-error");
            $messageHolder
             .attr("class","alert alert-danger")
              .html("First Principal Payment Date should be greater than Date of Delivery.");
            $messageHolderBottom
               .attr("class","alert alert-danger")
                .html("First Principal Payment Date should be greater than Date of Delivery.");
       }
       else{
             $firstPrincipaldateContainer.attr("class","col-sm-10");
             $messageHolder
              .attr("class","hide")
               .html("");
             $messageHolderBottom
                .attr("class","hide")
                 .html("");
       }
   }
   else{
    $('#firstPrincipaldate').val('');
   }
  });
// done in the step III
//V)firstInterestdate --> >deliverydate
  $('#firstInterestdate').on('change blur', function() {
   if($('#firstInterestdate').val().length == 10){
      var varTempDeliveryDate = new Date($('#deliverydate').val());
      var varTempFirstInterestDate =  new Date($('#firstInterestdate').val());

      if(varTempFirstInterestDate < varTempDeliveryDate){
            $firstInterestdateContainer.attr("class","col-sm-10 has-error");
            $messageHolder
             .attr("class","alert alert-danger")
              .html("First Interest Payment Date should be greater than Date of Delivery.");
            $messageHolderBottom
               .attr("class","alert alert-danger")
                .html("First Interest Payment Date should be greater than Date of Delivery.");
       }
       else{
             $firstInterestdateContainer.attr("class","col-sm-10");
             $messageHolder
              .attr("class","hide")
               .html("");
             $messageHolderBottom
                .attr("class","hide")
                 .html("");
       }
   }
   else{
     $('#firstInterestdate').val('');
   }
  });
// done in the step III

    'use strict';

    // CENTERED MODALS
    // phase one - store every dialog's height
    $('.modal').each(function () {
        var t = $(this),
            d = t.find('.modal-dialog'),
            fadeClass = (t.is('.fade') ? 'fade' : '');
        // render dialog
        t.removeClass('fade')
            .addClass('invisible')
            .css('display', 'block');
        // read and store dialog height
        d.data('height', d.height());
        // hide dialog again
        t.css('display', '')
            .removeClass('invisible')
            .addClass(fadeClass);
    });
    // phase two - set margin-top on every dialog show
    $('.modal').on('show.bs.modal', function () {
        var t = $(this),
            d = t.find('.modal-dialog'),
            dh = d.data('height'),
            w = $(window).width(),
            h = $(window).height();
        // if it is desktop & dialog is lower than viewport
        // (set your own values)
        if (w > 380 && (dh + 60) < h) {
            d.css('margin-top', Math.round(0.96 * (h - dh) / 2));
        } else {
            d.css('margin-top', '');
        }
    });

});


function ValidateDate(objVal,objClassName, strName) {

        var dateReg = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        //if (isNaN(oDate)) {
         if(! dateReg.test(objVal) ) {
            $("." + objClassName).attr("class","col-sm-10 dueOndate has-error");
            $(":submit").attr("disabled", true);
            //has-error
            //messageHolder
            //ObjectReference.focus();
            $("#messageHolder").attr("class","alert alert-danger").html("Please eneter Valid " + strName + " Date.");
        }else{
         $("." + objClassName).attr("class","col-sm-10 dueOndate");
         $("#messageHolder").attr("class","hide").html("");
         $(":submit").removeAttr("disabled");
        }

};
function DeleteCO5(x){
 	 var Action = x;
	 $('#hdnUpdate').attr('value',Action);
	 $("#co5Form").submit();

};


// Show or Hide the Audit information when clicked
 $(window).load( function(){
	  $(document).ready(function() {
	 	 $('#ViewAudit').click( function(event){
			  $('.auditlog').toggle();
		  });

  	});
  });