$(document).ready(function(){

$("select").prop("disabled", true);
$("#add").prop("disabled", true);


/* This is optional but i want to do this after loading the uploaded data */
$('#xlsfile').change(function(event) {
 if($("#xlsfile").val() !== ""){
   //$("select").prop("disabled", false);
   $("#agencyID").prop("disabled", false);
 }
});


//disable housing bond on page load.
if($("#agencyID").val() === null){
 $("#RateTypeID").find('option[value="4"]').attr('disabled', 'disabled');
}
else if($("#agencyID").val() != "26"){
  $("#RateTypeID").find('option[value="4"]').attr('disabled', 'disabled');
}



//$("#xlsfile").val()
//$("select").prop("disabled", true);




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
   $("#trustee").prop("disabled", false);
 });

 $('#trustee').change(function(){
  $("#bondType").prop("disabled", false);
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
   $("#bondSubType").prop("disabled", false);
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

   $("#repaymentType").prop("disabled", false);
   $("#category").prop("disabled", false);
 });

 $('#category').change(function(){
  $("#secondaryCategory").prop("disabled", false);
 });

 $('#secondaryCategory').change(function(){
  $("#RateTypeID").prop("disabled", false);
  $("#StatusID").prop("disabled", false);
 });

  $('#RateTypeID').change(function(){
  $("#StatusID").prop("disabled", false);
 });

 $('#StatusID').change(function(){
  $("#add").prop("disabled", false);
 });


});


