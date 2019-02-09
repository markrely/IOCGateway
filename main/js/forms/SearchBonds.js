$(document).ready(function(){

  var $messageHolder = $("#messageHolder");
  $("#btnDel").click(function(event){
   $("#btnSubmit").trigger("click");
  });
  //$('[name="submit"]').click(function(event){
 $("#btnSubmit").click(function(event){

   event.preventDefault();
   if($('#agency').val() == null){
    $messageHolder
     .attr("class","alert alert-danger")
      .html("Please select Issued By / Agency.");
   }
   else if($('#trustee').val() == ""){
    $messageHolder
     .attr("class","alert alert-danger")
      .html("Please select Trustee / Paying Agent.");
   }
   else if($('#bondType').val() == ""){
    $messageHolder
     .attr("class","alert alert-danger")
      .html("Please select Type Of Bond.");
   }
   else if($('#bondSubType').val() == ""){
    $messageHolder
     .attr("class","alert alert-danger")
      .html("Please select Sub-Type Bond.");
   }
   else if($('#category').val() == ""){
    $messageHolder
     .attr("class","alert alert-danger")
      .html("Please select Category of Issue.");
   }
   else if($('#secondaryCategory').val() == ""){
    $messageHolder
     .attr("class","alert alert-danger")
      .html("Please select Secondary Category.");
   }
   // else if($('#seriesName').val() == ""){
   //  $messageHolder
   //   .attr("class","alert alert-danger")
   //    .html("Please eneter Series Name.");
   // }
   else{
      $messageHolder
    .attr("class","hide")
     .html(".");
   //$('#searchForm').submit();
   $(this).closest('form').submit();
  }

  });


$('#agency').val($('#hdnIssuedBy').val()).change();

/* This is for all drop downs loading data dynamically  start*/
/* onload select Values */
if($('#hdnTrusteeID').val() !== undefined && $('#hdnTrusteeID').val() != ""){
  var value = $('#agency').val();
  $.ajax({
   type : 'get',
   url:'ManageDropDowns.cfm?agencyId='+value +'&selectedTrustee=' + $('#hdnTrusteeID').val()
  }).success(function(response){
   $('#trustee').html(response); //response as html for state drop down.
   $('#trustee').attr("class","select2");
   $('#trustee').select2();
  }).error(function(){
   alert('Error Occured1');
  });

  $.ajax({
   type : 'get',
   url:'ManageDropDowns.cfm?bondAgencyId='+value +'&selectedBondType=' + $('#hdnBondTypeID').val()
  }).success(function(response){
   $('#bondType').html(response); //response as html for state drop down.
   $('#bondType').attr("class","select2");
   $('#bondType').select2();
  }).error(function(){
   alert('Error Occured');
  });

  var agencyValue = $('#agency').val();
  $.ajax({
   type : 'get',
   url:'ManageDropDowns.cfm?bondTypeId='+ value +'&subTypeagencyID=' + agencyValue +'&selectedBondSubType=' + $('#hdnBondSubTypeID').val()
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
   url:'ManageDropDowns.cfm?bondSubTypeId='+ Typevalue +'&selectedRepaymentType=' + $('#hdnRepaymenyFundID').val()
  }).success(function(response){
   $('#repaymentType').html(response); //response as html for state drop down.
   $('#repaymentType').attr("class","select2");
   $('#repaymentType').select2();
  }).error(function(){
   alert('Error Occured');
  });

  value = $('#hdnBondSubTypeID').val();
  $.ajax({
   type : 'get',
   url:'ManageDropDowns.cfm?categoryBondSubTypeId='+value +'&selectedCategory=' + $('#hdnCategoryOfIssueID').val()
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
   url:'ManageDropDowns.cfm?secondaryCategoryBondSubTypeId='+value +'&selectedSecondarycategory=' + $('#hdnSecondaryCategoryID').val()
  }).success(function(response){
   $('#secondaryCategory').html(response); //response as html for state drop down.
   $('#secondaryCategory').attr("class","select2");
   $('#secondaryCategory').select2();
  }).error(function(){
   alert('Error Occured');
  });
 }

/* onload select Values */

 $('#agency').change(function(){
  var value = $('#agency').val();
  $.ajax({
   type : 'get',
   url:'ManageDropDowns.cfm?agencyId='+value +'&selectedTrustee=' + $('#hdnTrusteeID').val()
  }).success(function(response){
   $('#trustee').html(response); //response as html for state drop down.
   $('#trustee').attr("class","select2");
   $('#trustee').select2();
  }).error(function(){
   alert('Error Occured');
  });

  value = $('#agency').val();
  $.ajax({
   type : 'get',
   url:'ManageDropDowns.cfm?bondAgencyId='+value
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
  var agencyValue = $('#agency').val();
  $.ajax({
   type : 'get',
   url:'ManageDropDowns.cfm?bondTypeId='+ value +'&subTypeagencyID=' + agencyValue
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
    url:'ManageDropDowns.cfm?bondSubTypeId='+value
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
    url:'ManageDropDowns.cfm?categoryBondSubTypeId='+value
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
    url:'ManageDropDowns.cfm?secondaryCategoryBondSubTypeId='+value
   }).success(function(response){
    $('#secondaryCategory').html(response); //response as html for state drop down.
    $('#secondaryCategory').attr("class","select2");
    $('#secondaryCategory').select2();
   }).error(function(){
    alert('Error Occured');
   });
 });





 $("form").bind("keypress", function(e) {
  if (e.keyCode == 13) return false;
 });



/*
  //Disable Furure Days
  $('.date-picker-disable-future-date').datepicker({
    format: 'mm-dd-yyyy',
    endDate: '+0d',
    autoclose: true
  });

  $('#dueOndate').on('changeDate', function() {
   $('#paidOnDate').datepicker("setDate", $('#dueOndate').val());
  });

  //forPrincipalAmt
  //additionalPaymentAmt
  //forInterestAmt
  //totalAmtOfDraws
  //hdnBondPrincipalOutstandingAmt
  $("#forPrincipalAmt").blur(function () {
    var tempTotal = parseFloat(
     parseFloat(DollarFormat($("#hdnBondPrincipalOutstandingAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
     parseFloat(DollarFormat($("#additionalPaymentAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
     parseFloat(DollarFormat($("#totalAmtOfDraws").val()).replace(/\$|\,|\(|\)/g,'')) -
     parseFloat(DollarFormat($("#forPrincipalAmt").val()).replace(/\$|\,|\(|\)/g,''))
     ).toFixed(2);
    $("#amtBondPrincipalOutstanding").val(DollarFormat(tempTotal));
  });
  $("#additionalPaymentAmt").blur(function () {
    var tempTotal = parseFloat(
     parseFloat(DollarFormat($("#hdnBondPrincipalOutstandingAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
     parseFloat(DollarFormat($("#additionalPaymentAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
     parseFloat(DollarFormat($("#totalAmtOfDraws").val()).replace(/\$|\,|\(|\)/g,'')) -
     parseFloat(DollarFormat($("#forPrincipalAmt").val()).replace(/\$|\,|\(|\)/g,''))
     ).toFixed(2);
    $("#amtBondPrincipalOutstanding").val(DollarFormat(tempTotal));
  });
  $("#totalAmtOfDraws").blur(function () {
    var tempTotal = parseFloat(
     parseFloat(DollarFormat($("#hdnBondPrincipalOutstandingAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
     parseFloat(DollarFormat($("#additionalPaymentAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
     parseFloat(DollarFormat($("#totalAmtOfDraws").val()).replace(/\$|\,|\(|\)/g,'')) -
     parseFloat(DollarFormat($("#forPrincipalAmt").val()).replace(/\$|\,|\(|\)/g,''))
     ).toFixed(2);
    $("#amtBondPrincipalOutstanding").val(DollarFormat(tempTotal));
  });

*/




});