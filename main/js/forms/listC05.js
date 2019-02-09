/*$(document).ready(function(){
 //if($("#searchForm").val() !== '1'){
  $("#SearchResults").trigger('click');
 //}

// $("#SearchFilter").trigger('click');
 $("#search").click(function(event){
  //$("#searchForm").val('1');
  $("#SearchResults").trigger('click');
  $("#SearchFilter").trigger('click');
 });
});*/
$(document).ready(function(){
  var bFlag = 0;
  var $messageHolder = $("#messageHolder");

  $('.pagination').on('click',function(e){
   $(".btnDel").on('click', function(event){
    $("#btnSubmit").trigger("click");
   });
  });

  $(".btnDel").on('click', function(event){
   $("#btnSubmit").trigger("click");
  });

  //$('[name="submit"]').click(function(event){
 $("#btnSubmit").click(function(event){

   event.preventDefault();
   if($('#seriesName').val() == ""){
    bFlag = 1;
    $messageHolder
     .attr("class","alert alert-danger")
      .html("Please eneter Series Name.");
   }
   else if($('#seriesName').val() != ""){
    bFlag = 0;
      $messageHolder
    .attr("class","hide")
     .html("");
    $(this).closest('form').submit();
   }
   else if($('#agency').val() == null){
    $messageHolder
     .attr("class","alert alert-danger")
      .html("Please select Issued By / Agency.");
   }
   /*else if($('#trustee').val() == ""){
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
   // }*/
   else{
      $messageHolder
    .attr("class","hide")
     .html("");
   //$('#searchForm').submit();
   $(this).closest('form').submit();
   $(".btnDel").on('click', function(event){
    $("#btnSubmit").trigger("click");
   });
  }

  });


$('#agency').val($('#hdnIssuedBy').val()).change();

/* This is for all drop downs loading data dynamically  start*/
/* onload select Values */
/* RK changed it to hdnIssuedBy from hdnTrusteeID on 7/14/2015 */
if($('#hdnIssuedBy').val() !== undefined && $('#hdnIssuedBy').val() != ""){
  var value = $('#agency').val();
  $.ajax({
   type : 'get',
   url:'../includes/ManageDropDowns.cfm?agencyId='+value +'&selectedTrustee=' + $('#hdnTrusteeID').val()
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

  var agencyValue = $('#agency').val();
  $.ajax({
   type : 'get',
   url:'../includes/ManageDropDowns.cfm?bondTypeId='+ value +'&subTypeagencyID=' + agencyValue +'&selectedBondSubType=' + $('#hdnBondSubTypeID').val()
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

/* onload select Values */

 $('#agency').change(function(){
  var value = $('#agency').val();
  $.ajax({
   type : 'get',
   url:'../includes/ManageDropDowns.cfm?agencyId='+value +'&selectedTrustee=' + $('#hdnTrusteeID').val()
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
  var agencyValue = $('#agency').val();
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

 $("form").bind("keypress", function(e) {
  if (e.keyCode == 13) return false;
 });

});

