$(document).ready(function(){
 var $newaccountPage = $("#newaccount-page"),
     $userFirstNameContainer = $newaccountPage.find(".userFirstName"),
     $userLastNameContainer = $newaccountPage.find(".userLastName"),
     $userEmailContainer = $newaccountPage.find(".userEmail"),
     $userPostalCodeContainer = $newaccountPage.find(".userPostalCode"),
     $registerButton = $newaccountPage.find(".btn-login"),
     $messageHolder = $newaccountPage.find("#messageHolder");

 $registerButton.click(function(event){
 event.preventDefault();
 if($newaccountPage.find('input[type="text"][name=Pending_FirstName]').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $userFirstNameContainer.attr("class","input-group form-group has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter First Name.");
 }
 else if($newaccountPage.find('input[type="text"][name=Pending_LastName]').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $userFirstNameContainer.attr("class","input-group userFirstName");
  $userLastNameContainer.attr("class","input-group form-group has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Last Name.");
 }
 else if($newaccountPage.find('input[type="text"][name=Pending_Email]').val().trim() == "" || !validateEmail($newaccountPage.find('input[type="text"][name=Pending_Email]').val().trim()))//we have to refer to the complete path to get the latest value
 {
  $userFirstNameContainer.attr("class","input-group userFirstName");
  $userLastNameContainer.attr("class","input-group userLastName");
  $userEmailContainer.attr("class","input-group form-group has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter valid Email.");
 }
 else if($newaccountPage.find('input[type="text"][name=Pending_PostalCode]').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $userFirstNameContainer.attr("class","input-group userFirstName");
  $userLastNameContainer.attr("class","input-group userLastName");
  $userEmailContainer.attr("class","input-group userEmail");
  $userPostalCodeContainer.attr("class","input-group form-group has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Poatal Code.");
 }
 else{
  $userFirstNameContainer.attr("class","input-group userFirstName");
  $userLastNameContainer.attr("class","input-group userLastName");
  $userEmailContainer.attr("class","input-group userEmail");
  $userPostalCodeContainer.attr("class","input-group userPostalCode");
  $newaccountPage.find(".form-horizontal").submit();
 }

 });
}); // end ready function

function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if( !emailReg.test( $email ) ) {
    return false;
  } else {
    return true;
  }
}