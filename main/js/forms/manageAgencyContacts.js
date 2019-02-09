$(document).ready(function(){
 var $manageAgencyPage = $("#ManageAgencyContact"),
     $agencyFirstNameContainer = $manageAgencyPage.find(".agencyContactFirstName"),
     $agencyLastNameContainer = $manageAgencyPage.find(".AgencyContactLastName"),
     $agencyEmailContainer = $manageAgencyPage.find(".AgencyContactEmail"),
     $submitButton = $manageAgencyPage.find(".btn-next"),
     $messageHolder = $manageAgencyPage.find("#messageHolder");


   $(".btnCancel").on('click', function(){
    event.preventDefault();
    $("#ManageAgencyForm").attr('action', $("#ReferralPage").val());
    $("#ManageAgencyForm").submit();
    });


 $submitButton.click(function(event){
 event.preventDefault();
// if(!$('#numberofPrincipalPayments').val().match(/^[0-9]+$/))//!(Number($('#numberofPrincipalPayments').val()) > 0))
//   alert("ENter Positive Number");
// alert(Number($('#numberofPrincipalPayments').val()));

 if($('#agencyContactFirstName').val() == "")//we have to refer to the complete path to get the latest value
 {
  $agencyFirstNameContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter First Name.");
 }
 else if($('#AgencyContactLastName').val() == "")//we have to refer to the complete path to get the latest value
 {
  $agencyFirstNameContainer.attr("class","col-sm-10 agencyContactFirstName");
  $agencyLastNameContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Last Name.");
 }
 else if($('#AgencyContactEmail').val() == "" || !validateEmail($('#AgencyContactEmail').val()) )//we have to refer to the complete path to get the latest value
 {
  $agencyFirstNameContainer.attr("class","col-sm-10 agencyContactFirstName");
  $agencyLastNameContainer.attr("class","col-sm-10 AgencyContactLastName");
  $agencyEmailContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Email.");
 }
 else{
  $agencyEmailContainer.attr("class","col-sm-10 AgencyContactEmail");
  $messageHolder
   .attr("class","hide")
    .html("");
   $("#ManageAgencyForm").submit();
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
