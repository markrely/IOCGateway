$(document).ready(function(){
 var $manageTrusteePage = $("#ManageTrustee"),
     $trusteeFirstNameContainer = $manageTrusteePage.find(".trusteeFirstName"),
     $trusteeLastNameContainer = $manageTrusteePage.find(".trusteeLastName"),
     $trusteeEmailContainer = $manageTrusteePage.find(".trusteeEmail"),
     $submitButton = $manageTrusteePage.find(".btn-next"),
     $messageHolder = $manageTrusteePage.find("#messageHolder"),
     $messageHolderBottom = $manageTrusteePage.find("#messageHolderBottom");

 $submitButton.click(function(event){
 event.preventDefault();
// if(!$('#numberofPrincipalPayments').val().match(/^[0-9]+$/))//!(Number($('#numberofPrincipalPayments').val()) > 0))
//   alert("ENter Positive Number");
// alert(Number($('#numberofPrincipalPayments').val()));

 if($('#trusteeFirstName').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $trusteeFirstNameContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter First Name.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter First Name.");
 }
 else if($('#trusteeLastName').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $trusteeFirstNameContainer.attr("class","col-sm-10 trusteeFirstName");
  $trusteeLastNameContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Last Name.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter Last Name.");
 }
 else if($('#trusteeEmail').val().trim() == "" || !validateEmail($('#trusteeEmail').val().trim()) )//we have to refer to the complete path to get the latest value
 {
  $trusteeFirstNameContainer.attr("class","col-sm-10 trusteeFirstName");
  $trusteeLastNameContainer.attr("class","col-sm-10 trusteeLastName");
  $trusteeEmailContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Email.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter Email.");
 }
 else{
  $trusteeEmailContainer.attr("class","col-sm-10 trusteeEmail");
  $messageHolder
   .attr("class","hide")
    .html("");
  $messageHolderBottom
     .attr("class","hide")
      .html("");
   $(this).closest('form').submit();
 }
 });


});

function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if( !emailReg.test( $email ) ) {
    return false;
  } else {
    return true;
  }
}