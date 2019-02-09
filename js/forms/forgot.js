$(document).ready(function(){
 var $forgotPasswordPage = $("#forgot-password"),
     $forgotPasswordButton = $forgotPasswordPage.find(".btn-login"),
     $userEmailContainer = $forgotPasswordPage.find(".useremail"),
     $userCaptchaContainer = $forgotPasswordPage.find(".usercaptcha"),
     $messageHolder = $forgotPasswordPage.find("#messageHolder");

 $forgotPasswordButton.click(function(event){
  event.preventDefault();
  if($forgotPasswordPage.find('input[type="text"][name=email]').val().trim() == "" || !validateEmail($forgotPasswordPage.find('input[type="text"][name=email]').val().trim()))//we have to refer to the complete path to get the latest value
  {
   $userEmailContainer.attr("class","input-group form-group has-error");
   $messageHolder
    .attr("class","alert alert-danger")
     .html("Please enter valid Email.");
  }
  else if($forgotPasswordPage.find('[name=CaptchaWord]').is(':checked') == false)//we have to refer to the complete path to get the latest value
  {
   $userEmailContainer.attr("class","input-group useremail");
   $userCaptchaContainer.attr("class","input-group form-group has-error");
   $messageHolder
    .attr("class","alert alert-danger")
     .html("Please enter Captcha.");
  }
  else{
   $userEmailContainer.attr("class","input-group useremail");
   $userCaptchaContainer.attr("class","input-group usercaptcha");
   $forgotPasswordPage.find(".form-horizontal").submit();
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