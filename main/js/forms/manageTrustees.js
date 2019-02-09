$(document).ready(function(){
 var $manageTrusteePage = $("#MangeTrusteeForm"),
     $trusteeFirstNameContainer = $manageTrusteePage.find(".trusteeFirstName"),
     $trusteeLastNameContainer = $manageTrusteePage.find(".trusteeLastName"),
     $trusteeEmailContainer = $manageTrusteePage.find(".trusteeEmail"),
     $submitButton = $manageTrusteePage.find(".btn-next"),
     $messageHolder = $manageTrusteePage.find("#messageHolder");


   $(".btnCancel").on('click', function(){
    event.preventDefault();
    $("#ManageTrusteeForm").attr('action', $("#ReferralPage").val());
    $("#ManageTrusteeForm").submit();
    });


 $submitButton.click(function(event){
 event.preventDefault();
// if(!$('#numberofPrincipalPayments').val().match(/^[0-9]+$/))//!(Number($('#numberofPrincipalPayments').val()) > 0))
//   alert("ENter Positive Number");
// alert(Number($('#numberofPrincipalPayments').val()));

 if($('#trusteeFirstName').val() == "")//we have to refer to the complete path to get the latest value
 {
  $trusteeFirstNameContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter First Name.");
 }
 else if($('#trusteeLastName').val() == "")//we have to refer to the complete path to get the latest value
 {
  $trusteeFirstNameContainer.attr("class","col-sm-10 trusteeFirstName");
  $trusteeLastNameContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Last Name.");
 }
 else if($('#trusteeEmail').val() == "" || !validateEmail($('#trusteeEmail').val()) )//we have to refer to the complete path to get the latest value
 {
  $trusteeFirstNameContainer.attr("class","col-sm-10 trusteeFirstName");
  $trusteeLastNameContainer.attr("class","col-sm-10 trusteeLastName");
  $trusteeEmailContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Email.");
 }
 else{
  $trusteeEmailContainer.attr("class","col-sm-10 trusteeEmail");
  $messageHolder
   .attr("class","hide")
    .html("");
   $("#MangeTrusteeForm").submit();
 }
 });


});
$( window ).load(function() {
 $(".bankId").find(".select2-drop").append('<table width="100%"><tr><td class="row"><button class="btn btn-block btn-default btn-xs addnew-item" onClick=""><i class="fa fa-plus-circle"></i> Add New Bank</button></div></td></tr></table>');
 AddNewBtnClick();
});
function AddNewBtnClick(){
   $(".addnew-item").on('click', function(){
    event.preventDefault();
    $("#BnakId").val('0');
    $("#ReferralPage").val('../general/ManageTrustees.cfm');
    $("#action").val('Add');
    $("#ManageTrusteeForm").attr('action', 'ManageBanks.cfm');
    $("#ManageTrusteeForm").submit();
    });
}
function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if( !emailReg.test( $email ) ) {
    return false;
  } else {
    return true;
  }
}
