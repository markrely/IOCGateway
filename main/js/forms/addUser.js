$(document).ready(function(){

 var $newUserPage = $("#addNewUser"),
     $userFirstNameContainer = $newUserPage.find(".userfirstname"),
     $userLastNameContainer = $newUserPage.find(".userlastname"),
     $userEmailContainer = $newUserPage.find(".useremail"),
     $userPasswordContainer = $newUserPage.find(".userpassword"),
     $useConfirmPasswordContainer = $newUserPage.find(".userconfirmpassword"),
     $userAddressContainer = $newUserPage.find(".useraddress"),
     $userCityContainer = $newUserPage.find(".usercity"),
     $userZipContainer = $newUserPage.find(".userzip"),
     $userCountryContainer = $newUserPage.find(".usercountry"),
     $userStateContainer = $newUserPage.find(".userstate"),
     $userPhoneContainer = $newUserPage.find(".userphone"),
     $submitButton = $newUserPage.find(".btn-block"),
     $messageHolder = $newUserPage.find("#messageHolder"),
     $messageHolderBottom = $newUserPage.find("#messageHolderBottom");

  var value = $('#country').val();
  $.ajax({
   type : 'get',
   url:'countryState.cfm?countryId='+value
  }).success(function(response){
   $('#state').html(response); //response as html for state drop down.
   $('#state').find("#selstate").attr("class","select2");
   $('#state').find("#selstate").select2();
  }).error(function(){
   alert('Error Occured');
  });


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
 else if($('#userpassword').val().trim() == "" || !checkPasswordStrength($('#userpassword').val().trim()))//we have to refer to the complete path to get the latest value
 {
  $userFirstNameContainer.attr("class","col-sm-9");
  $userLastNameContainer.attr("class","col-sm-9");
  $userEmailContainer.attr("class","col-sm-9");
  $userPasswordContainer.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter valid Password.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter valid Password.");
 }
 else if($('#userconfirmpassword').val().trim() == "" || !checkPasswordStrength($('#userconfirmpassword').val().trim()))//we have to refer to the complete path to get the latest value
 {
  $userFirstNameContainer.attr("class","col-sm-9");
  $userLastNameContainer.attr("class","col-sm-9");
  $userEmailContainer.attr("class","col-sm-9");
  $userPasswordContainer.attr("class","col-sm-9");
  $useConfirmPasswordContainer.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter valid Confirm Password.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter valid Confirm Password.");
 }
 else if($('#userconfirmpassword').val().trim() !== $('#userpassword').val().trim())//we have to refer to the complete path to get the latest value
 {
  $userFirstNameContainer.attr("class","col-sm-9");
  $userLastNameContainer.attr("class","col-sm-9");
  $userEmailContainer.attr("class","col-sm-9");
  $userPasswordContainer.attr("class","col-sm-9");
  $useConfirmPasswordContainer.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Passwords does not match.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Passwords does not match.");
 }
 else if($('#address').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $userFirstNameContainer.attr("class","col-sm-9");
  $userLastNameContainer.attr("class","col-sm-9");
  $userEmailContainer.attr("class","col-sm-9");
  $userPasswordContainer.attr("class","col-sm-9");
  $useConfirmPasswordContainer.attr("class","col-sm-9");
  $userAddressContainer.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Address.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter Address.");
 }
 else if($('#city').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $userFirstNameContainer.attr("class","col-sm-9");
  $userLastNameContainer.attr("class","col-sm-9");
  $userEmailContainer.attr("class","col-sm-9");
  $userPasswordContainer.attr("class","col-sm-9");
  $useConfirmPasswordContainer.attr("class","col-sm-9");
  $userAddressContainer.attr("class","col-sm-9");
  $userCityContainer.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter City.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter City.");
 }
 else if($('#postalcode').val().trim() == "" || isValidPostalCode($('#postalcode').val().trim(), "1") == false)//we have to refer to the complete path to get the latest value
 {
  $userFirstNameContainer.attr("class","col-sm-9");
  $userLastNameContainer.attr("class","col-sm-9");
  $userEmailContainer.attr("class","col-sm-9");
  $userPasswordContainer.attr("class","col-sm-9");
  $useConfirmPasswordContainer.attr("class","col-sm-9");
  $userAddressContainer.attr("class","col-sm-9");
  $userCityContainer.attr("class","col-sm-9");
  $userZipContainer.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter valid Zip.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter valid Zip.");
 }
 else if($('#homephone').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $userFirstNameContainer.attr("class","col-sm-9");
  $userLastNameContainer.attr("class","col-sm-9");
  $userEmailContainer.attr("class","col-sm-9");
  $userPasswordContainer.attr("class","col-sm-9");
  $useConfirmPasswordContainer.attr("class","col-sm-9");
  $userAddressContainer.attr("class","col-sm-9");
  $userCityContainer.attr("class","col-sm-9");
  $userZipContainer.attr("class","col-sm-9");
  $userPhoneContainer.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please Phone Number.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please Phone Number.");
 }
else{
 $userFirstNameContainer.attr("class","col-sm-9");
 $userLastNameContainer.attr("class","col-sm-9");
 $userEmailContainer.attr("class","col-sm-9");
 $userPasswordContainer.attr("class","col-sm-9");
 $useConfirmPasswordContainer.attr("class","col-sm-9");
 $userAddressContainer.attr("class","col-sm-9");
 $userCityContainer.attr("class","col-sm-9");
 $userZipContainer.attr("class","col-sm-9");
 $userPhoneContainer.attr("class","col-sm-9");
 $messageHolder
  .attr("class","hide");
 $messageHolderBottom
    .attr("class","hide");
}

});


 // whenever country select box changes this will activate.
 $('#country').change(function(){
  var value = $('#country').val();
  $.ajax({
   type : 'get',
   url:'countryState.cfm?countryId='+value
  }).success(function(response){
   $('#state').html(response); //response as html for state drop down.
   $('#state').find("#selstate").attr("class","select2");
   $('#state').find("#selstate").select2();
  }).error(function(){
   alert('Error Occured');
  });
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
