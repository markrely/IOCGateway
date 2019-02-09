$(document).ready(function(){
 var $loginPage = $("#login-page"),
     $userNameContainer = $loginPage.find(".userNameContainer"),
     $passwordContainer = $loginPage.find(".passwordContainer"),
     $loginButton = $loginPage.find(".btn-login"),
     $messageHolder = $loginPage.find("#messageHolder");

 $loginButton.click(function(event){
 event.preventDefault();
 if($loginPage.find('input[type="text"][name=username]').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $userNameContainer.attr("class","input-group form-group has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter username.");
 }
 else if($loginPage.find('input[type="password"]').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $userNameContainer.attr("class","input-group userNameContainer");
  $passwordContainer.attr("class","input-group form-group has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter password.");
 }
 else{
  $userNameContainer.attr("class","input-group userNameContainer");
  $passwordContainer.attr("class","input-group userNameContainer");
  $loginPage.find(".form-horizontal").submit();
 }

 });
}); // end ready function

