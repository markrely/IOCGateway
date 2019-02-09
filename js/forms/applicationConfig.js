$(document).ready(function(){
 var $applicationConfig = $("#applicationConfig"),
     $PasswordExpireDays = $applicationConfig.find(".PasswordExpireDays"),
     $PasswordAttemptLimit = $applicationConfig.find(".PasswordAttemptLimit"),
     $PreviousPasswordLimitCounter = $applicationConfig.find(".PreviousPasswordLimitCounter"),

     $DefaultPassword = $applicationConfig.find(".DefaultPassword"),
     $LoginPenanceTime = $applicationConfig.find(".LoginPenanceTime"),
     $WebmasterEmail = $applicationConfig.find(".WebmasterEmail"),
     $AltWebmasterEmail = $applicationConfig.find(".AltWebmasterEmail"),
     $Application_LoginUrl = $applicationConfig.find(".Application_LoginUrl"),
     $submitButton = $applicationConfig.find(".btn-block"),
     $messageHolder = $applicationConfig.find("#messageHolder"),
     $messageHolderBottom = $applicationConfig.find("#messageHolderBottom");

 //PasswordExpireDays
 //PasswordAttemptLimit
 //PreviousPasswordLimitCounter
 //DefaultPassword
 //LoginPenanceTime
 //WebmasterEmail
 /*
$PasswordExpireDays = $applicationConfig.find("#PasswordExpireDays"),
$PasswordAttemptLimit = $applicationConfig.find("#PasswordAttemptLimit"),
$PreviousPasswordLimitCounter = $applicationConfig.find("#PreviousPasswordLimitCounter"),

$DefaultPassword = $applicationConfig.find("#DefaultPassword"),
$LoginPenanceTime = $applicationConfig.find("#LoginPenanceTime"),
$WebmasterEmail = $applicationConfig.find("#WebmasterEmail"),
*/
$submitButton.click(function(event){
 event.preventDefault();
 $applicationConfig.find("#actionType").val('submit');
 if($('#PasswordExpireDays').val().trim() == "" || !isPositiveInteger($('#PasswordExpireDays').val().trim()))//we have to refer to the complete path to get the latest value
 {
  $PasswordExpireDays.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Password Expire Days.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter Password Expire Days.");
 }
 else if($('#PasswordAttemptLimit').val().trim() == "" || !isPositiveInteger($('#PasswordAttemptLimit').val().trim()))//we have to refer to the complete path to get the latest value
 {
  $PasswordExpireDays.attr("class","col-sm-9");
  $PasswordAttemptLimit.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Password Attempt Limit.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter Password Attempt Limit.");
 }
else if($('#PreviousPasswordLimitCounter').val().trim() == "" || !isPositiveInteger($('#PreviousPasswordLimitCounter').val().trim()))//we have to refer to the complete path to get the latest value
 {
  $PasswordExpireDays.attr("class","col-sm-9");
  $PasswordAttemptLimit.attr("class","col-sm-9");
  $PreviousPasswordLimitCounter.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Previous Password Limit Counter.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter Previous Password Limit Counter.");
 }
else if($('#DefaultPassword').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
    $PasswordExpireDays.attr("class","col-sm-9");
    $PasswordAttemptLimit.attr("class","col-sm-9");
    $PreviousPasswordLimitCounter.attr("class","col-sm-9");
    $DefaultPassword.attr("class","col-sm-9 has-error");
    $messageHolder
    .attr("class","alert alert-danger")
    .html("Please enter default Password.");
    $messageHolderBottom
    .attr("class","alert alert-danger")
    .html("Please enter default Password.");
 }
else if(!checkPasswordStrength($('#DefaultPassword').val().trim()))//we have to refer to the complete path to get the latest value
 {
  //alert(!checkPasswordStrength($('#DefaultPassword').val().trim()));
  //if(!checkPasswordStrength($('#DefaultPassword').val().trim())){
    $PasswordExpireDays.attr("class","col-sm-9");
    $PasswordAttemptLimit.attr("class","col-sm-9");
    $PreviousPasswordLimitCounter.attr("class","col-sm-9");
    $DefaultPassword.attr("class","col-sm-9 has-error");
    $messageHolder
    .attr("class","alert alert-danger")
    .html("Please enter valid default Password.");
    $messageHolderBottom
    .attr("class","alert alert-danger")
    .html("Please enter valid default Password.");
  //}
 }
else if($('#LoginPenanceTime').val().trim() == "" || !isPositiveInteger($('#LoginPenanceTime').val().trim()))//we have to refer to the complete path to get the latest value
 {
  $PasswordExpireDays.attr("class","col-sm-9");
  $PasswordAttemptLimit.attr("class","col-sm-9");
  $PreviousPasswordLimitCounter.attr("class","col-sm-9");
  $DefaultPassword.attr("class","col-sm-9");
  $LoginPenanceTime.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Login Penance Time.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter Login Penance Time.");
 }
else if($('#WebmasterEmail').val().trim() == "" || !validateEmail($('#WebmasterEmail').val().trim()))//we have to refer to the complete path to get the latest value
 {
  $PasswordExpireDays.attr("class","col-sm-9");
  $PasswordAttemptLimit.attr("class","col-sm-9");
  $PreviousPasswordLimitCounter.attr("class","col-sm-9");
  $DefaultPassword.attr("class","col-sm-9");
  $LoginPenanceTime.attr("class","col-sm-9");
  $WebmasterEmail.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter valid Webmaster Email.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter valid Webmaster Email.");
 }
else if($('#AltWebmasterEmail').val().trim() == "" || !validateEmail($('#AltWebmasterEmail').val().trim()))//we have to refer to the complete path to get the latest value
 {
  $PasswordExpireDays.attr("class","col-sm-9");
  $PasswordAttemptLimit.attr("class","col-sm-9");
  $PreviousPasswordLimitCounter.attr("class","col-sm-9");
  $DefaultPassword.attr("class","col-sm-9");
  $LoginPenanceTime.attr("class","col-sm-9");
  $WebmasterEmail.attr("class","col-sm-9");
  $AltWebmasterEmail.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter valid Alternate Webmaster Email.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter valid Alternate Webmaster Email.");
 }
else if($('#Application_LoginUrl').val().trim() == "" || !isUrl($('#Application_LoginUrl').val().trim()))//we have to refer to the complete path to get the latest value
 {
  $PasswordExpireDays.attr("class","col-sm-9");
  $PasswordAttemptLimit.attr("class","col-sm-9");
  $PreviousPasswordLimitCounter.attr("class","col-sm-9");
  $DefaultPassword.attr("class","col-sm-9");
  $LoginPenanceTime.attr("class","col-sm-9");
  $WebmasterEmail.attr("class","col-sm-9");
  $AltWebmasterEmail.attr("class","col-sm-9");
  $Application_LoginUrl.attr("class","col-sm-9 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter valid Application Login Url.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter valid Application Login Url.");
 }
else{
    $PasswordExpireDays.attr("class","col-sm-9");
    $PasswordAttemptLimit.attr("class","col-sm-9");
    $PreviousPasswordLimitCounter.attr("class","col-sm-9");
    $DefaultPassword.attr("class","col-sm-9");
    $LoginPenanceTime.attr("class","col-sm-9");
    $WebmasterEmail.attr("class","col-sm-9");
    $AltWebmasterEmail.attr("class","col-sm-9");
    $Application_LoginUrl.attr("class","col-sm-9");
    $applicationConfig.find(".form-horizontal").submit();
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
function isPositiveInteger(n) {
    return parseFloat(n) === n >>> 0;
}
function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}