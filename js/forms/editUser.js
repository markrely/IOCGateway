$(document).ready(function(){
 var $newUserPage = $("#addNewUser"),
     $userFirstNameContainer = $newUserPage.find(".userfirstname"),
     $userLastNameContainer = $newUserPage.find(".userlastname"),
     $userEmailContainer = $newUserPage.find(".useremail"),
     $userPasswordContainer = $newUserPage.find(".userpassword"),
     $userZipContainer = $newUserPage.find(".userzip"),
     $submitButton = $newUserPage.find(".btn-block"),
     $messageHolder = $newUserPage.find("#messageHolder"),
     $messageHolderBottom = $newUserPage.find("#messageHolderBottom");


 $submitButton.click(function(event){
 event.preventDefault();
 if($('#firstname').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $userFirstNameContainer.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter First Name.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter First Name.");
 }
 else if($('#lastname').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $userFirstNameContainer.attr("class","col-sm-9");
  $userLastNameContainer.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Last Name.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter Last Name.");
 }
 else if($('#useremail').val().trim() == "" || !validateEmail($('#useremail').val().trim()))//we have to refer to the complete path to get the latest value
 {
  $userFirstNameContainer.attr("class","col-sm-9");
  $userLastNameContainer.attr("class","col-sm-9");
  $userEmailContainer.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter valid Email.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter valid Email.");
 }
 else if($('#postalcode').val().trim() == "" || isValidPostalCode($('#postalcode').val().trim(), "1") == false)//we have to refer to the complete path to get the latest value
 {
  $userFirstNameContainer.attr("class","col-sm-9");
  $userLastNameContainer.attr("class","col-sm-9");
  $userEmailContainer.attr("class","col-sm-9");
  $userPasswordContainer.attr("class","col-sm-9");
  $userZipContainer.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter valid Zip.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter valid Zip.");
 }
 else{
    $newUserPage.find(".form-horizontal").submit();
 }
 });

});


function isValidPostalCode(postalCode, countryCode) {
    switch (countryCode) {
        case "1": //USA
            postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
            break;
        case "4": //CANADA
            postalCodeRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
            break;
        default:
            postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
    }
    return postalCodeRegex.test(postalCode);
}
function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if( !emailReg.test( $email ) ) {
    return false;
  } else {
    return true;
  }
}
function checkPasswordStrength($password){
 var password = $password;
 var validLength = /.{8}/.test(password);
 var hasCaps = /[A-Z]/.test(password);
 var hasNums = /\d/.test(password);
 var hasSpecials = /[~!,@#%&_\$\^\*\?\-]/.test(password);

 var isValid = validLength && hasCaps && hasNums && hasSpecials;
 if(!isValid){
  return false;
 } else {
  return true;
 }
}
