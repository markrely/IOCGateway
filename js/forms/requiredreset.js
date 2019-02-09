$(document).ready(function(){
 var $changePassword = $("#reset-page"),
     $passwordContainer = $changePassword.find(".password"),
     $confirmPasswordContainer = $changePassword.find(".userConfirmPassword"),
     $resetButton = $changePassword.find(".btn-login"),
     $messageHolder = $changePassword.find("#messageHolder");

 $resetButton.click(function(event){
 event.preventDefault();
 if($changePassword.find('input[type="password"][name=NewPassword]').val().trim() == "" || !checkPasswordStrength($changePassword.find('input[type="password"][name=NewPassword]').val().trim()))//we have to refer to the complete path to get the latest value
 {
  $passwordContainer.attr("class","input-group form-group has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter valid new password.");
 }
 else if($changePassword.find('input[type="password"][name=ConfirmPassword]').val().trim() == "" || !checkPasswordStrength($changePassword.find('input[type="password"][name=ConfirmPassword]').val().trim())){
  $passwordContainer.attr("class","input-group userPassword");
  $confirmPasswordContainer.attr("class","input-group form-group has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter valid confirm password.");
 }
 else if($changePassword.find('input[type="password"][name=NewPassword]').val().trim() !== $changePassword.find('input[type="password"][name=ConfirmPassword]').val().trim()){
  $passwordContainer.attr("class","input-group userPassword");
  $confirmPasswordContainer.attr("class","input-group form-group has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Passwords does not match.");
 }
 else{
  $passwordContainer.attr("class","input-group userPassword");
  $confirmPasswordContainer.attr("class","input-group userConfirmPassword");
  $changePassword.find(".form-horizontal").submit();
 }

 });
}); // end ready function

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
