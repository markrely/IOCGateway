$(document).ready(function(){
 var $resetPage = $("#reset-page"),
     $passwordContainer = $resetPage.find(".userPassword"),
     $confirmPasswordContainer = $resetPage.find(".userConfirmPassword"),
     $resetButton = $resetPage.find(".btn-login"),
     $messageHolder = $resetPage.find("#messageHolder");

 $resetButton.click(function(event){
 event.preventDefault();
 if($("#password").val() == "" || !checkPasswordStrength($("#password").val()))//we have to refer to the complete path to get the latest value
 {
  $passwordContainer.attr("class","input-group form-group has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter valid password.");
 }
 else if($("#PasswordConfirm").val() !== $("#password").val()){
  $passwordContainer.attr("class","input-group userPassword");
  $confirmPasswordContainer.attr("class","input-group form-group has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Passwords does not match.");
 }
 else{
  $passwordContainer.attr("class","input-group userPassword");
  $confirmPasswordContainer.attr("class","input-group userConfirmPassword");
  $resetPage.find(".form-horizontal").submit();
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
